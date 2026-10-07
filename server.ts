import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Hierarchy of models: Best to most resilient fallback
interface ModelTier {
  id: string;
  label: string;
  description: string;
  disabledUntil: number;
  failureCount: number;
  successCount: number;
}

const MODEL_TIERS: ModelTier[] = [
  {
    id: "gemini-3.8-flash",
    label: "Gemini 3.8 Flash (Modèle Principal - Haute Performance)",
    description: "Modèle le plus performant et intelligent pour le tutorat académique et l'analyse de cours.",
    disabledUntil: 0,
    failureCount: 0,
    successCount: 0,
  },
  {
    id: "gemini-3.1-flash-lite",
    label: "Gemini 3.1 Flash Lite (Secours Économique)",
    description: "Modèle optimisé à basse consommation de quotas, rapide et efficient.",
    disabledUntil: 0,
    failureCount: 0,
    successCount: 0,
  },
  {
    id: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash (Secours Intermédiaire)",
    description: "Modèle robuste de secours pour continuité de service pédagogique.",
    disabledUntil: 0,
    failureCount: 0,
    successCount: 0,
  },
  {
    id: "gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash Lite (Secours Ultime)",
    description: "Modèle ultra-léger garantissant la disponibilité continue.",
    disabledUntil: 0,
    failureCount: 0,
    successCount: 0,
  },
];

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Status of models and fallback status
app.get("/api/gemini/status", (_req, res) => {
  const now = Date.now();
  const status = MODEL_TIERS.map((tier) => ({
    id: tier.id,
    label: tier.label,
    description: tier.description,
    isAvailable: tier.disabledUntil <= now,
    disabledUntil: tier.disabledUntil > now ? new Date(tier.disabledUntil).toISOString() : null,
    failureCount: tier.failureCount,
    successCount: tier.successCount,
  }));

  const activeModel = MODEL_TIERS.find((t) => t.disabledUntil <= now) || MODEL_TIERS[0];

  res.json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
    activeModel: activeModel.id,
    activeModelLabel: activeModel.label,
    models: status,
  });
});

// Gemini Chat & Course Tutor Endpoint with Automatic Cascading Fallback & Auto-Recovery
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history, courseContext } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Le message est obligatoire." });
  }

  const ai = getAiClient();
  const now = Date.now();

  const systemInstruction = `Você é o Assistente Virtual e Curador Inteligente oficial do PARAVERSO (propulsionado pela Secretaria de Estado de Cultura - SECULT e Governo do Estado do Pará).
Sua missão é acompanhar cidadãos, pesquisadores, estudantes e turistas na exploração do patrimônio cultural, imersão em Realidade Virtual 360°, saberes ancestrais, festividades como o Círio de Nazaré, e a rica biodiversidade da Amazônia Paraense.

Diretrizes de resposta :
1. Responda de maneira acolhedora, precisa, didática e estruturada em Português do Brasil (ou no idioma solicitado pelo usuário, caso envie mensagem em inglês ou francês).
2. Se um contexto de obra/curso for fornecido (${courseContext ? `Obra/Curso atual : "${courseContext.title}", Categoria: "${courseContext.category}", Descrição: "${courseContext.description}"` : "nenhum conteúdo específico selecionado"}), oriente prioritariamente suas explicações em torno do patrimônio, técnicas, história e relevância cultural no contexto do Estado do Pará.
3. Destaque a riqueza cultural, as tradições dos povos originários e quilombolas, os mestres de carimbó e as riquezas da flora e fauna amazônica.
4. Utilize formatação Markdown limpa e elegante (listas, tópicos, destaques em negrito).`;

  // Filter candidates: prioritize best available model
  // If the top model cooldown has passed, test it immediately!
  const sortedTiers = [...MODEL_TIERS].sort((a, b) => {
    const aAvail = a.disabledUntil <= now;
    const bAvail = b.disabledUntil <= now;
    if (aAvail && !bAvail) return -1;
    if (!aAvail && bAvail) return 1;
    return 0; // maintain original priority order
  });

  let lastError: any = null;
  let usedModelTier: ModelTier | null = null;
  let replyText = "";
  const fallbackChainAttempted: string[] = [];

  if (ai) {
    for (const tier of sortedTiers) {
      fallbackChainAttempted.push(tier.id);
      try {
        console.log(`[Gemini Tutor] Attempting request with model: ${tier.id}`);

        // Construct contents with optional brief history
        let promptWithContext = message;
        if (courseContext) {
          promptWithContext = `[Contexte de formation : ${courseContext.title} (${courseContext.category})]\nQuestion de l'apprenant : ${message}`;
        }

        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          // Add recent turns (up to last 6 messages)
          const recentHistory = history.slice(-6);
          for (const item of recentHistory) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.content || item.text || "" }],
            });
          }
        }
        contents.push({
          role: "user",
          parts: [{ text: promptWithContext }],
        });

        const response = await ai.models.generateContent({
          model: tier.id,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          replyText = response.text;
          usedModelTier = tier;
          
          // Successful generation!
          tier.successCount++;
          tier.failureCount = 0;
          tier.disabledUntil = 0;

          // If the top model succeeded, ensure its status is pristine
          if (tier.id === MODEL_TIERS[0].id) {
            console.log(`[Gemini Tutor] Best model ${tier.id} responded successfully. Quota is active.`);
          } else {
            console.log(`[Gemini Tutor] Fallback model ${tier.id} responded successfully.`);
          }

          break; // Stop cascade on success
        }
      } catch (err: any) {
        lastError = err;
        const errMessage = (err?.message || "").toLowerCase();
        const errCode = err?.status || err?.statusCode || "";
        console.warn(`[Gemini Tutor] Model ${tier.id} failed (${errCode}): ${err?.message}`);

        // Check if error is quota / credit / rate-limit related (429, RESOURCE_EXHAUSTED, etc.)
        const isQuotaOrCredit =
          errCode === 429 ||
          errCode === 402 ||
          errCode === 403 ||
          errMessage.includes("quota") ||
          errMessage.includes("resource_exhausted") ||
          errMessage.includes("credit") ||
          errMessage.includes("rate limit") ||
          errMessage.includes("too many requests") ||
          errMessage.includes("exhausted");

        tier.failureCount++;
        // Apply temporary backoff: 2 minutes cooldown before retry
        tier.disabledUntil = Date.now() + 120_000;

        // Continue to the next tier in the chain!
        continue;
      }
    }
  }

  // If a model succeeded:
  if (usedModelTier && replyText) {
    const isFallback = usedModelTier.id !== MODEL_TIERS[0].id;
    return res.json({
      text: replyText,
      modelUsed: usedModelTier.id,
      modelLabel: usedModelTier.label,
      isFallback,
      fallbackChain: fallbackChainAttempted,
      status: "success",
    });
  }

  // If no API key is provided or all models failed, provide a graceful educational response
  // so the platform NEVER stops serving the user ("não pare de atender e responder os usuário")
  const fallbackPedagogicalResponse = generateLocalPedagogicalFallback(message, courseContext);

  return res.json({
    text: fallbackPedagogicalResponse,
    modelUsed: "paraverso-assistant-offline-resilient",
    modelLabel: "Assistente PARAVERSO (Modo Resiliência)",
    isFallback: true,
    note: "Resposta fornecida via curadoria integrada do PARAVERSO para garantir atendimento ininterrupto.",
    fallbackChain: fallbackChainAttempted,
    status: "resilient_fallback",
  });
});

function generateLocalPedagogicalFallback(query: string, courseContext?: any): string {
  const q = query.toLowerCase();
  const courseTitle = courseContext?.title ? `sobre **${courseContext.title}**` : "sobre o acervo cultural";

  if (q.includes("olá") || q.includes("oi") || q.includes("bom dia") || q.includes("boa tarde") || q.includes("boa noite") || q.includes("bonjour") || q.includes("hello")) {
    return `### Olá! Boas-vindas ao PARAVERSO - SECULT Pará! 🏛️
    
Eu sou seu Assistente Virtual e Curador Inteligente do Governo do Estado do Pará. Como posso te auxiliar hoje ${courseTitle}?

Você pode me perguntar sobre:
- Obras audiovisuais e experiências imersivas em Realidade Virtual 360°
- História, devoção e tradição do Círio de Nazaré
- Manifestações culturais como o Carimbó, lendas e mestres paraenses
- Biodiversidade amazônica, bacias hidrográficas e bioeconomia local
- Orientações sobre certificações e materiais da SECULT-PA.`;
  }

  if (q.includes("quiz") || q.includes("teste") || q.includes("prova") || q.includes("avaliação") || q.includes("question")) {
    return `### Guia de Estudos & Fixação de Conteúdo
    
Para aprofundar seu aprendizado ${courseTitle}:
1. **Conceitos Fundamentais**: Revise os temas centrais e manifestações documentadas nos episódios em 360°.
2. **Contexto Histórico & Cultural**: Conecte os saberes tradicionais às realidades locais e aos mestres da cultura paraense.
3. **Reflexão Crítica**: Analise o papel da preservação ambiental e da herança comunitária na identidade amazônica.

*Fique à vontade para me fazer perguntas específicas sobre cada tema!*`;
  }

  return `### PARAVERSO • Assistente de Cultura e Patrimônio

Compreendi sua dúvida sobre "${query}" ${courseTitle}.

No contexto cultural do Estado do Pará e das produções do PARAVERSO, valorizamos a preservação das narrativas contadas pelos próprios paraenses, associando tecnologia de ponta à riqueza de nossas tradições.

1. **Patrimônio Vivo**: Nossas produções valorizam os saberes ancestrais e a biodiversidade paraense.
2. **Imersão Tecnológica**: A realidade virtual permite vivenciar celebrações e territórios com fidelidade documental.
3. **Difusão do Conhecimento**: Acesse os materiais complementares e documentos oficiais no menu de recursos.

*Sinta-se à vontade para aprofundar qualquer pergunta sobre o patrimônio ou episódios específicos!*`;
}

async function startServer() {
  const publicDir = path.join(process.cwd(), "public");

  // Specific high-priority routes for OG images with explicit headers and CORS
  app.get(["/logoog.png", "/og-image.png"], (req, res) => {
    const filename = req.path.includes("logoog") ? "logoog.png" : "og-image.png";
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.sendFile(path.join(publicDir, filename));
  });

  app.get(["/logoog.jpg", "/og-image.jpg"], (req, res) => {
    const filename = req.path.includes("logoog") ? "logoog.jpg" : "og-image.jpg";
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.sendFile(path.join(publicDir, filename));
  });

  app.get("/og-square.png", (_req, res) => {
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.sendFile(path.join(publicDir, "og-square.png"));
  });

  // Specific MIME and header handling for PWA files
  app.get("/manifest.webmanifest", (_req, res) => {
    res.setHeader("Content-Type", "application/manifest+json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(publicDir, "manifest.webmanifest"));
  });

  app.get("/sw.js", (_req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Service-Worker-Allowed", "/");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(path.join(publicDir, "sw.js"));
  });

  // Explicit handlers for social media and Open Graph images with high-compatibility headers
  const ogAssetRoutes = [
    { path: "/og-image.jpg", file: "og-image.jpg", type: "image/jpeg" },
    { path: "/og-image.png", file: "og-image.png", type: "image/png" },
    { path: "/og-edtech.jpg", file: "og-edtech.jpg", type: "image/jpeg" },
    { path: "/og-edtech.png", file: "og-edtech.png", type: "image/png" },
    { path: "/logoog.jpg", file: "logoog.jpg", type: "image/jpeg" },
    { path: "/logoog.png", file: "logoog.png", type: "image/png" },
    { path: "/og-square.jpg", file: "og-square.jpg", type: "image/jpeg" },
    { path: "/og-square.png", file: "og-square.png", type: "image/png" },
  ];

  ogAssetRoutes.forEach(({ path: routePath, file, type }) => {
    app.get(routePath, (_req, res) => {
      res.setHeader("Content-Type", type);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");
      res.sendFile(path.join(publicDir, file));
    });
  });

  // Dedicated Open Graph responder for WhatsApp, Facebook, LinkedIn, Twitter/X, Telegram crawlers
  app.use((req, res, next) => {
    const userAgent = (req.get("user-agent") || "").toLowerCase();
    const isSocialCrawler =
      userAgent.includes("whatsapp") ||
      userAgent.includes("facebookexternalhit") ||
      userAgent.includes("facebot") ||
      userAgent.includes("twitterbot") ||
      userAgent.includes("linkedinbot") ||
      userAgent.includes("telegrambot") ||
      userAgent.includes("slackbot") ||
      userAgent.includes("discordbot") ||
      userAgent.includes("applebot") ||
      userAgent.includes("pinterest") ||
      userAgent.includes("google-structured-data-testing-tool") ||
      userAgent.includes("meta-externalagent");

    // Only intercept HTML / page navigation requests, never assets or API calls
    if (isSocialCrawler && !req.path.startsWith("/api/") && !req.path.includes(".")) {
      const rawHost = req.get("x-forwarded-host") || req.get("host") || "";
      const host = rawHost.includes("localhost") || !rawHost ? "paraverso.pa.gov.br" : rawHost;
      const proto = req.get("x-forwarded-proto") || req.protocol || "https";
      const baseUrl = `${proto}://${host}`;
      const ogJpgUrl = `${baseUrl}/og-image.jpg`;
      const ogPngUrl = `${baseUrl}/og-image.png`;
      const ogSquareUrl = `${baseUrl}/og-square.jpg`;
      const appUrl = `${baseUrl}${req.originalUrl || "/"}`;

      const title = "PARAVERSO - Streaming & Realidade Virtual | Governo do Pará";
      const description = "Plataforma oficial de imersão digital em Realidade Virtual 360º e difusão do patrimônio cultural, histórico e socioambiental paraense da SECULT-PA.";

      const socialHtml = `<!DOCTYPE html>
<html lang="pt-BR" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${description}">

  <!-- Open Graph / WhatsApp / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="PARAVERSO">
  <meta property="og:url" content="${appUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  
  <meta property="og:image" content="${ogJpgUrl}">
  <meta property="og:image:secure_url" content="${ogJpgUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="PARAVERSO - Governo do Estado do Pará">

  <meta property="og:image" content="${ogPngUrl}">
  <meta property="og:image:secure_url" content="${ogPngUrl}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <meta property="og:image" content="${ogSquareUrl}">
  <meta property="og:image:secure_url" content="${ogSquareUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="800">
  <meta property="og:image:height" content="800">
  <meta property="og:image:alt" content="Logo PARAVERSO Oficial">

  <link rel="image_src" href="${ogJpgUrl}">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@GovernoPara">
  <meta name="twitter:url" content="${appUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogJpgUrl}">
  <meta name="twitter:image:alt" content="PARAVERSO - Governo do Pará">

  <link rel="icon" type="image/svg+xml" href="${baseUrl}/logo.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="${baseUrl}/favicon-32x32.png">
  <link rel="apple-touch-icon" href="${baseUrl}/apple-touch-icon.png">
</head>
<body style="background:#0A1626;color:#ffffff;font-family:sans-serif;padding:30px;text-align:center;">
  <div style="max-width:600px;margin:0 auto;">
    <h1 style="color:#ffffff;margin-bottom:10px;">PARAVERSO</h1>
    <p style="color:#94a3b8;font-size:15px;line-height:1.5;">${description}</p>
    <img src="${ogJpgUrl}" alt="PARAVERSO Preview" style="max-width:100%;height:auto;border-radius:12px;margin:20px 0;box-shadow:0 10px 25px rgba(0,0,0,0.3);">
    <div>
      <a href="${appUrl}" style="display:inline-block;background:#DE292E;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Acessar Plataforma PARAVERSO</a>
    </div>
  </div>
</body>
</html>`;

      return res.status(200).send(socialHtml);
    }

    next();
  });

  // Setup Vite middleware in dev or serve dist in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PARAVERSO Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

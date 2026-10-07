import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 1. SVG Color Logo (Secretaria de Cultura | Bandeira Pará | Governo do Pará)
const svgLogoColor = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 140" width="850" height="140">
  <defs>
    <linearGradient id="paraBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0090D6" />
      <stop offset="100%" stop-color="#005CAB" />
    </linearGradient>
    <clipPath id="flagClip">
      <rect x="0" y="0" width="170" height="110" rx="4" />
    </clipPath>
  </defs>

  <!-- Left: SECRETARIA DE CULTURA -->
  <g transform="translate(10, 15)">
    <text x="0" y="52" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="28" font-weight="400" fill="#1A1A1A" letter-spacing="1.5">SECRETARIA DE</text>
    <text x="0" y="98" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="44" font-weight="900" fill="#000000" letter-spacing="0.5">CULTURA</text>
  </g>

  <!-- Center: BANDEIRA DO PARÁ -->
  <g transform="translate(285, 15)">
    <g clip-path="url(#flagClip)">
      <!-- White base / diagonal band -->
      <rect x="0" y="0" width="170" height="110" fill="#FFFFFF" />
      
      <!-- Top-right red triangle -->
      <polygon points="45,0 170,0 170,85" fill="#DE292E" />
      
      <!-- Bottom-left red triangle -->
      <polygon points="0,25 0,110 125,110" fill="#DE292E" />

      <!-- Center Blue Star -->
      <polygon points="85,25 93,48 117,48 98,62 105,85 85,71 65,85 72,62 53,48 77,48" fill="#0072BC" />
    </g>
    <!-- Subtle crisp border -->
    <rect x="0" y="0" width="170" height="110" rx="4" fill="none" stroke="#E2E8F0" stroke-width="1.5" />
  </g>

  <!-- Right: GOVERNO DO PARÁ -->
  <g transform="translate(485, 15)">
    <text x="0" y="32" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="28" font-weight="800" fill="#3D3D3D" letter-spacing="3">GOVERNO DO</text>
    <text x="0" y="105" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="92" font-weight="900" fill="url(#paraBlueGrad)" letter-spacing="1">PARÁ</text>
  </g>
</svg>
`;

// 2. SVG White Monochrome Logo (Para fundos escuros)
const svgLogoWhite = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 140" width="850" height="140">
  <defs>
    <clipPath id="flagClipWhite">
      <rect x="0" y="0" width="170" height="110" rx="4" />
    </clipPath>
  </defs>

  <!-- Left: SECRETARIA DE CULTURA -->
  <g transform="translate(10, 15)">
    <text x="0" y="52" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="28" font-weight="400" fill="#FFFFFF" letter-spacing="1.5">SECRETARIA DE</text>
    <text x="0" y="98" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">CULTURA</text>
  </g>

  <!-- Center: BANDEIRA DO PARÁ (Monochrome White) -->
  <g transform="translate(285, 15)">
    <g clip-path="url(#flagClipWhite)">
      <rect x="0" y="0" width="170" height="110" fill="none" stroke="#FFFFFF" stroke-width="2" />
      <!-- Triangles -->
      <polygon points="45,0 170,0 170,85" fill="#FFFFFF" />
      <polygon points="0,25 0,110 125,110" fill="#FFFFFF" />
      <!-- Center Star -->
      <polygon points="85,25 93,48 117,48 98,62 105,85 85,71 65,85 72,62 53,48 77,48" fill="#FFFFFF" />
    </g>
    <rect x="0" y="0" width="170" height="110" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
  </g>

  <!-- Right: GOVERNO DO PARÁ -->
  <g transform="translate(485, 15)">
    <text x="0" y="32" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="3">GOVERNO DO</text>
    <text x="0" y="105" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="92" font-weight="900" fill="#FFFFFF" letter-spacing="1">PARÁ</text>
  </g>
</svg>
`;

// 3. SVG Square Emblem (Icon / Favicon / PWA)
const svgEmblem = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B192C" />
      <stop offset="100%" stop-color="#003566" />
    </linearGradient>
    <clipPath id="squareFlagClip">
      <rect x="76" y="96" width="360" height="240" rx="16" />
    </clipPath>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Flag emblem with subtle shadow -->
  <g clip-path="url(#squareFlagClip)">
    <rect x="76" y="96" width="360" height="240" fill="#FFFFFF" />
    <polygon points="170,96 436,96 436,275" fill="#DE292E" />
    <polygon points="76,155 76,336 342,336" fill="#DE292E" />
    <!-- Star -->
    <polygon points="256,160 272,210 324,210 282,240 298,290 256,260 214,290 230,240 188,210 240,210" fill="#0072BC" />
  </g>
  <rect x="76" y="96" width="360" height="240" rx="16" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="4" />

  <!-- Platform name -->
  <text x="256" y="420" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">PARAVERSO</text>
  <text x="256" y="455" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="16" font-weight="700" fill="#00A3E0" text-anchor="middle" letter-spacing="4">GOVERNO DO PARÁ</text>
</svg>
`;

async function main() {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.svg'), svgLogoColor.trim());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'logo_white.svg'), svgLogoWhite.trim());

  // Render high-res PNGs
  await sharp(Buffer.from(svgLogoColor))
    .resize(850, 140)
    .png({ quality: 100 })
    .toFile(path.join(PUBLIC_DIR, 'logo.png'));

  await sharp(Buffer.from(svgLogoWhite))
    .resize(850, 140)
    .png({ quality: 100 })
    .toFile(path.join(PUBLIC_DIR, 'logo_white.png'));

  // Also root level copies
  fs.copyFileSync(path.join(PUBLIC_DIR, 'logo.png'), path.join(process.cwd(), 'logo.png'));
  fs.copyFileSync(path.join(PUBLIC_DIR, 'logo_white.png'), path.join(process.cwd(), 'logo_white.png'));

  // Render PWA and Favicon
  await sharp(Buffer.from(svgEmblem))
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'pwa-512x512.png'));

  await sharp(Buffer.from(svgEmblem))
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'pwa-maskable-512x512.png'));

  await sharp(Buffer.from(svgEmblem))
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'pwa-192x192.png'));

  await sharp(Buffer.from(svgEmblem))
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));

  await sharp(Buffer.from(svgEmblem))
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));

  await sharp(Buffer.from(svgEmblem))
    .resize(800, 800)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-square.png'));

  await sharp(Buffer.from(svgEmblem))
    .resize(800, 800)
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-square.jpg'));

  // OG 1200x630
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0A1626" />
        <stop offset="50%" stop-color="#0D1B2A" />
        <stop offset="100%" stop-color="#05101E" />
      </linearGradient>
      <linearGradient id="accentBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0072BC" />
        <stop offset="50%" stop-color="#DE292E" />
        <stop offset="100%" stop-color="#00A3E0" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#ogBg)" />
    <!-- Gradient accent line -->
    <rect x="0" y="0" width="1200" height="8" fill="url(#accentBar)" />

    <g transform="translate(100, 100)">
      <!-- Government & SECULT Logo -->
      <g transform="scale(0.85)">
        ${svgLogoWhite.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 140" width="850" height="140">', '').replace('</svg>', '')}
      </g>
    </g>

    <g transform="translate(100, 320)">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="4">PARAVERSO</text>
      <text x="0" y="105" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="28" font-weight="600" fill="#00A3E0">Plataforma de Streaming &amp; Realidade Virtual do Estado do Pará</text>
      <text x="0" y="150" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="20" font-weight="400" fill="#94A3B8">Secretaria de Estado de Cultura • SECULT-PA • Governo do Pará</text>
    </g>

    <!-- Bottom line -->
    <rect x="0" y="622" width="1200" height="8" fill="url(#accentBar)" />
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .jpeg({ quality: 92 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));

  console.log('✅ Logos e ativos da marca Governo do Pará / PARAVERSO gerados com sucesso!');
}

main().catch(console.error);

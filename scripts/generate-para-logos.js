import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 1. SVG Color Logo (PARAVERSO - for light backgrounds)
const svgLogoColor = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 140" width="620" height="140">
  <defs>
    <linearGradient id="paraBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00A3E0" />
      <stop offset="100%" stop-color="#0066CC" />
    </linearGradient>
    <linearGradient id="paraRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF3B30" />
      <stop offset="100%" stop-color="#DE292E" />
    </linearGradient>
    <linearGradient id="paraGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E676" />
      <stop offset="100%" stop-color="#00A844" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Left Icon: Futuristic PARAVERSO Portal / VR Emblem -->
  <g transform="translate(20, 15)">
    <!-- Outer Hologram Ring Segment (Blue/Cyan) -->
    <path d="M 55,5 A 50,50 0 0 1 105,55 L 90,55 A 35,35 0 0 0 55,20 Z" fill="url(#paraBlueGrad)" />
    
    <!-- Left Wing / Portal Curve (Green/Amazonian) -->
    <path d="M 55,5 A 50,50 0 0 0 5,55 L 20,55 A 35,35 0 0 1 55,20 Z" fill="url(#paraGreenGrad)" />
    
    <!-- Bottom Swirl / Dynamic Arc (Red) -->
    <path d="M 5,55 A 50,50 0 0 0 55,105 L 55,90 A 35,35 0 0 1 20,55 Z" fill="url(#paraRedGrad)" />
    <path d="M 105,55 A 50,50 0 0 1 55,105 L 55,90 A 35,35 0 0 0 90,55 Z" fill="url(#paraBlueGrad)" />

    <!-- Center Futuristic Hexagon / VR Prism -->
    <polygon points="55,28 78,41 78,69 55,82 32,69 32,41" fill="#0F172A" stroke="url(#paraBlueGrad)" stroke-width="3" />

    <!-- Center Glowing Star of Pará -->
    <polygon points="55,38 59,49 71,49 61,56 65,68 55,60 45,68 49,56 39,49 51,49" fill="#00D2FF" filter="url(#glow)" />
    <polygon points="55,41 58,49 67,49 60,54 63,63 55,57 47,63 50,54 43,49 52,49" fill="#FFFFFF" />
  </g>

  <!-- Right Typography: PARAVERSO Wordmark -->
  <g transform="translate(145, 20)">
    <text x="0" y="65" font-family="'Plus Jakarta Sans', 'Inter', 'Montserrat', -apple-system, sans-serif" font-size="58" font-weight="900" fill="url(#textGrad)" letter-spacing="4">PARAVERSO</text>
    
    <!-- Accent Line under wordmark -->
    <rect x="2" y="80" width="360" height="4" rx="2" fill="url(#paraBlueGrad)" />
    <rect x="366" y="80" width="45" height="4" rx="2" fill="url(#paraRedGrad)" />
    
    <text x="2" y="100" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="13" font-weight="700" fill="#64748B" letter-spacing="3.5">GOVERNO DO PARÁ • SECULT</text>
  </g>
</svg>
`;

// 2. SVG White Monochrome Logo (PARAVERSO - for dark backgrounds)
const svgLogoWhite = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 140" width="620" height="140">
  <defs>
    <linearGradient id="whiteGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#00E676" />
    </linearGradient>
    <linearGradient id="redAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5252" />
      <stop offset="100%" stop-color="#DE292E" />
    </linearGradient>
    <filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Left Icon: Futuristic PARAVERSO Portal / VR Emblem -->
  <g transform="translate(20, 15)">
    <!-- Outer Glowing Ring -->
    <path d="M 55,5 A 50,50 0 0 1 105,55 L 90,55 A 35,35 0 0 0 55,20 Z" fill="#00D2FF" />
    <path d="M 55,5 A 50,50 0 0 0 5,55 L 20,55 A 35,35 0 0 1 55,20 Z" fill="#00E676" />
    <path d="M 5,55 A 50,50 0 0 0 55,105 L 55,90 A 35,35 0 0 1 20,55 Z" fill="url(#redAccentGrad)" />
    <path d="M 105,55 A 50,50 0 0 1 55,105 L 55,90 A 35,35 0 0 0 90,55 Z" fill="#38BDF8" />

    <!-- Center Futuristic Hexagon / VR Prism -->
    <polygon points="55,28 78,41 78,69 55,82 32,69 32,41" fill="#0A1626" stroke="#38BDF8" stroke-width="3" />

    <!-- Center Star of Pará -->
    <polygon points="55,38 59,49 71,49 61,56 65,68 55,60 45,68 49,56 39,49 51,49" fill="#00E5FF" filter="url(#whiteGlow)" />
    <polygon points="55,41 58,49 67,49 60,54 63,63 55,57 47,63 50,54 43,49 52,49" fill="#FFFFFF" />
  </g>

  <!-- Right Typography: PARAVERSO Wordmark -->
  <g transform="translate(145, 20)">
    <text x="0" y="65" font-family="'Plus Jakarta Sans', 'Inter', 'Montserrat', -apple-system, sans-serif" font-size="58" font-weight="900" fill="#FFFFFF" letter-spacing="4">PARAVERSO</text>
    
    <!-- Accent Line under wordmark -->
    <rect x="2" y="80" width="360" height="4" rx="2" fill="url(#whiteGlowGrad)" />
    <rect x="366" y="80" width="45" height="4" rx="2" fill="url(#redAccentGrad)" />
    
    <text x="2" y="100" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="13" font-weight="700" fill="#94A3B8" letter-spacing="3.5">GOVERNO DO PARÁ • SECULT</text>
  </g>
</svg>
`;

// 3. SVG Square Emblem (Icon / Favicon / PWA)
const svgEmblem = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07121E" />
      <stop offset="100%" stop-color="#0F243A" />
    </linearGradient>
    <linearGradient id="emblemBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#0066FF" />
    </linearGradient>
    <linearGradient id="emblemGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00FF88" />
      <stop offset="100%" stop-color="#00A844" />
    </linearGradient>
    <linearGradient id="emblemRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5252" />
      <stop offset="100%" stop-color="#DE292E" />
    </linearGradient>
    <filter id="iconGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Outer Glow border -->
  <rect x="6" y="6" width="500" height="500" rx="108" fill="none" stroke="url(#emblemBlue)" stroke-width="3" stroke-opacity="0.4" />

  <!-- Center Portal Icon -->
  <g transform="translate(256, 210) scale(2.2)">
    <g transform="translate(-55, -55)">
      <!-- Arcs -->
      <path d="M 55,5 A 50,50 0 0 1 105,55 L 90,55 A 35,35 0 0 0 55,20 Z" fill="url(#emblemBlue)" />
      <path d="M 55,5 A 50,50 0 0 0 5,55 L 20,55 A 35,35 0 0 1 55,20 Z" fill="url(#emblemGreen)" />
      <path d="M 5,55 A 50,50 0 0 0 55,105 L 55,90 A 35,35 0 0 1 20,55 Z" fill="url(#emblemRed)" />
      <path d="M 105,55 A 50,50 0 0 1 55,105 L 55,90 A 35,35 0 0 0 90,55 Z" fill="url(#emblemBlue)" />

      <!-- Hexagon -->
      <polygon points="55,28 78,41 78,69 55,82 32,69 32,41" fill="#07121E" stroke="#00E5FF" stroke-width="3" />

      <!-- Star of Pará with Glow -->
      <polygon points="55,38 59,49 71,49 61,56 65,68 55,60 45,68 49,56 39,49 51,49" fill="#00E5FF" filter="url(#iconGlow)" />
      <polygon points="55,40 58,49 68,49 60,54 64,64 55,58 46,64 50,54 42,49 52,49" fill="#FFFFFF" />
    </g>
  </g>

  <!-- Platform typography -->
  <text x="256" y="395" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">PARAVERSO</text>
  <text x="256" y="435" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="16" font-weight="700" fill="#38BDF8" text-anchor="middle" letter-spacing="4">GOVERNO DO PARÁ</text>
</svg>
`;

async function main() {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.svg'), svgLogoColor.trim());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'logo_white.svg'), svgLogoWhite.trim());

  // Render high-res PNGs for logo.png and logoparaverso.png
  await sharp(Buffer.from(svgLogoColor))
    .resize(620, 140)
    .png({ quality: 100 })
    .toFile(path.join(PUBLIC_DIR, 'logo.png'));

  await sharp(Buffer.from(svgLogoColor))
    .resize(620, 140)
    .png({ quality: 100 })
    .toFile(path.join(PUBLIC_DIR, 'logoparaverso.png'));

  // Render high-res PNGs for logo_white.png and logoparaversowhite.png
  await sharp(Buffer.from(svgLogoWhite))
    .resize(620, 140)
    .png({ quality: 100 })
    .toFile(path.join(PUBLIC_DIR, 'logo_white.png'));

  await sharp(Buffer.from(svgLogoWhite))
    .resize(620, 140)
    .png({ quality: 100 })
    .toFile(path.join(PUBLIC_DIR, 'logoparaversowhite.png'));

  // Root level copies as fallback
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
        <stop offset="0%" stop-color="#07121E" />
        <stop offset="50%" stop-color="#0A1E33" />
        <stop offset="100%" stop-color="#05101E" />
      </linearGradient>
      <linearGradient id="accentBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00E5FF" />
        <stop offset="50%" stop-color="#DE292E" />
        <stop offset="100%" stop-color="#00FF88" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#ogBg)" />
    <!-- Gradient accent line -->
    <rect x="0" y="0" width="1200" height="8" fill="url(#accentBar)" />

    <g transform="translate(100, 120)">
      ${svgLogoWhite.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 140" width="620" height="140">', '').replace('</svg>', '')}
    </g>

    <g transform="translate(100, 340)">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="4">PARAVERSO</text>
      <text x="0" y="105" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-size="28" font-weight="600" fill="#38BDF8">Plataforma de Streaming &amp; Realidade Virtual do Estado do Pará</text>
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

  console.log('✅ Logo PARAVERSO e variantes (colorida e branca) geradas com sucesso!');
}

main().catch(console.error);


import { Category, Course } from './types';

// URLs de vídeos e materiais para demonstração imersiva
const GENERIC_VIDEO = 'https://www.youtube.com/watch?v=p3Qec3Rl_s4';
const CIRIO_IMAGE = 'https://urbnews.com.br/wp-content/uploads/2025/10/cirio-2024-caique-araujo_b796e2c9125ba0ecc0e1444af90db143.jpg';
const EJA_PDF_URL = 'https://educapes.capes.gov.br/bitstream/capes/583371/2/produto-caderno-de-alfabetizacao.pdf';

// Imagens Oficiais Solicitadas
const IMG_FESTIVAL_CARIMBO = 'https://load.websg.app.br/belem.com.br/image?src=https://belem.com.br/images/noticias/17027/19111055_1000154702.png&w=1200&h=675&output=jpg';
const IMG_PARARRAIA = 'https://cdn.dol.com.br/img/Artigo-Destaque/940000/1200x675/---2026-06-06t075520179009437800-3.jpg?fallback=https%3A%2F%2Fcdn.dol.com.br%2Fimg%2FArtigo-Destaque%2F940000%2F---2026-06-06t075520179009437800.png%3Fxid%3D3255389&xid=3255389';
const IMG_FESTIVAL_SAIRE = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMPMzDY6GEAf6cXMy8X9Mfbat21Q7WgEa2XWJQmEzqJ31FW2pEYfa0KnlOA_OnmJaHNDAu7bDNK_h-9BaSq28mP1E4LKkZPiNEV0Hdrqm_Ln2kef50jRtffpnLyC9NCI9xoJgqX1w9gBdl/s1600/Boto+Tamara+Sar%25C3%25A9.jpg';
const IMG_MARUJADA = 'https://cnbbn2.com.br/site/wp-content/uploads/2024/09/Capa-Site-28.jpg';

const IMG_MUNDURUKU = 'https://www.esquerdadiario.com.br/IMG/jpg/162205115260ae895080312_1622051152_3x2_rt.jpg';
const IMG_MARAJO = 'https://levenaviagem.com.br/wp-content/uploads/2018/12/DJI_0590.jpg.webp';
const IMG_SANTAREM = 'https://blog.123milhas.com/wp-content/uploads/2022/01/BANNER-TEM-QUE-CONHECER-SANTAREM-123MILHAS.jpg';
const IMG_JOGOS_INDIGENAS = 'https://4.bp.blogspot.com/-ViBBlX6SzHM/UfAUTSsTDQI/AAAAAAAAVU4/wsSFIOTtxAQ/s1600/893274600_480ad9a953_b.jpg';

// Novas Imagens Oficiais Solicitadas
const IMG_CERAMICA_MARAJOARA = 'https://i.pinimg.com/originals/bb/95/b4/bb95b45539ff651a56d81c0bb1892758.jpg?nii=t';
const IMG_VOZES_DOS_RIOS = 'https://jaderbarbalho.com.br/wp-content/uploads/2025/10/ribeirinho.jpg';
const IMG_MESTRES_CURIMBO = 'https://www.tvkweb.com.br/wp-content/uploads/2019/06/Tambores-do-carimb%C3%B3.jpg';
const IMG_VER_O_PESO = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVi9uezhiohyCX3BKk5WxtQOH2kl3SOCG_NFKcYDBfqXM1AVzWQYhChdTVyWI8iXE0Gefq1AQSOhdqCGGzkkPDi95N6DCJ6Vaqaz5qd05oLpGQzj1UEazM9xUUnJy2FBdmeoEwqLWBJgI/s1600/7.jpg';
const IMG_FORTES_MURALHAS = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Forte_do_Pres%C3%A9pio_-_Bel%C3%A9m-PA_-_panoramio.jpg';
const IMG_MULHERES_FLORESTA = 'https://anaind.org.br/wp-content/uploads/2025/10/IMG-20250926-WA0036.jpg';
const IMG_ENCANTARIAS_MITOS = 'https://www.tnh1.com.br/tnh1-variedades/wp-content/uploads/2026/02/Animal-lendario-do-folclore-brasileiro-corre-serios-riscos-de-extincao-na-Amazonia.png';
const IMG_PAVULAGEM = 'https://cdn.dol.com.br/img/Artigo-Destaque/940000/1200x675/pavulagem-2009445020-3.jpg';
const IMG_AMAZONIA_VR = 'https://i.ytimg.com/vi/J2RWKouu7fs/maxresdefault.jpg';
const IMG_COP30 = 'https://blogdoedisonsilva.com.br/wp-content/uploads/2025/11/rbr7485.webp';
const IMG_PARQUES_UC = 'https://imgs.mongabay.com/wp-content/uploads/sites/29/2025/10/20165240/2048px-Brazil_nut_tree_in_the_rainforest-castanheira-amazonia-peruana-My-Favorite-Pet-Sitter-CC-BY-2.0-via-Wikimedia-Commons.jpg';
const IMG_GUARDIOES_FLORESTA = 'https://wwfbrnew.awsassets.panda.org/img/original/tecnologia_para_amazonia2.jpg';
const IMG_MANGUEZAIS = 'https://www.centec.org.br/wp-content/uploads/2025/07/Imagem-do-WhatsApp-de-2024-08-30-as-16.56.05_33fa1d2b.jpg';

// Imagens Bioeconomia & Gastronomia Solicitadas
const IMG_GASTRONOMIA_PARAENSE = 'https://paramais.com.br/wp-content/uploads/2026/08/ChatGPT-Image-2-de-ago.-de-2026-23_22_04.jpg';
const IMG_CADEIA_ACAI = 'https://www.correiobraziliense.com.br/cbradar/wp-content/uploads/2026/07/15-2026-07-08T160446.249-1200x675.png';
const IMG_CACAU_TRANSAMAZONICA = 'https://avozdoxingu.com.br/wp-content/uploads/2022/06/Festival-do-Cacau-08.jpeg';
const IMG_FARINHA_BRAGANCA = 'https://www.farturabrasil.com.br/wp-content/uploads/2021/10/farinha-uarini.jpg';
const IMG_BIOJOIAS_MIRITI = 'https://mapacultural.pa.gov.br/files/agent/58421/file/1182706/whatsapp-image-2024-10-23-at-14-50-01-6ab22a92a3de96fa9f0677a4033ba01c.jpeg';
const IMG_MANEJO_PIRARUCU = 'https://mamiraua.org.br/wp-content/uploads/2025/11/Manejodopirarucu-Andre-Dib-copy-scaled.jpg';

// --- 🏛️ 1. PATRIMONIAL E SABERES (6 Conteúdos) ---
const PATRIMONIAL_COURSES: Course[] = [
  {
    id: 'povo-munduruku',
    title: 'Conheça quem é o Povo Munduruku',
    category: Category.Patrimonial,
    description: 'Imersão antropológica e documental sobre a história, território do Médio e Alto Tapajós, cosmologia, resistência e organização social dos Munduruku.',
    instructor: 'Lideranças & Mestres Tradicionais Munduruku • SECULT-PA',
    thumbnail: IMG_MUNDURUKU,
    heroImage: IMG_MUNDURUKU,
    progress: 0,
    duration: '45 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-munduruku-1', title: 'Ficha Etnográfica & Território Munduruku (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    quiz: [
      { id: 1, question: "Em qual bacia hidrográfica do Pará se concentra a maior população tradicional Munduruku?", options: ["Bacia do Rio Tapajós", "Bacia do Rio Guajará", "Bacia do Rio Caeté", "Bacia do Rio Tocantins"], correctAnswer: 0 },
      { id: 2, question: "Qual é um dos pilares centrais da cosmologia Munduruku?", options: ["Preservação sagrada dos rios, florestas e cantos ancestrais", "Comércio industrial desenfreado", "Abandono dos saberes dos anciãos", "Monocultura de larga escala"], correctAnswer: 0 }
    ],
    modules: [
      { 
        title: 'Módulo 1 : História e Território no Tapajós', 
        lessons: [
          { id: 'mun-1', title: 'Origens, Mitologia e Território Ancestral', duration: '18 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=PQdZ_3_r8nA' },
          { id: 'mun-2', title: 'Língua Munduruku e Tradição Oral', duration: '15 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=PQdZ_3_r8nA' }
        ] 
      },
      { 
        title: 'Módulo 2 : Arte Plumária e Cosmologia', 
        lessons: [
          { id: 'mun-3', title: 'Tecelagem, Grafismos e Cerâmica Tradicional', duration: '20 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=PQdZ_3_r8nA' },
          { id: 'mun-4', title: 'Sustentabilidade e Soberania Alimentar', duration: '22 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=PQdZ_3_r8nA' }
        ] 
      }
    ]
  },
  {
    id: 'conheca-o-marajo',
    title: 'Conheça o Marajó',
    category: Category.Patrimonial,
    description: 'Explore o maior arquipélago fluviomarítimo do planeta: campos inundáveis, fazendas de búfalos, a milenar cerâmica marajoara e a vibrante cultura das comunidades ribeirinhas.',
    instructor: 'Pesquisadores do Museu do Marajó & SECULT-PA',
    thumbnail: IMG_MARAJO,
    heroImage: IMG_MARAJO,
    progress: 25,
    duration: '50 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-marajo-1', title: 'Guia do Patrimônio Marajoara & Arqueologia (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : Geografia e Arqueologia Marajoara', 
        lessons: [
          { id: 'mar-1', title: 'Os Tesouros Arqueológicos e a Cerâmica Marajoara', duration: '16 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=0HqY7Ja5nXM' },
          { id: 'mar-2', title: 'Campos Naturais, Rios e Fauna do Arquipélago', duration: '20 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=DSfFuhzOzQc' }
        ] 
      },
      { 
        title: 'Módulo 2 : Modos de Vida e Tradições Ribeirinhas', 
        lessons: [
          { id: 'mar-3', title: 'Culinária Marajoara e Manejo Sustentável do Queijo de Búfala', duration: '18 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=8ERcGZWTzlw' }
        ] 
      }
    ]
  },
  {
    id: 'conheca-santarem',
    title: 'Conheça Santarém',
    category: Category.Patrimonial,
    description: 'A "Pérola do Tapajós": o espetacular Encontro das Águas dos Rios Tapajós e Amazonas, praias fluviais de Alter do Chão, arquitetura histórica e herança da cerâmica tapajônica.',
    instructor: 'Historiadores e Mestres de Cultura de Santarém • FCP',
    thumbnail: IMG_SANTAREM,
    heroImage: IMG_SANTAREM,
    progress: 0,
    duration: '40 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-santarem-1', title: 'Roteiro Histórico e Paisagístico de Santarém (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : Encontro das Águas e Patrimônio Urbano', 
        lessons: [
          { id: 'san-1', title: 'Fenômeno das Águas: Rio Tapajós e Rio Amazonas', duration: '15 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'san-2', title: 'Centro Histórico e Memória Tapajônica', duration: '22 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      }
    ]
  },
  {
    id: 'jogos-indigenas-para',
    title: 'Jogos Indígenas',
    category: Category.Patrimonial,
    description: 'Documentário interativo sobre as olimpíadas e esportes tradicionais das etnias originárias do Pará: arco e flecha, corrida com tora, zarabatana, luta corporal e ritos sagrados.',
    instructor: 'Conselho Estadual dos Povos Indígenas & SEEL / SECULT',
    thumbnail: IMG_JOGOS_INDIGENAS,
    heroImage: IMG_JOGOS_INDIGENAS,
    progress: 0,
    duration: '35 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-jogos-1', title: 'Manual dos Esportes Tradicionais Indígenas (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : Modalidades e Tradições Corporais', 
        lessons: [
          { id: 'ji-1', title: 'Arco e Flecha e Corrida de Tora', duration: '18 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'ji-2', title: 'Lutas Tradicionais, Ritos e Danças Corporais', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      }
    ]
  },
  {
    id: 'ceramica-arqueologica-paraense',
    title: 'Cerâmica Marajoara e Tapajônica: Arte Milenar',
    category: Category.Patrimonial,
    description: 'A sofisticação artística e cosmologia inscrita nas urnas funerárias marajoaras e vasos de cariátides do Tapajós, com registros dos acervos dos museus do Pará.',
    instructor: 'Arqueólogos do Museu Paraense Emílio Goeldi & SECULT',
    thumbnail: IMG_CERAMICA_MARAJOARA,
    heroImage: IMG_CERAMICA_MARAJOARA,
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : Arqueologia e Estilos Cerâmicos',
        lessons: [
          { id: 'cer-1', title: 'Morfologia Marajoara e Simbologia Xamânica', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'cer-2', title: 'A Cerâmica do Baixo Amazonas e Tapajós', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'mestres-tradicao-oral-para',
    title: 'Mestres da Cultura Popular e Saberes Ancestrais',
    category: Category.Patrimonial,
    description: 'A voz, a sabedoria e as narrativas dos mestres e mestras guardiões da memória oral, erveiras do Ver-o-Peso, contadores de causos e parteiras tradicionais do Pará.',
    instructor: 'Comissão Paraense de Folclore & Fundação Cultural do Pará',
    thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '45 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : Saberes Vivos e Memória Comunitária',
        lessons: [
          { id: 'mes-1', title: 'Erveiras e Farmacopeia Popular da Amazônia', duration: '22 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'mes-2', title: 'Contos, Encantarias e Filosofia Ribeirinha', duration: '23 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// --- 🎭 2. EVENTOS CULTURAIS (6 Conteúdos) ---
const EVENTOS_CULTURAIS_COURSES: Course[] = [
  {
    id: 'festival-de-carimbo',
    title: 'Festival de Carimbó de Marapanim',
    category: Category.Eventos,
    description: 'Sinta o calor dos tambores de curimbó, a ginga das saias rodadas e a celebração dos mestres da cultura popular em Marapanim e nas praias do litoral paraense.',
    instructor: 'Associação dos Mestres de Carimbó • SECULT-PA',
    thumbnail: IMG_FESTIVAL_CARIMBO,
    heroImage: IMG_FESTIVAL_CARIMBO,
    progress: 30,
    duration: '60 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-carimbo-1', title: 'História do Carimbó: Patrimônio Cultural Imaterial do Brasil (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : As Raízes do Ritmo', 
        lessons: [
          { id: 'car-1', title: 'Confecção dos Tambores e Instrumentos Tradicionais', duration: '15 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Ri0ihgVlsnM' },
          { id: 'car-2', title: 'Mestre Verequete e os Baluartes do Carimbó', duration: '22 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Ri0ihgVlsnM' }
        ] 
      },
      { 
        title: 'Módulo 2 : A Grande Roda em 360°', 
        lessons: [
          { id: 'car-3', title: 'Show ao Vivo no Festival de Marapanim em VR 360°', duration: '25 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Ri0ihgVlsnM' }
        ] 
      }
    ]
  },
  {
    id: 'pararraia-2026',
    title: 'Parárraiá - O São João da Amazônia',
    category: Category.Eventos,
    description: 'O Maior São João da Amazônia! Acompanhe as apresentações das quadrilhas juninas, shows com artistas de tecnobrega, forró paraense e gastronomia típica junina.',
    instructor: 'Comissão Organizadora do Parárraiá • Governo do Pará',
    thumbnail: IMG_PARARRAIA,
    heroImage: IMG_PARARRAIA,
    progress: 0,
    duration: '90 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-arraia-1', title: 'Caderno de Programação Oficial e História Junina Paraense (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : As Quadrilhas Juninas Campeãs', 
        lessons: [
          { id: 'par-1', title: 'Espetáculo de Cores, Coreografias e Tradição', duration: '28 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=J-oRo4lIAnc' },
          { id: 'par-2', title: 'Culinária de São João: Mingau de Milho, Vatapá e Maniçoba', duration: '18 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=J-oRo4lIAnc' }
        ] 
      }
    ]
  },
  {
    id: 'festival-de-saire',
    title: 'Festival do Sairé',
    category: Category.Eventos,
    description: 'A fascinante celebração religiosa e folclórica de Alter do Chão: o rito do mastro sagrado e a emocionante disputa entre o Boto Cor-de-Rosa e o Boto Tucuxi no Lago dos Botos.',
    instructor: 'Comunidade Borari de Alter do Chão & SECULT',
    thumbnail: IMG_FESTIVAL_SAIRE,
    heroImage: IMG_FESTIVAL_SAIRE,
    progress: 0,
    duration: '75 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-saire-1', title: 'Dossiê Cultural do Sairé: Fé e Encantaria no Tapajós (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : O Ritual Sagrado do Sairé', 
        lessons: [
          { id: 'sai-1', title: 'O Levantamento dos Mastros e os Cânticos Borari', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      },
      { 
        title: 'Módulo 2 : A Disputa dos Botos', 
        lessons: [
          { id: 'sai-2', title: 'Boto Tucuxi vs Boto Cor-de-Rosa: Teatro e Dança Popular', duration: '35 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      }
    ]
  },
  {
    id: 'marujada-de-braganca',
    title: 'Marujada',
    category: Category.Eventos,
    description: 'A secular Marujada de São Benedito em Bragança: os trajes bordados em azul e vermelho, o ritmo das rabecas, tambores e a devoção emocionante iniciada pelos escravizados em 1798.',
    instructor: 'Irmandade de São Benedito de Bragança & SECULT',
    thumbnail: IMG_MARUJADA,
    heroImage: IMG_MARUJADA,
    progress: 0,
    duration: '50 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-marujada-1', title: 'Registro do Patrimônio Imaterial da Marujada (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : Fé e Tradição Afro-Paraense', 
        lessons: [
          { id: 'maru-1', title: 'A Origem da Irmandade de São Benedito', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'maru-2', title: 'As Danças: Retumbão, Chorado e Xote Bragantino', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      }
    ]
  },
  {
    id: 'cirio-de-nazare',
    title: 'Círio de Nazaré - Fé & Identidade',
    category: Category.Eventos,
    description: 'A maior procissão religiosa do planeta: a corda, o manto sagrado, a trasladação fluvial e a união de mais de 2 milhões de romeiros nas ruas de Belém do Pará em registros 360° imersivos.',
    instructor: 'Diretoria da Festa de Nazaré & Curadoria SECULT-PA',
    thumbnail: CIRIO_IMAGE,
    heroImage: CIRIO_IMAGE,
    progress: 50,
    duration: '60 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-cirio-1', title: 'Dossiê do Círio de Nazaré - IPHAN & SECULT (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : A História e os Símbolos da Fé', 
        lessons: [
          { id: 'cir-1', title: 'O Achado de Plácido e a Construção da Basílica', duration: '18 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=pIAg-HamCUM' },
          { id: 'cir-2', title: 'A Corda dos Romeiros e os Mantos da Virgem', duration: '22 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=pIAg-HamCUM' }
        ] 
      },
      { 
        title: 'Módulo 2 : A Grande Romaria em VR 360°', 
        lessons: [
          { id: 'cir-3', title: 'A Trasladação Noturna e a Manhã de Domingo do Círio', duration: '30 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=pIAg-HamCUM' }
        ] 
      }
    ]
  },
  {
    id: 'arrastao-do-pavulagem',
    title: 'Arrastão do Pavulagem e Cordões Juninos',
    category: Category.Eventos,
    description: 'O cortejo do Boi Pavulagem pelas avenidas de Belém: chapéus de palha com fitas coloridas, ritmos amazônicos de toadas e carimbó, e celebração da juventude popular.',
    instructor: 'Instituto Arraial do Pavulagem & FCP',
    thumbnail: IMG_PAVULAGEM,
    heroImage: IMG_PAVULAGEM,
    progress: 0,
    duration: '50 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : A Magia das Fitas e Ritmos Amazônicos',
        lessons: [
          { id: 'pav-1', title: 'Oficinas de Percussão e Dança do Boi', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// --- 🎬 3. DOCUMENTÁRIOS (6 Conteúdos) ---
const DOCUMENTARIOS_COURSES: Course[] = [
  {
    id: 'doc-vozes-dos-rios',
    title: 'Vozes dos Rios: Povos das Águas',
    category: Category.Documentarios,
    description: 'Documentário cinematográfico sobre a vida das comunidades ribeirinhas nos canais fluviais do Pará, sua relação com a maré, a pesca artesanal e a preservação florestal.',
    instructor: 'Cineastas Paraenses • Editais SECULT Audiovisual',
    thumbnail: IMG_VOZES_DOS_RIOS,
    heroImage: IMG_VOZES_DOS_RIOS,
    progress: 0,
    duration: '55 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : O Cotidiano das Marés',
        lessons: [
          { id: 'vr-1', title: 'Navegações e Tradições Ribeirinhas no Baixo Amazonas', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'doc-mestres-carimbo',
    title: 'Mestres do Curimbó: O Som da Floresta',
    category: Category.Documentarios,
    description: 'Registros raros e depoimentos de vida dos grandes mestres do Carimbó: Lucindo, Verequete, Cupijó e as novas gerações que mantêm o tambor pulsante no Pará.',
    instructor: 'Núcleo de Produção Audiovisual da FCP',
    thumbnail: IMG_MESTRES_CURIMBO,
    heroImage: IMG_MESTRES_CURIMBO,
    progress: 0,
    duration: '60 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : A Linha do Tempo do Curimbó',
        lessons: [
          { id: 'mc-1', title: 'Dos Quilombos às Praias: O Carimbó como Identidade', duration: '35 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'doc-ver-o-peso',
    title: 'Ver-o-Peso: Memória e Pulsação da Amazônia',
    category: Category.Documentarios,
    description: 'Um olhar poético sobre a maior feira a céu aberto da América Latina: a chegada dos barcos ao amanhecer, o mercado de peixes, o setor de ervas e a gastronomia paraense.',
    instructor: 'Documentaristas e Pesquisadores de Belém',
    thumbnail: IMG_VER_O_PESO,
    heroImage: IMG_VER_O_PESO,
    progress: 0,
    duration: '48 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : O Despertar da Feira',
        lessons: [
          { id: 'vp-1', title: 'Barcos de Açaí e o Encontro das Águas do Guajará', duration: '28 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'doc-fortalezas-amazonia',
    title: 'Fortes e Muralhas: Arquitetura do Grão-Pará',
    category: Category.Documentarios,
    description: 'A epopeia histórica da ocupação e defesa da Amazônia: o Forte do Presépio em Belém, o Forte de Gurupá e o patrimônio arquitetônico colonial preservado.',
    instructor: 'Departamento de Patrimônio Histórico • SECULT',
    thumbnail: IMG_FORTES_MURALHAS,
    heroImage: IMG_FORTES_MURALHAS,
    progress: 0,
    duration: '42 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : Canhões e Pedras no Rio Amazonas',
        lessons: [
          { id: 'fa-1', title: 'Forte do Castelo e as Origens de Belém', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'doc-mulheres-indigenas',
    title: 'Mulheres da Floresta: Saberes Originários',
    category: Category.Documentarios,
    description: 'Lideranças femininas originárias do Pará contam sobre agroecologia tradicional, cantos sagrados, medicina da floresta e protagonismo na preservação ambiental.',
    instructor: 'Articulação das Mulheres Indígenas do Pará & SECULT',
    thumbnail: IMG_MULHERES_FLORESTA,
    heroImage: IMG_MULHERES_FLORESTA,
    progress: 0,
    duration: '50 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : Vozes que Protegem a Terra',
        lessons: [
          { id: 'mi-1', title: 'Educação Tradicional e Transmissão de Saberes', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'doc-encantarias-mitos',
    title: 'Encantarias e Mitos da Amazônia',
    category: Category.Documentarios,
    description: 'A rica mitologia amazônica: a lenda do Boto, da Iara, da Matinta Pereira e do Curupira narradas pelos caboclos e ribeirinhos nos interiores do Pará.',
    instructor: 'Pesquisadores do Folclore e Memória Oral • FCP',
    thumbnail: IMG_ENCANTARIAS_MITOS,
    heroImage: IMG_ENCANTARIAS_MITOS,
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1 : O Universo Sobrenatural Amazônico',
        lessons: [
          { id: 'em-1', title: 'Mitos da Noite e Proteção da Selva', duration: '22 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// --- 🌿 4. MEIO AMBIENTE (6 Conteúdos) ---
const MEIO_AMBIENTE_COURSES: Course[] = [
  {
    id: 'amazonia-vr-360',
    title: 'A Floresta Amazônica em Realidade Virtual 360°',
    category: Category.MeioAmbiente,
    description: 'Sobrevoe as copas das árvores centenárias, navegue pelos igarapés intocados e conheça a biodiversidade única das Unidades de Conservação do Estado do Pará.',
    instructor: 'Equipe de Expedições Audiovisuais PARAVERSO • SECULT',
    thumbnail: IMG_AMAZONIA_VR,
    heroImage: IMG_AMAZONIA_VR,
    progress: 0,
    duration: '45 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-bio-1', title: 'Atlas da Biodiversidade Paraense e Clima (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : As Bacias Hidrográficas do Pará', 
        lessons: [
          { id: 'amz-1', title: 'O Rio Amazonas, Tapajós, Xingu e Tocantins', duration: '20 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=0dkQxRADDH4' },
          { id: 'amz-2', title: 'Florestas de Várzea e Terra Firme', duration: '25 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=0dkQxRADDH4' }
        ] 
      }
    ]
  },
  {
    id: 'rumo-a-cop30',
    title: 'COP30 em Belém: Clima, Floresta e Futuro',
    category: Category.MeioAmbiente,
    description: 'O protagonismo do Pará na Conferência das Nações Unidas sobre as Mudanças Climáticas (COP30): bioeconomia, descarbonização e voz dos povos da floresta.',
    instructor: 'Comitê Estadual COP30 & SECULT / SEMAS',
    thumbnail: IMG_COP30,
    heroImage: IMG_COP30,
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      { title: 'Belém Sede da COP30', lessons: [{ id: 'cop1', title: 'Circuito MIA e Cultura Sustentável Urbana', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'unidades-conservacao-para',
    title: 'Parques e Unidades de Conservação do Pará',
    category: Category.MeioAmbiente,
    description: 'Do Parque Estadual do Utinga à Floresta Nacional do Tapajós: preservação ambiental e turismo sustentável de baixo impacto de carbono.',
    instructor: 'Biólogos & Engenheiros Florestais do IDEFLOR-Bio',
    thumbnail: IMG_PARQUES_UC,
    heroImage: IMG_PARQUES_UC,
    progress: 0,
    duration: '35 min',
    modulesCount: 1,
    modules: [
      { title: 'Conservação da Flora e Fauna', lessons: [{ id: 'uc1', title: 'Fauna Amazônica e Trilhas Ecológicas', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'guardioes-da-floresta',
    title: 'Guardiões Comunitários e Monitoramento da Floresta',
    category: Category.MeioAmbiente,
    description: 'Comunidades agroextrativistas e indígenas que utilizam tecnologias digitais e saberes ancestrais para mapear nascentes e proteger seus territórios.',
    instructor: 'Rede de Monitoramento Comunitário do Pará & SEMAS',
    thumbnail: IMG_GUARDIOES_FLORESTA,
    heroImage: IMG_GUARDIOES_FLORESTA,
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      { title: 'Proteção e Vigilância Ecológica', lessons: [{ id: 'gf1', title: 'Mapeamento de Nascentes e Áreas Protegidas', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'manguezais-paraenses',
    title: 'Manguezais do Pará: Berçário Ecológico',
    category: Category.MeioAmbiente,
    description: 'A costa atlântica paraense abriga a maior faixa contínua de manguezais do mundo: proteção contra erosão marinha, berçário de caranguejos e peixes costeiros.',
    instructor: 'Oceanógrafos e Pesquisadores Costeiros da UFPA',
    thumbnail: IMG_MANGUEZAIS,
    heroImage: IMG_MANGUEZAIS,
    progress: 0,
    duration: '38 min',
    modulesCount: 1,
    modules: [
      { title: 'Vida nos Manguezais', lessons: [{ id: 'mg1', title: 'Catadores de Caranguejo e Manejo Sustentável', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'recuperacao-florestal-nativas',
    title: 'Restauração Florestal e Viveiros de Espécies Nativas',
    category: Category.MeioAmbiente,
    description: 'Projetos de reflorestamento produtivo no Pará: plantio de castanha-do-pará, andiroba, copaíba e sistemas agroflorestais regenerativos.',
    instructor: 'Técnicos da EMATER-Pará & IDEFLOR-Bio',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '42 min',
    modulesCount: 1,
    modules: [
      { title: 'Sistemas Agroflorestais Regenerativos', lessons: [{ id: 'rf1', title: 'Produção de Mudas Florestais Nativas', duration: '22 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  }
];

// --- 🍲 5. BIOECONOMIA (6 Conteúdos) ---
const BIOECONOMIA_COURSES: Course[] = [
  {
    id: 'culinaria-paraense',
    title: 'Gastronomia Paraense: Do Tucupi ao Jambu',
    category: Category.Bioeconomia,
    description: 'Do tucupi ao jambu, maniçoba, pato no tucupi e o autêntico açaí paraense: o rico universo sensorial da gastronomia consagrada pela UNESCO.',
    instructor: 'Chefs & Mestres da Gastronomia Paraense • SECULT',
    thumbnail: IMG_GASTRONOMIA_PARAENSE,
    heroImage: IMG_GASTRONOMIA_PARAENSE,
    progress: 0,
    duration: '50 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-gast-1', title: 'Receitas Tradicionais e Ingredientes Amazônicos (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : Ingredientes Sagrados', 
        lessons: [
          { id: 'gas-1', title: 'A Mandioca e os Segredos do Tucupi e da Maniva', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'gas-2', title: 'O Jambu e a Sensação Vibrante na Culinária', duration: '18 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      }
    ]
  },
  {
    id: 'bioeconomia-acai',
    title: 'Cadeia Produtiva do Açaí e Manejo Sustentável',
    category: Category.Bioeconomia,
    description: 'O fortalecimento do cultivo e colheita tradicional do açaí nas ilhas de Belém e igarapés do Baixo Tocantins, gerando renda e conservando a floresta viva.',
    instructor: 'Cooperativas Ribeirinhas & SEDAP / SECULT',
    thumbnail: IMG_CADEIA_ACAI,
    heroImage: IMG_CADEIA_ACAI,
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      { title: 'Sustentabilidade e Manejo', lessons: [{ id: 'bio1', title: 'Manejo Sustentável de Açaizais Nativos', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'cacau-medicilandia-amazonia',
    title: 'Cacau da Transamazônica e Chocolates Artesanais',
    category: Category.Bioeconomia,
    description: 'A revolução do cacau fino da região de Medicilândia e Uruará: produção sustentável com indicação geográfica e chocolates de alta gastronomia.',
    instructor: 'Mestres Chocolatiers & Produtores da Transamazônica',
    thumbnail: IMG_CACAU_TRANSAMAZONICA,
    heroImage: IMG_CACAU_TRANSAMAZONICA,
    progress: 0,
    duration: '38 min',
    modulesCount: 1,
    modules: [
      { title: 'Do Grão à Barra', lessons: [{ id: 'cc1', title: 'Fermentação e Qualidade do Cacau Selvagem', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'farinha-bragantina-mandioca',
    title: 'Farinha de Bragança: Tradição e Saberes da Mandioca',
    category: Category.Bioeconomia,
    description: 'A famosa farinha d’água de Bragança: processo artesanal nos fornos tradicionais, tipos de torra e importância cultural na mesa paraense.',
    instructor: 'Associação de Produtores de Farinha de Bragança',
    thumbnail: IMG_FARINHA_BRAGANCA,
    heroImage: IMG_FARINHA_BRAGANCA,
    progress: 0,
    duration: '35 min',
    modulesCount: 1,
    modules: [
      { title: 'A Rota da Mandioca', lessons: [{ id: 'fb1', title: 'Casas de Farinha e Mestres Forneiros', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'artesanato-miriti-biojoias',
    title: 'Biojoias e Fibras de Miriti: Design e Bioeconomia',
    category: Category.Bioeconomia,
    description: 'A transformação da fibra da palmeira de buriti/miriti em brinquedos coloridos de Abaetetuba e sementes nativas em biojoias com reconhecimento internacional.',
    instructor: 'Artesãos de Abaetetuba & FCP Polo Joalheiro',
    thumbnail: IMG_BIOJOIAS_MIRITI,
    heroImage: IMG_BIOJOIAS_MIRITI,
    progress: 0,
    duration: '36 min',
    modulesCount: 1,
    modules: [
      { title: 'Brinquedos de Miriti e Biojoias', lessons: [{ id: 'bm1', title: 'Técnicas de Talho e Tingimento Natural', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'piscicultura-manejo-pirarucu',
    title: 'Manejo Sustentável do Pirarucu e Peixes da Amazônia',
    category: Category.Bioeconomia,
    description: 'O gigante dos rios amazônicos: como acordos comunitários de pesca protegem os lagos e garantem renda sustentável para pescadores do Baixo Amazonas.',
    instructor: 'Especialistas em Recursos Pesqueiros • SEDAP / SECULT',
    thumbnail: IMG_MANEJO_PIRARUCU,
    heroImage: IMG_MANEJO_PIRARUCU,
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      { title: 'Contagem e Captura Sustentável', lessons: [{ id: 'pir1', title: 'Acordos Comunitários nos Lagos de Várzea', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  }
];

// --- 💼 6. GESTÃO CULTURAL (6 Conteúdos) ---
const GESTAO_COURSES: Course[] = [
  {
    id: 'politica-aldir-blanc-pnab',
    title: 'Editais PNAB & Política Nacional Aldir Blanc',
    category: Category.Gestao,
    description: 'Como artistas, coletivos e fazedores de cultura paraenses acessam os editais da PNAB, Pontões de Cultura e submetem propostas na plataforma Mapa Cultural do Pará.',
    instructor: 'Coordenação de Editais & Fomento • SECULT-PA',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    progress: 10,
    duration: '45 min',
    modulesCount: 2,
    materials: [
      { id: 'mat-pnab-1', title: 'Guia Prático de Inscrição em Editais PNAB Pará (PDF)', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    modules: [
      { 
        title: 'Módulo 1 : Elaboração de Projetos Culturais', 
        lessons: [
          { id: 'pnab-1', title: 'Como Cadastrar e Utilizar o Mapa Cultural do Pará', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'pnab-2', title: 'Orçamento, Justificativa e Prestação de Contas', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ] 
      }
    ]
  },
  {
    id: 'mapa-cultural-do-para',
    title: 'Mapa Cultural do Pará: Plataforma Oficial',
    category: Category.Gestao,
    description: 'A plataforma colaborativa oficial onde agentes culturais cadastram espaços, eventos, portfólios e participam de seleções públicas do Governo do Estado.',
    instructor: 'Equipe Técnica de Informação Cultural • SECULT-PA',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '35 min',
    modulesCount: 1,
    modules: [
      { title: 'Mapeamento e Conectividade Cultural', lessons: [{ id: 'map1', title: 'Passo a Passo de Cadastro e Inscrição', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'usinas-da-paz-cultura',
    title: 'Cultura e Cidadania nas Usinas da Paz',
    category: Category.Gestao,
    description: 'Conheça o impacto transformador das Usinas da Paz (UsiPaz) no Pará: oficinas artísticas, teatro, capoeira, breakdance e capacitação profissional em áreas prioritárias.',
    instructor: 'Fundação Cultural do Pará (FCP) & SECULT',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '35 min',
    modulesCount: 1,
    modules: [
      { title: 'Inclusão Cultural e Juventude', lessons: [{ id: 'usi1', title: 'Oficinas e Editais da FCP para as Usinas da Paz', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'elaboracao-projetos-prestacao',
    title: 'Elaboração de Projetos Culturais e Prestação de Contas',
    category: Category.Gestao,
    description: 'Curso prático para produtores locais: cronogramas executivos, orçamentos compatíveis com a tabela pública, acessibilidade cultural e relatórios finais.',
    instructor: 'Auditores e Gestores de Editais • FCP / SECULT',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40 min',
    modulesCount: 1,
    modules: [
      { title: 'Gestão Financeira e Conformidade', lessons: [{ id: 'ep1', title: 'Prestação de Contas Simplificada para Artistas', duration: '22 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'pontoes-de-cultura-comunitarios',
    title: 'Pontões de Cultura e Redes Vivas nos Territórios',
    category: Category.Gestao,
    description: 'Como articular comunidades tradicionais, quilombos e coletivos periféricos em redes de difusão com financiamento continuado do Estado.',
    instructor: 'Rede Estadual de Pontos de Cultura • SECULT-PA',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '38 min',
    modulesCount: 1,
    modules: [
      { title: 'Articulação Comunitária Territorial', lessons: [{ id: 'pc1', title: 'Autonomia dos Coletivos Culturais', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'economia-criativa-empreendedorismo',
    title: 'Economia Criativa e Empreendedorismo no Pará',
    category: Category.Gestao,
    description: 'Modelos de negócio para a música amazônica, audiovisual, moda autoral sustentável e circulação internacional de espetáculos paraenses.',
    instructor: 'Especialistas em Economia Criativa • SEBRAE-PA & SECULT',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '42 min',
    modulesCount: 1,
    modules: [
      { title: 'Mercado e Cadeias Criativas', lessons: [{ id: 'ec1', title: 'Circulação de Artistas e Marcas Paraenses', duration: '22 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  }
];

// --- 🌟 UNIFICAÇÃO DO ACERVO PARAVERSO (6 categorias x 6 conteúdos = 36 conteúdos) ---
export const COURSES: Course[] = [
  ...PATRIMONIAL_COURSES,
  ...EVENTOS_CULTURAIS_COURSES,
  ...DOCUMENTARIOS_COURSES,
  ...MEIO_AMBIENTE_COURSES,
  ...BIOECONOMIA_COURSES,
  ...GESTAO_COURSES,
];

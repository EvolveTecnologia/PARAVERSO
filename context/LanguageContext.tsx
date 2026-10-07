import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'fr';

export interface LanguageOption {
  code: Language;
  countryName: string;
  langName: string;
  flagAlt: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'pt',
    countryName: 'Brasil',
    langName: 'Português',
    flagAlt: 'Bandeira do Brasil',
  },
  {
    code: 'en',
    countryName: 'Estados Unidos',
    langName: 'English',
    flagAlt: 'Flag of the United States',
  },
  {
    code: 'fr',
    countryName: 'França',
    langName: 'Français',
    flagAlt: 'Drapeau de la France',
  },
];

export interface Translations {
  // Navigation & Menus
  navHome: string;
  navSearch: string;
  navAiTutor: string;
  navTrail: string;
  navDownloads: string;
  navProfile: string;
  navLogout: string;
  
  // Header & General
  platformName: string;
  platformSubtitle: string;
  languageSelect: string;
  searchPlaceholder: string;
  signIn: string;
  signUp: string;
  myList: string;
  inMyList: string;
  watchNow: string;
  viewDetails: string;
  back: string;
  share: string;
  download: string;
  downloaded: string;
  deleteDownload: string;
  offlineReady: string;

  // Home Screen
  heroNew: string;
  heroCulture: string;
  heroNature: string;
  heroVirtual: string;
  trendingSection: string;
  categoriesSection: string;
  allCoursesSection: string;
  aiTutorBadge: string;
  aiTutorTitle: string;
  aiTutorDesc: string;
  aiTutorCta: string;

  // Categories
  catCulture: string;
  catHistory: string;
  catHeritage: string;
  catBiodiversity: string;
  catGastronomy: string;
  catIndigenous: string;

  // Details & Player
  lessonsCount: string;
  modulesCount: string;
  durationLabel: string;
  instructorLabel: string;
  certificateReady: string;
  startExperience: string;
  aboutTitle: string;
  materialsTitle: string;

  // Auth
  authTitle: string;
  authSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  fullNameLabel: string;
  phoneLabel: string;
  termsAgreement: string;
  alreadyHaveAccount: string;
  needAccount: string;
  forgotPassword: string;
  loginSuccess: string;
  guestMode: string;

  // Footer & Institutional
  govTitle: string;
  secultTitle: string;
  rightsReserved: string;
  footerDesc: string;
  terms: string;
  privacy: string;
  contact: string;
  help: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  pt: {
    navHome: 'Início',
    navSearch: 'Buscar',
    navAiTutor: 'Assistente IA',
    navTrail: 'Acervo Cultural',
    navDownloads: 'Downloads',
    navProfile: 'Meu Perfil',
    navLogout: 'Sair',

    platformName: 'PARAVERSO',
    platformSubtitle: 'Plataforma de Streaming & Realidade Virtual do Estado do Pará',
    languageSelect: 'Selecione o Idioma',
    searchPlaceholder: 'Buscar produções, festivais, documentários, patrimônio...',
    signIn: 'Entrar',
    signUp: 'Cadastrar-se',
    myList: 'Minha Lista',
    inMyList: 'Na Lista',
    watchNow: 'Assistir Agora',
    viewDetails: 'Ver Detalhes',
    back: 'Voltar',
    share: 'Compartilhar',
    download: 'Baixar',
    downloaded: 'Baixado',
    deleteDownload: 'Remover',
    offlineReady: 'Disponível offline',

    heroNew: 'Destaque Oficial',
    heroCulture: 'Cultura & Tradição',
    heroNature: 'Amazônia & Biodiversidade',
    heroVirtual: 'Imersão Virtual 360°',
    trendingSection: 'Em Alta no Paráverso',
    categoriesSection: 'Eixos Culturais & Temáticos',
    allCoursesSection: 'Todas as Produções & Experiências',
    aiTutorBadge: 'Inteligência Artificial Oficial',
    aiTutorTitle: 'Assistente do Paráverso (Gemini IA)',
    aiTutorDesc: 'Descubra a história, biodiversidade, festividades como o Círio de Nazaré e a riqueza imaterial do Pará.',
    aiTutorCta: 'Conversar com o Assistente',

    catCulture: 'Cultura & Arte',
    catHistory: 'História & Memória',
    catHeritage: 'Patrimônio Imaterial',
    catBiodiversity: 'Amazônia & Clima',
    catGastronomy: 'Culinária Paraense',
    catIndigenous: 'Saberes Tradicionais',

    lessonsCount: 'Episódios',
    modulesCount: 'Módulos',
    durationLabel: 'Duração',
    instructorLabel: 'Produção / Curadoria',
    certificateReady: 'Certificado SECULT disponível',
    startExperience: 'Iniciar Experiência',
    aboutTitle: 'Sobre a Obra',
    materialsTitle: 'Materiais & Fichas Técnicas',

    authTitle: 'Acesse o Paráverso',
    authSubtitle: 'Portal da Secretaria de Estado de Cultura do Pará',
    emailLabel: 'E-mail cadastrado',
    passwordLabel: 'Senha de acesso',
    fullNameLabel: 'Nome completo',
    phoneLabel: 'Telefone / WhatsApp',
    termsAgreement: 'Concordo com os Termos de Uso e Política de Privacidade da SECULT-PA',
    alreadyHaveAccount: 'Já possui cadastro? Entrar',
    needAccount: 'Não possui conta? Criar acesso',
    forgotPassword: 'Esqueceu a senha?',
    loginSuccess: 'Autenticado com sucesso!',
    guestMode: 'Explorar como Visitante',

    govTitle: 'Governo do Estado do Pará',
    secultTitle: 'Secretaria de Estado de Cultura (SECULT)',
    rightsReserved: 'Todos os direitos reservados.',
    footerDesc: 'Plataforma oficial de imersão digital em Realidade Virtual 360° e difusão do patrimônio cultural, histórico e socioambiental paraense.',
    terms: 'Termos de Uso',
    privacy: 'Privacidade',
    contact: 'Fale Conosco',
    help: 'Ajuda',
  },

  en: {
    navHome: 'Home',
    navSearch: 'Search',
    navAiTutor: 'AI Assistant',
    navTrail: 'Cultural Archive',
    navDownloads: 'Downloads',
    navProfile: 'My Profile',
    navLogout: 'Sign Out',

    platformName: 'PARAVERSO',
    platformSubtitle: 'Streaming & 360° Virtual Reality Platform of Pará State',
    languageSelect: 'Select Language',
    searchPlaceholder: 'Search films, festivals, documentaries, Amazon heritage...',
    signIn: 'Sign In',
    signUp: 'Register',
    myList: 'My List',
    inMyList: 'In List',
    watchNow: 'Watch Now',
    viewDetails: 'View Details',
    back: 'Back',
    share: 'Share',
    download: 'Download',
    downloaded: 'Downloaded',
    deleteDownload: 'Remove',
    offlineReady: 'Available offline',

    heroNew: 'Official Spotlight',
    heroCulture: 'Culture & Tradition',
    heroNature: 'Amazon & Biodiversity',
    heroVirtual: '360° VR Immersion',
    trendingSection: 'Trending on Paráverso',
    categoriesSection: 'Cultural Axes & Themes',
    allCoursesSection: 'All Productions & Experiences',
    aiTutorBadge: 'Official Artificial Intelligence',
    aiTutorTitle: 'Paráverso Assistant (Gemini AI)',
    aiTutorDesc: 'Explore Pará history, Amazon biodiversity, the Círio de Nazaré festival, and traditional cultural heritage.',
    aiTutorCta: 'Chat with Assistant',

    catCulture: 'Culture & Art',
    catHistory: 'History & Memory',
    catHeritage: 'Living Heritage',
    catBiodiversity: 'Amazon & Climate',
    catGastronomy: 'Pará Gastronomy',
    catIndigenous: 'Indigenous Wisdom',

    lessonsCount: 'Episodes',
    modulesCount: 'Modules',
    durationLabel: 'Duration',
    instructorLabel: 'Production / Curators',
    certificateReady: 'SECULT certificate available',
    startExperience: 'Start Experience',
    aboutTitle: 'About this production',
    materialsTitle: 'Technical Sheets & Documents',

    authTitle: 'Welcome to Paráverso',
    authSubtitle: 'State Secretariat of Culture of Pará Portal',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    fullNameLabel: 'Full name',
    phoneLabel: 'Phone number',
    termsAgreement: 'I agree to the SECULT-PA Terms of Use and Privacy Policy',
    alreadyHaveAccount: 'Already have an account? Sign in',
    needAccount: 'Need an account? Sign up',
    forgotPassword: 'Forgot password?',
    loginSuccess: 'Successfully authenticated!',
    guestMode: 'Explore as Guest',

    govTitle: 'Government of Pará State',
    secultTitle: 'State Secretariat of Culture (SECULT)',
    rightsReserved: 'All rights reserved.',
    footerDesc: 'Official digital platform for 360° Virtual Reality immersion and preservation of Pará cultural, historical, and environmental heritage.',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
    help: 'Help Center',
  },

  fr: {
    navHome: 'Accueil',
    navSearch: 'Recherche',
    navAiTutor: 'Tuteur IA',
    navTrail: 'Patrimoine & Cours',
    navDownloads: 'Téléchargements',
    navProfile: 'Mon Compte',
    navLogout: 'Déconnexion',

    platformName: 'PARAVERSO',
    platformSubtitle: 'Plateforme de Streaming & Réalité Virtuelle 360° du Pará',
    languageSelect: 'Choisir la langue',
    searchPlaceholder: 'Rechercher des œuvres, festivals, documentaires, patrimoine...',
    signIn: 'Connexion',
    signUp: 'Inscription',
    myList: 'Ma Liste',
    inMyList: 'Dans ma liste',
    watchNow: 'Regarder',
    viewDetails: 'Détails',
    back: 'Retour',
    share: 'Partager',
    download: 'Télécharger',
    downloaded: 'Téléchargé',
    deleteDownload: 'Supprimer',
    offlineReady: 'Disponible hors-ligne',

    heroNew: 'À l\'affiche',
    heroCulture: 'Culture & Tradition',
    heroNature: 'Amazonie & Biodiversité',
    heroVirtual: 'Immersion VR 360°',
    trendingSection: 'Tendances Paráverso',
    categoriesSection: 'Axes Culturels & Thématiques',
    allCoursesSection: 'Toutes les créations & expériences',
    aiTutorBadge: 'Intelligence Artificielle Officielle',
    aiTutorTitle: 'Assistant Paráverso (Gemini IA)',
    aiTutorDesc: 'Découvrez l\'histoire du Pará, la biodiversité amazonienne, le Círio de Nazaré et la richesse vivante des peuples.',
    aiTutorCta: 'Discuter avec l\'Assistant',

    catCulture: 'Culture & Arts',
    catHistory: 'Histoire & Mémoire',
    catHeritage: 'Patrimoine Vivant',
    catBiodiversity: 'Amazonie & Climat',
    catGastronomy: 'Gastronomie du Pará',
    catIndigenous: 'Savoirs Traditionnels',

    lessonsCount: 'Épisodes',
    modulesCount: 'Modules',
    durationLabel: 'Durée',
    instructorLabel: 'Production / Commissariat',
    certificateReady: 'Certificat SECULT disponible',
    startExperience: 'Lancer l\'Expérience',
    aboutTitle: 'À propos de l\'œuvre',
    materialsTitle: 'Fiches techniques & documents',

    authTitle: 'Accéder à Paráverso',
    authSubtitle: 'Portail du Secrétariat d\'État à la Culture du Pará',
    emailLabel: 'Adresse e-mail',
    passwordLabel: 'Mot de passe',
    fullNameLabel: 'Nom complet',
    phoneLabel: 'Téléphone',
    termsAgreement: 'J\'accepte les Conditions d\'Utilisation et la Politique de Confidentialité de SECULT-PA',
    alreadyHaveAccount: 'Déjà inscrit ? Se connecter',
    needAccount: 'Pas encore de compte ? S\'inscrire',
    forgotPassword: 'Mot de passe oublié ?',
    loginSuccess: 'Connexion réussie !',
    guestMode: 'Explorer en mode Invité',

    govTitle: 'Gouvernement de l\'État du Pará',
    secultTitle: 'Secrétariat d\'État à la Culture (SECULT)',
    rightsReserved: 'Tous droits réservés.',
    footerDesc: 'Plateforme officielle d\'immersion numérique en Réalité Virtuelle 360° et de valorisation du patrimoine amazonien du Pará.',
    terms: 'Conditions d\'Utilisation',
    privacy: 'Politique de Confidentialité',
    contact: 'Contactez-nous',
    help: 'Centre d\'Aide',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentOption: LanguageOption;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('paraverso_language');
    if (saved === 'en' || saved === 'fr' || saved === 'pt') {
      return saved;
    }
    // Default to Brazilian Portuguese as requested by user
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('paraverso_language', lang);
    // Update html lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  };

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.pt;
  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentOption,
        availableLanguages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

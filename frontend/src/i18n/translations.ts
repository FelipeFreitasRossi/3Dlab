// ============================================================
// Dicionário de textos do site (PT-BR e EN-US).
// A estrutura é igual nos dois idiomas — o TypeScript avisa se
// faltar alguma chave em um deles.
// Use {nome} para valores que mudam (ex.: "{days} dias úteis").
// ============================================================

export type Language = "pt-BR" | "en-US";

const ptBR = {
  nav: {
    home: "Início",
    catalog: "Catálogo",
    about: "Sobre",
    contact: "Contato",
    mainLabel: "Navegação principal",
    mobileLabel: "Menu de navegação",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    logoAlt: "Logo Pedra Lunar",
  },
  header: {
    whatsapp: "WhatsApp",
    settings: "Abrir configurações",
  },
  hero: {
    eyebrow: "Impressão 3D artesanal",
    title1: "Objetos únicos,",
    title2: "feitos camada por camada.",
    subtitle:
      "Peças de design impressas em 3D com precisão. Do protótipo ao objeto final, cada detalhe é pensado para durar.",
    ctaCatalog: "Explorar catálogo",
    ctaWhatsapp: "Falar no WhatsApp",
  },
  catalog: {
    eyebrow: "Catálogo",
    title: "Peças prontas e sob medida.",
    subtitle:
      "Cada peça pode ser personalizada — o contato direto pelo WhatsApp define cor, acabamento e prazo.",
    searchPlaceholder: "Buscar por nome ou descrição...",
    searchLabel: "Buscar produtos",
    filterLabel: "Filtrar por categoria",
    all: "Todos",
    empty: "Nenhum produto encontrado para essa combinação.",
    clear: "Limpar filtros",
    loading: "Carregando produtos",
  },
  categories: {
    decoracao: "Decoração",
    utilidades: "Utilidades",
    personalizados: "Personalizados",
    prototipos: "Protótipos",
  },
  product: {
    viewDetails: "Ver detalhes de {name}",
    leadTime: "{days} dias úteis",
    cta: "Falar sobre este produto",
    close: "Fechar detalhes do produto",
    thumbs: "Miniaturas do produto",
    imageAlt: "{name} — imagem {n} de {total}",
    viewImage: "Ver imagem {n}",
    whatsappMessage:
      'Olá! Tenho interesse no produto "{name}" ({category}). Poderia me passar mais informações?',
  },
  about: {
    eyebrow: "Sobre a oficina",
    title: "Precisão industrial, alma artesanal.",
    p1: "A Pedra Lunar nasceu da ideia de que objetos funcionais também podem ser peças de design. Cada projeto começa com uma conversa, passa por modelagem digital e ganha forma camada por camada.",
    p2Highlight: "Não produzimos em massa.",
    p2: "Produzimos o que faz sentido para quem encomenda. Do protótipo rápido à peça final, o controle de qualidade é manual e obsessivo.",
    p3: "O resultado são objetos que carregam intenção — e duram.",
    stats: {
      label: "Números da oficina",
      pieces: "peças entregues",
      years: "anos de experiência",
      satisfaction: "clientes satisfeitos",
    },
  },
  features: {
    eyebrow: "Por que Pedra Lunar",
    title: "O que muda quando é feito para você.",
    items: [
      {
        title: "Camada por camada",
        text: "Impressão FDM com controle de altura de camada para acabamento preciso.",
      },
      {
        title: "Sob medida",
        text: "Peças adaptadas às suas dimensões, encaixes e necessidades reais.",
      },
      {
        title: "Materiais selecionados",
        text: "Filamentos técnicos escolhidos para resistência e durabilidade.",
      },
      {
        title: "Acabamento manual",
        text: "Pós-processamento, lixamento e pintura feitos peça por peça.",
      },
    ],
  },
  process: {
    eyebrow: "Como funciona",
    title: "Da ideia ao objeto, sem atalhos.",
    steps: [
      {
        title: "Conversa",
        text: "Entendemos a ideia, o uso e as restrições. Nada é produzido sem clareza do objetivo.",
      },
      {
        title: "Modelagem",
        text: "Criamos ou ajustamos o modelo 3D, validando dimensões, encaixes e viabilidade.",
      },
      {
        title: "Produção",
        text: "Impressão, pós-processamento e conferência peça por peça antes da entrega.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Quem já encomendou",
    title: "O que dizem sobre a Pedra Lunar.",
    subtitle: "Feedback de projetos entregues.",
    ratingLabel: "{n} de 5 estrelas",
    verified: "Cliente verificado",
    items: [
      {
        quote:
          "Precisava de uma peça de reposição que não existe mais no mercado. Recebi algo melhor que o original.",
        author: "Cliente A",
        role: "Reposição técnica",
      },
      {
        quote:
          "O cuidado com o acabamento foi o que me surpreendeu. Não parece impressão 3D de longe.",
        author: "Cliente B",
        role: "Peça decorativa",
      },
      {
        quote:
          "Do primeiro contato à entrega, tudo foi claro. Sabia exatamente o que esperar em cada etapa.",
        author: "Cliente C",
        role: "Protótipo funcional",
      },
    ],
  },
  contact: {
    title: "Tem uma ideia? Vamos dar forma.",
    text: "Conte o que você precisa. Respondemos com prazo, possibilidades e próximos passos — sem compromisso.",
    cta: "Conversar no WhatsApp",
  },
  footer: {
    tagline:
      "Impressão 3D com precisão industrial e alma artesanal. Cada peça é feita para durar.",
    navigate: "Navegar",
    navLabel: "Links do rodapé",
    contact: "Contato",
    responseNote: "Resposta em até 1 dia útil.",
    rights: "Todos os direitos reservados.",
    openInstagram: "Abrir Instagram da Pedra Lunar",
    openWhatsapp: "Abrir conversa no WhatsApp",
    openTiktok: "Abrir TikTok da Pedra Lunar",
  },
  settings: {
    title: "Configurações",
    close: "Fechar configurações",
    language: "Idioma",
    languagePt: "Português (BR)",
    languageEn: "English (US)",
    theme: "Tema",
    themeDark: "Escuro",
    themeLight: "Claro",
    follow: "Siga a Pedra Lunar",
  },
  whatsapp: {
    tooltip: "Falar no WhatsApp",
    defaultMessage:
      "Olá! Vim pelo site da Pedra Lunar — 3D Lab e gostaria de saber mais sobre os produtos.",
  },
  loading: {
    label: "Carregando o site",
  },
};

const enUS: typeof ptBR = {
  nav: {
    home: "Home",
    catalog: "Catalog",
    about: "About",
    contact: "Contact",
    mainLabel: "Main navigation",
    mobileLabel: "Navigation menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    logoAlt: "Pedra Lunar logo",
  },
  header: {
    whatsapp: "WhatsApp",
    settings: "Open settings",
  },
  hero: {
    eyebrow: "Handcrafted 3D printing",
    title1: "One-of-a-kind objects,",
    title2: "built layer by layer.",
    subtitle:
      "Design pieces 3D printed with precision. From prototype to final object, every detail is made to last.",
    ctaCatalog: "Explore catalog",
    ctaWhatsapp: "Chat on WhatsApp",
  },
  catalog: {
    eyebrow: "Catalog",
    title: "Ready-made and made-to-measure pieces.",
    subtitle:
      "Every piece can be customized — a direct chat on WhatsApp sets color, finish and lead time.",
    searchPlaceholder: "Search by name or description...",
    searchLabel: "Search products",
    filterLabel: "Filter by category",
    all: "All",
    empty: "No products found for this combination.",
    clear: "Clear filters",
    loading: "Loading products",
  },
  categories: {
    decoracao: "Decor",
    utilidades: "Utilities",
    personalizados: "Custom",
    prototipos: "Prototypes",
  },
  product: {
    viewDetails: "View details of {name}",
    leadTime: "{days} business days",
    cta: "Ask about this product",
    close: "Close product details",
    thumbs: "Product thumbnails",
    imageAlt: "{name} — image {n} of {total}",
    viewImage: "View image {n}",
    whatsappMessage:
      'Hi! I am interested in the product "{name}" ({category}). Could you send me more information?',
  },
  about: {
    eyebrow: "About the workshop",
    title: "Industrial precision, handmade soul.",
    p1: "Pedra Lunar was born from the idea that functional objects can also be design pieces. Every project starts with a conversation, goes through digital modeling and takes shape layer by layer.",
    p2Highlight: "We don't mass-produce.",
    p2: "We make what makes sense for the person ordering. From quick prototype to final piece, quality control is manual and obsessive.",
    p3: "The result is objects that carry intention — and last.",
    stats: {
      label: "Workshop numbers",
      pieces: "pieces delivered",
      years: "years of experience",
      satisfaction: "happy customers",
    },
  },
  features: {
    eyebrow: "Why Pedra Lunar",
    title: "What changes when it's made for you.",
    items: [
      {
        title: "Layer by layer",
        text: "FDM printing with layer height control for a precise finish.",
      },
      {
        title: "Made to measure",
        text: "Pieces adapted to your dimensions, fittings and real needs.",
      },
      {
        title: "Selected materials",
        text: "Technical filaments chosen for strength and durability.",
      },
      {
        title: "Hand finishing",
        text: "Post-processing, sanding and painting done piece by piece.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "From idea to object, no shortcuts.",
    steps: [
      {
        title: "Conversation",
        text: "We understand the idea, the use and the constraints. Nothing is made without a clear goal.",
      },
      {
        title: "Modeling",
        text: "We create or adjust the 3D model, checking dimensions, fittings and feasibility.",
      },
      {
        title: "Production",
        text: "Printing, post-processing and piece-by-piece inspection before delivery.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Who already ordered",
    title: "What people say about Pedra Lunar.",
    subtitle: "Feedback from delivered projects.",
    ratingLabel: "{n} out of 5 stars",
    verified: "Verified customer",
    items: [
      {
        quote:
          "I needed a spare part that no longer exists on the market. I got something better than the original.",
        author: "Customer A",
        role: "Technical replacement",
      },
      {
        quote:
          "The care with the finish is what surprised me. It doesn't look 3D printed from a distance.",
        author: "Customer B",
        role: "Decorative piece",
      },
      {
        quote:
          "From first contact to delivery, everything was clear. I knew exactly what to expect at each step.",
        author: "Customer C",
        role: "Functional prototype",
      },
    ],
  },
  contact: {
    title: "Got an idea? Let's shape it.",
    text: "Tell us what you need. We reply with lead time, options and next steps — no commitment.",
    cta: "Chat on WhatsApp",
  },
  footer: {
    tagline:
      "3D printing with industrial precision and handmade soul. Every piece is made to last.",
    navigate: "Navigate",
    navLabel: "Footer links",
    contact: "Contact",
    responseNote: "Reply within 1 business day.",
    rights: "All rights reserved.",
    openInstagram: "Open Pedra Lunar on Instagram",
    openWhatsapp: "Open WhatsApp chat",
    openTiktok: "Open Pedra Lunar on TikTok",
  },
  settings: {
    title: "Settings",
    close: "Close settings",
    language: "Language",
    languagePt: "Português (BR)",
    languageEn: "English (US)",
    theme: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    follow: "Follow Pedra Lunar",
  },
  whatsapp: {
    tooltip: "Chat on WhatsApp",
    defaultMessage:
      "Hi! I found you through the Pedra Lunar — 3D Lab website and would like to know more about the products.",
  },
  loading: {
    label: "Loading the site",
  },
};

export const translations: Record<Language, typeof ptBR> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

export const DEFAULT_LANGUAGE: Language = "pt-BR";

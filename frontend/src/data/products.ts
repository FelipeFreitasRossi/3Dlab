import type { Product } from "../types/product";

// ============================================================
// ⚠️ DEMONSTRATIVO — Todos os produtos, preços, prazos e imagens
// abaixo são fictícios. Substituir pelos dados reais da loja.
//
// As imagens usam picsum.photos (fotos aleatórias estáveis por seed)
// APENAS para demonstrar a galeria. Quando o cliente enviar fotos reais:
//   1. Coloque os arquivos em `frontend/public/products/`
//   2. Troque as URLs por `"/products/nome-1.jpg"`, etc.
// ============================================================
export const PRODUCTS: Product[] = [
  {
    id: "vaso-orbita",
    name: "Vaso Órbita",
    category: "decoracao",
    shortDescription:
      "Vaso geométrico com superfície facetada. Impressão em camadas finas para acabamento fosco.",
    longDescription:
      "O Vaso Órbita nasce de uma malha facetada calculada para refletir a luz de forma irregular. A impressão em camadas de 0,12 mm dá ao conjunto um acabamento fosco que disfarça as linhas de impressão e valoriza as arestas. Ideal para plantas de pequeno porte, arranjos secos ou como peça escultural isolada.",
    features: [
      "Altura: 22 cm · Diâmetro: 12 cm",
      "Impressão em PLA com acabamento fosco",
      "Base com feltro protetor",
      "Disponível em preto, grafite e branco suave",
    ],
    price: 89.9,
    accent: "rgba(180, 190, 220, 0.22)",
    leadTimeDays: 5,
    badge: "Novo",
    image: "https://picsum.photos/seed/vaso-orbita-1/800/600",
    images: [
      "https://picsum.photos/seed/vaso-orbita-1/800/600",
      "https://picsum.photos/seed/vaso-orbita-2/800/600",
      "https://picsum.photos/seed/vaso-orbita-3/800/600",
      "https://picsum.photos/seed/vaso-orbita-4/800/600",
    ],
  },
  {
    id: "luminaria-cratera",
    name: "Luminária Cratera",
    category: "decoracao",
    shortDescription:
      "Luz indireta com difusor translúcido. Combina com mesas de cabeceira e prateleiras.",
    longDescription:
      "Difusor translúcido impresso em PETG, com estrutura interna que espalha a luz de forma homogênea. Acompanha soquete E27 e cabo têxtil de 1,5 m. Ideal para luz de apoio em mesas de cabeceira, estantes e cantos de leitura.",
    features: [
      "Altura: 18 cm · Diâmetro: 14 cm",
      "Difusor em PETG translúcido",
      "Soquete E27 (lâmpada não inclusa)",
      "Cabo têxtil de 1,5 m com interruptor",
    ],
    price: 149.9,
    accent: "rgba(220, 225, 240, 0.20)",
    leadTimeDays: 7,
    image: "https://picsum.photos/seed/luminaria-cratera-1/800/600",
    images: [
      "https://picsum.photos/seed/luminaria-cratera-1/800/600",
      "https://picsum.photos/seed/luminaria-cratera-2/800/600",
      "https://picsum.photos/seed/luminaria-cratera-3/800/600",
      "https://picsum.photos/seed/luminaria-cratera-4/800/600",
    ],
  },
  {
    id: "organizador-mesa",
    name: "Organizador de Mesa",
    category: "utilidades",
    shortDescription:
      "Compartimentos moduláveis para canetas, clipes e cartões. Base antiderrapante.",
    longDescription:
      "Três módulos independentes que se encaixam magneticamente, permitindo reorganizar o layout conforme sua mesa muda. A base recebe adesivo antiderrapante em toda a extensão para não deslizar com o uso.",
    features: [
      "Dimensões totais: 18 × 10 × 8 cm",
      "3 módulos com encaixe magnético",
      "Base antiderrapante em toda a extensão",
      "Impressão em PLA fosco (preto ou branco)",
    ],
    price: 59.9,
    accent: "rgba(160, 170, 200, 0.20)",
    leadTimeDays: 4,
    badge: "Mais vendido",
    image: "https://picsum.photos/seed/organizador-mesa-1/800/600",
    images: [
      "https://picsum.photos/seed/organizador-mesa-1/800/600",
      "https://picsum.photos/seed/organizador-mesa-2/800/600",
      "https://picsum.photos/seed/organizador-mesa-3/800/600",
      "https://picsum.photos/seed/organizador-mesa-4/800/600",
    ],
  },
  {
    id: "suporte-headset",
    name: "Suporte de Headset",
    category: "utilidades",
    shortDescription:
      "Base estável com encaixe universal. Mantém o headset fora da mesa e protegido.",
    longDescription:
      "Estrutura em arco com contrapeso interno, estável o suficiente para headsets grandes sem tombar. O topo é revestido com espuma adesiva para proteger a almofada do arco e evitar marcas.",
    features: [
      "Altura: 26 cm · Base: 12 × 12 cm",
      "Contrapeso interno para estabilidade",
      "Topo com espuma protetora",
      "Compatível com headsets grandes",
    ],
    price: 79.9,
    accent: "rgba(200, 210, 240, 0.18)",
    leadTimeDays: 5,
    image: "https://picsum.photos/seed/suporte-headset-1/800/600",
    images: [
      "https://picsum.photos/seed/suporte-headset-1/800/600",
      "https://picsum.photos/seed/suporte-headset-2/800/600",
      "https://picsum.photos/seed/suporte-headset-3/800/600",
      "https://picsum.photos/seed/suporte-headset-4/800/600",
    ],
  },
  {
    id: "chaveiro-personalizado",
    name: "Chaveiro Personalizado",
    category: "personalizados",
    shortDescription:
      "Nome, iniciais ou logo. Escolha formato, cor e acabamento — sob encomenda.",
    longDescription:
      "Você envia o nome, iniciais ou logo em arquivo, e nós adaptamos para o formato do chaveiro (circular, retangular ou hexagonal). Produção em PLA de alta resistência, com argola metálica inclusa. Ideal para brindes, presentes e identificação de chaves.",
    features: [
      "Formatos: circular, retangular ou hexagonal",
      "Até 12 caracteres ou 1 logo simples",
      "Argola metálica inclusa",
      "Escolha de cor base e cor de destaque",
    ],
    price: 29.9,
    accent: "rgba(180, 190, 220, 0.24)",
    leadTimeDays: 3,
    image: "https://picsum.photos/seed/chaveiro-personalizado-1/800/600",
    images: [
      "https://picsum.photos/seed/chaveiro-personalizado-1/800/600",
      "https://picsum.photos/seed/chaveiro-personalizado-2/800/600",
      "https://picsum.photos/seed/chaveiro-personalizado-3/800/600",
      "https://picsum.photos/seed/chaveiro-personalizado-4/800/600",
    ],
  },
  {
    id: "porta-caneta-geo",
    name: "Porta-caneta Geométrico",
    category: "utilidades",
    shortDescription:
      "Design angular com base firme. Disponível em preto, branco e grafite.",
    longDescription:
      "Corpo angular com peso na base para não tombar ao retirar canetas. A geometria facetada reflete a luz de forma irregular, criando sombras que destacam o formato. Comporta até 20 canetas ou pincéis médios.",
    features: [
      "Altura: 11 cm · Diâmetro: 9 cm",
      "Comporta até 20 canetas",
      "Base lastreada — não tomba",
      "Três cores disponíveis",
    ],
    price: 39.9,
    accent: "rgba(170, 180, 210, 0.20)",
    leadTimeDays: 4,
    image: "https://picsum.photos/seed/porta-caneta-geo-1/800/600",
    images: [
      "https://picsum.photos/seed/porta-caneta-geo-1/800/600",
      "https://picsum.photos/seed/porta-caneta-geo-2/800/600",
      "https://picsum.photos/seed/porta-caneta-geo-3/800/600",
      "https://picsum.photos/seed/porta-caneta-geo-4/800/600",
    ],
  },
  {
    id: "escultura-fase-lunar",
    name: "Escultura Fase Lunar",
    category: "decoracao",
    shortDescription:
      "Peça de mesa com textura inspirada em crateras lunares. Edição limitada.",
    longDescription:
      "A textura da superfície reproduz um mapa topográfico real da Lua, adaptado para impressão FDM. Cada unidade é lixada e selada à mão, resultando em pequenas variações entre peças — o que torna cada escultura única dentro da edição limitada.",
    features: [
      "Altura: 15 cm · Largura: 15 cm",
      "Textura topográfica lunar",
      "Acabamento lixado e selado à mão",
      "Edição limitada numerada",
    ],
    price: 199.9,
    accent: "rgba(220, 225, 240, 0.26)",
    leadTimeDays: 10,
    image: "https://picsum.photos/seed/escultura-fase-lunar-1/800/600",
    images: [
      "https://picsum.photos/seed/escultura-fase-lunar-1/800/600",
      "https://picsum.photos/seed/escultura-fase-lunar-2/800/600",
      "https://picsum.photos/seed/escultura-fase-lunar-3/800/600",
      "https://picsum.photos/seed/escultura-fase-lunar-4/800/600",
    ],
  },
  {
    id: "prototipo-sob-medida",
    name: "Protótipo Sob Medida",
    category: "prototipos",
    shortDescription:
      "Do arquivo 3D à peça física. Ideal para validar encaixes, formas e funcionamento.",
    longDescription:
      "Envie seu modelo em STL, STEP, OBJ ou 3MF. Avaliamos a viabilidade de impressão, sugerimos ajustes de espessura e orientação, e produzimos o protótipo com tolerância combinada. Ideal para validar encaixes, ergonomia e funcionamento antes de investir em produção final.",
    features: [
      "Aceita STL, STEP, OBJ e 3MF",
      "Revisão técnica inclusa antes da impressão",
      "Tolerância dimensional combinada caso a caso",
      "Uma rodada de ajuste após entrega do protótipo",
    ],
    price: 249.9,
    accent: "rgba(140, 150, 180, 0.22)",
    leadTimeDays: 12,
    badge: "Sob consulta",
    image: "https://picsum.photos/seed/prototipo-sob-medida-1/800/600",
    images: [
      "https://picsum.photos/seed/prototipo-sob-medida-1/800/600",
      "https://picsum.photos/seed/prototipo-sob-medida-2/800/600",
      "https://picsum.photos/seed/prototipo-sob-medida-3/800/600",
      "https://picsum.photos/seed/prototipo-sob-medida-4/800/600",
    ],
  },
];
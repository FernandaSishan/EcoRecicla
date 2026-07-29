/**
 * ============================================================
 * EcoVision IA – Coleta Seletiva Inteligente
 * js/data.js
 * 
 * Base de dados de resíduos: mapeia classes detectadas pelo
 * modelo COCO-SSD para informações de coleta seletiva.
 * ============================================================
 */

const dadosResiduos = {
    // ---------- PLÁSTICO ----------
    "bottle": {
        nome: "Garrafa PET",
        material: "Plástico",
        categoria: "plastico",
        corLixeira: "#e53935",
        nomeLixeira: "Plástico",
        reciclavel: true,
        tempoDecomposicao: "450 anos",
        curiosidade: "Uma garrafa PET pode levar aproximadamente 450 anos para se decompor na natureza. Recicle sempre!"
    },
    "cup": {
        nome: "Copo Descartável",
        material: "Plástico",
        categoria: "plastico",
        corLixeira: "#e53935",
        nomeLixeira: "Plástico",
        reciclavel: true,
        tempoDecomposicao: "450 anos",
        curiosidade: "Copos descartáveis de plástico são um dos maiores poluentes dos oceanos. Prefira copos reutilizáveis!"
    },

    // ---------- METAL ----------
    "can": {
        nome: "Lata de Alumínio",
        material: "Metal",
        categoria: "metal",
        corLixeira: "#fdd835",
        nomeLixeira: "Metal",
        reciclavel: true,
        tempoDecomposicao: "200 a 500 anos",
        curiosidade: "A reciclagem de uma lata de alumínio economiza energia suficiente para manter uma TV ligada por 3 horas!"
    },

    // ---------- VIDRO ----------
    "wine glass": {
        nome: "Garrafa de Vidro",
        material: "Vidro",
        categoria: "vidro",
        corLixeira: "#43a047",
        nomeLixeira: "Vidro",
        reciclavel: true,
        tempoDecomposicao: "4.000 anos",
        curiosidade: "O vidro é 100% reciclável e pode ser reprocessado infinitamente sem perda de qualidade."
    },

    // ---------- PAPEL ----------
    "book": {
        nome: "Jornal / Livro",
        material: "Papel",
        categoria: "papel",
        corLixeira: "#1e88e5",
        nomeLixeira: "Papel",
        reciclavel: true,
        tempoDecomposicao: "3 a 6 meses",
        curiosidade: "Reciclar 1 tonelada de papel salva 17 árvores adultas e economiza 7.000 galões de água."
    },
    "cell phone": {
        nome: "Papel / Cartão",
        material: "Papel",
        categoria: "papel",
        corLixeira: "#1e88e5",
        nomeLixeira: "Papel",
        reciclavel: true,
        tempoDecomposicao: "3 a 6 meses",
        curiosidade: "O papel é um dos materiais mais fáceis de reciclar e representa 25% do lixo urbano."
    },

    // ---------- ORGÂNICO ----------
    "banana": {
        nome: "Casca de Banana",
        material: "Orgânico",
        categoria: "organico",
        corLixeira: "#6d4c41",
        nomeLixeira: "Orgânico",
        reciclavel: false,
        tempoDecomposicao: "2 a 10 semanas",
        curiosidade: "Resíduos orgânicos podem ser transformados em adubo através da compostagem, enriquecendo o solo."
    },
    "apple": {
        nome: "Maçã / Fruta",
        material: "Orgânico",
        categoria: "organico",
        corLixeira: "#6d4c41",
        nomeLixeira: "Orgânico",
        reciclavel: false,
        tempoDecomposicao: "2 a 4 semanas",
        curiosidade: "Restos de comida em aterros produzem metano, um gás 25x mais potente que o CO2 para o efeito estufa."
    },

    // ---------- FALLBACK / REJEITOS ----------
    "default": {
        nome: "Objeto Detectado",
        material: "Não classificado",
        categoria: "rejeitos",
        corLixeira: "#757575",
        nomeLixeira: "Rejeitos",
        reciclavel: false,
        tempoDecomposicao: "Indeterminado",
        curiosidade: "Quando não tiver certeza do material, descarte na lixeira de rejeitos para não contaminar outros materiais recicláveis."
    }
};

/**
 * Mapeamento das classes do COCO-SSD para nossas categorias internas.
 * O modelo COCO-SSD detecta classes genéricas (bottle, cup, book...)
 * e nós as associamos aos resíduos do nosso sistema.
 */
const mapeamentoCoco = {
    "bottle": "bottle",
    "wine glass": "wine glass",
    "cup": "cup",
    "book": "book",
    "cell phone": "cell phone",
    "banana": "banana",
    "apple": "apple",
    "orange": "apple",
    "sandwich": "apple",
    "hot dog": "apple",
    "pizza": "apple",
    "cake": "apple",
    "donut": "apple"
};

/**
 * Cores das lixeiras para referência visual rápida.
 */
const coresLixeiras = {
    papel:    { cor: "#1e88e5", nome: "🔵 Papel",    emoji: "🔵" },
    plastico: { cor: "#e53935", nome: "🔴 Plástico", emoji: "🔴" },
    vidro:    { cor: "#43a047", nome: "🟢 Vidro",    emoji: "🟢" },
    metal:    { cor: "#fdd835", nome: "🟡 Metal",    emoji: "🟡" },
    organico: { cor: "#6d4c41", nome: "🟤 Orgânico", emoji: "🟤" },
    rejeitos: { cor: "#757575", nome: "⚪ Rejeitos", emoji: "⚪" }
};

// ============================================================
// ⚠️ DEMONSTRATIVO — Substituir pelos dados reais da loja.
// O número abaixo é fictício. Troque por:
//   55 + DDD + número (sem espaços, traços ou parênteses)
// Exemplo real: "5511987654321"
// ============================================================
const WHATSAPP_NUMBER = "5511999999999";

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Pedra Lunar — 3D Lab e gostaria de saber mais sobre os produtos.";

/**
 * Monta a URL do WhatsApp com mensagem opcional pré-preenchida.
 * Use sempre que quiser contextualizar o contato (ex.: nome do produto).
 */
export function buildWhatsAppUrl(message?: string) {
  const text = message ?? DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl();

// ============================================================
// ⚠️ DEMONSTRATIVO — Substituir pelo perfil real do Instagram.
// ============================================================
export const INSTAGRAM_HANDLE = "@pedralunar.3d";
export const INSTAGRAM_URL = "https://instagram.com/pedralunar.3d";

export const SITE_NAME = "Pedra Lunar";
export const SITE_TAGLINE = "3D Lab";

// ============================================================
// ⚠️ DEMONSTRATIVO — Substituir pelo perfil real do TikTok.
// ============================================================
export const TIKTOK_HANDLE = "@pedralunar.3d";
export const TIKTOK_URL = "https://www.tiktok.com/@pedralunar.3d";

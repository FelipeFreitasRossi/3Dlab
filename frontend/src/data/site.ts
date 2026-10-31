const WHATSAPP_NUMBER = "5511999999999";

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Pedra Lunar — 3D Lab e gostaria de saber mais sobre os produtos.";

export function buildWhatsAppUrl(message?: string) {
  const text = message ?? DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl();

export const INSTAGRAM_HANDLE = "@pedralunar.3d";
export const INSTAGRAM_URL = "https://instagram.com/pedralunar.3d";

export const SITE_NAME = "Pedra Lunar";
export const SITE_TAGLINE = "3D Lab";

export const TIKTOK_HANDLE = "@pedralunar.3d";
export const TIKTOK_URL = "https://www.tiktok.com/@pedralunar.3d";

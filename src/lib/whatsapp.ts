export const WHATSAPP_NUMBER = "447935896817";
const DEFAULT_MESSAGE = "Hi! I have a question about LumierModest.";

export function whatsAppLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

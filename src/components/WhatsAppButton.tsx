const WHATSAPP_NUMBER = "447935896817";
const DEFAULT_MESSAGE = "Hi! I have a question about LumierModest.";

export function whatsAppLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.6.9-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.8-2-1.3-.5-.5-1-1.1-1.4-1.8-.1-.2 0-.4.1-.5.2-.2.4-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.6.3-.4.4-.6 1-.6 1.6 0 .9.4 1.8 1 2.6 1.1 1.6 2.4 2.8 4 3.6.5.2 1 .4 1.5.5.6.2 1.1.2 1.6.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.7 3.1 1.1 4.8 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.3-1.3-2.9-1.3-4.5 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.6 8.4-8.2 8.4Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <a
      href={whatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110"
    >
      <WhatsAppIcon />
    </a>
  );
}

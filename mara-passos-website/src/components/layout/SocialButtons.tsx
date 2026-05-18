"use client"; // Não esqueça de adicionar esta linha no topo, pois o framer-motion precisa rodar no client-side

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialButtons() {
    const numeroWhatsApp = "5511972405722";
    const mensagemPadrao = "Olá! Gostaria de saber mais informações sobre as aulas e agendar uma visita.";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemPadrao)}`;
    const linkInstagram = "https://instagram.com/estudiomarapassos";

    return (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-4 items-center">

            {/* Botão do Instagram (Aparece por último) */}
            <motion.a
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                href={linkInstagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Siga nosso Instagram"
                aria-label="Siga nosso Instagram"
                className="w-14 h-14 bg-orange-500 text-zinc-950 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors hover:scale-105 active:scale-95"
            >
                <Instagram size={24} strokeWidth={2.5} />
            </motion.a>

            {/* Botão do WhatsApp (Aparece logo após o chatbot) */}
            <motion.a
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                href={linkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                title="Fale conosco no WhatsApp"
                aria-label="Fale conosco no WhatsApp"
                className="w-14 h-14 bg-orange-500 text-zinc-950 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors hover:scale-105 active:scale-95"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.061 3.961L0 16l4.234-1.112a7.85 7.85 0 0 0 3.756.953h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
            </motion.a>

        </div>
    );
}
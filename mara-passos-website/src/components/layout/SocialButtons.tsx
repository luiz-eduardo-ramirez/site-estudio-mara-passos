"use client";

import { useState } from "react";
import { Instagram, MessageCircle, X, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialButtons() {
    const [isOpen, setIsOpen] = useState(false);

    const numeroWhatsApp = "5511972405722";
    const mensagemPadrao = "Olá! Gostaria de saber mais informações sobre as aulas e agendar uma visita.";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemPadrao)}`;
    const linkInstagram = "https://instagram.com/estudiomarapassos";

    const handleWhatsAppClick = () => {
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'lead_whatsapp', { origem: 'botao_flutuante' });
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[999] flex flex-col-reverse items-center gap-3">
            
            {/* Gatilho FAB Principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 md:w-14 md:h-14 bg-mara-orange text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors hover:scale-105 active:scale-95 z-50"
                aria-label="Opções de Contato"
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? <X size={24} strokeWidth={2.5} /> : <MessageCircle size={24} strokeWidth={2.5} />}
                </motion.div>
            </button>

            {/* Botões Secundários Empilhados */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2, staggerChildren: 0.1 }}
                        className="flex flex-col-reverse items-center gap-3 mb-2"
                    >
                        {/* Botão do WhatsApp (Secundário Menor) */}
                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            href={linkWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleWhatsAppClick}
                            title="Fale conosco no WhatsApp"
                            aria-label="Fale conosco no WhatsApp"
                            className="w-10 h-10 md:w-12 md:h-12 bg-green-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-green-600 transition-colors hover:scale-105 active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.061 3.961L0 16l4.234-1.112a7.85 7.85 0 0 0 3.756.953h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                        </motion.a>

                        {/* Botão do Instagram (Secundário Menor) */}
                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            href={linkInstagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Siga nosso Instagram"
                            aria-label="Siga nosso Instagram"
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white rounded-full shadow-md flex items-center justify-center hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                        >
                            <Instagram size={20} strokeWidth={2.5} />
                        </motion.a>
                        {/* Botão do Chatbot (Secundário Menor) */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onClick={() => {
                                window.dispatchEvent(new Event("openChatbot"));
                                setIsOpen(false);
                            }}
                            title="Falar com Assistente Virtual"
                            aria-label="Falar com Assistente Virtual"
                            className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 transition-colors hover:scale-105 active:scale-95"
                        >
                            <img src="/chat.svg" alt="Chat" className="w-5 h-5 brightness-0 invert" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
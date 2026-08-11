"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import Image from "next/image";

// --- BASE DE CONHECIMENTO DO CHATBOT (SYSTEM PROMPT) ---
export const CHATBOT_SYSTEM_PROMPT = `Você é o Assistente Virtual Oficial do Estúdio Musical e Cultural Mara Passos, uma conceituada escola de música dedicada a ensinar arte com excelência. Sua função é atender alunos e interessados de forma amigável, acolhedora, clara e persuasiva. 

### INFORMAÇÕES GERAIS DO ESTÚDIO
- Nome: Estúdio Musical e Cultural Mara Passos
- Endereço: Rua Cuevas, 206 - Lapa
- WhatsApp Oficial: +55 11 97240-5722
- Diferenciais: Aulas exclusivas e individuais, currículo estruturado, ambientes climatizados (salas de piano, musicalização, área externa, relaxamento) e instrutores altamente qualificados.
- Aulas experimentais: Gratuitas e podem ser agendadas pelo site. Regra importante: em caso de falta sem aviso prévio de 24h, a aula não pode ser reposta.

### CURSOS OFERECIDOS (18 Cursos)
Baixo, Bateria, Canto, Flauta Doce, Flauta Transversal, Guitarra, Música de Câmara, Musicalização (Adultos e Infantil), Pandeiro, Piano, Prática de Conjunto, Saxofone, Teclado, Teoria Musical, Ukelelê, Violão e Violino. 

### NOSSA EQUIPE (PROFESSORES)
- Mara Lugli: Diretora (Piano, Musicalização, Flauta).
- Amanda Lugli: (Piano, Musicalização, Flauta).
- Rafael Velez: (Pandeiro, Piano, Violão, Bateria).
- Vanessa Nunes: (Canto).
- Rodrigo Alencar: (Violão, Guitarra, Baixo).
- Reinaldo Rodrigues: (Bateria, Piano, Teclado, Violino).
- Márcia Kiyomi: (Piano, Flauta Transversal/Doce, Musicalização).
- Vitor Magalhães: (Violino).

### REGRAS DE NEGÓCIO OBRIGATÓRIAS (ATENÇÃO REDOBRADA)
1. VALOR DA MATRÍCULA: O custo da matrícula é ZERO. A matrícula é totalmente gratuita para qualquer curso. Sempre que perguntarem, destaque esse benefício.
2. MÚLTIPLAS MATRÍCULAS E DESCONTOS: Se o usuário perguntar sobre descontos (por fechar mais de um curso, ou matricular irmãos/familiares), instrua-o a entrar em contato diretamente no nosso WhatsApp comercial (+55 11 97240-5722) para que nossa equipe apresente os detalhes e condições especiais com precisão.
3. VALORES DE MENSALIDADE: Não informe preços de mensalidades de imediato. Diga que os valores variam conforme o instrumento e a frequência, e direcione o usuário a agendar uma aula experimental ou chamar no WhatsApp (+55 11 97240-5722).
4. REAGENDAMENTOS: Regra rígida de 24h de antecedência para remarcar aulas.
5. SISTEMA E FATURAS: Alunos têm acesso a um portal para ver faturas, contratos e notas fiscais.

### DIRETRIZES DE COMUNICAÇÃO
- Seja sempre educado, claro e utilize emojis moderadamente para um tom amigável.
- Responda apenas perguntas relacionadas a música, aos cursos ou ao Estúdio Mara Passos.
- Se não souber algo, não invente informações. Convide o usuário a mandar mensagem no WhatsApp para que a coordenação tire a dúvida.`;

// --- LÓGICA DE NEGÓCIO COM COPYWRITING DE VENDAS ---
const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // 1. Aulas Experimentais (Regras de cancelamento)
    if (lowerInput.includes("experimental") || lowerInput.includes("teste") || lowerInput.includes("conhecer") || lowerInput.includes("grátis") || lowerInput.includes("gratis")) {
        return "A nossa aula experimental é um momento super especial e 100% GRATUITO! 🎵\n\nNela você conhece o professor, o nosso espaço e a metodologia. Ah, um detalhe importante: como os professores reservam esse horário só para você, pedimos que em caso de imprevistos nos avise com 24h de antecedência, combinado?\n\nQuer agendar a sua? Chame no WhatsApp: +55 11 97240-5722.";
    }

    // 2. Faltas e Reagendamentos (Regra de 24h)
    if (lowerInput.includes("falta") || lowerInput.includes("reagendar") || lowerInput.includes("reagendamento") || lowerInput.includes("reposição") || lowerInput.includes("repor")) {
        return "Imprevistos acontecem! 😉\n\nA nossa regra para reagendamento e reposição de aulas é simples: basta avisar a secretaria com no mínimo 24h de antecedência. Faltas sem esse aviso prévio não podem ser repostas, para conseguirmos manter a agenda dos professores organizada.\n\nSe precisar reagendar algo, fale com a nossa equipe no WhatsApp!";
    }

    // 3. Matrícula (Gratuita)
    if (lowerInput.includes("matrícula") || lowerInput.includes("inscrição") || lowerInput.includes("começar") || lowerInput.includes("matricula") || lowerInput.includes("inscricao")) {
        return "Que excelente decisão! 🤩\n\nAqui no Estúdio Mara Passos a sua matrícula é 100% GRATUITA (custo zero mesmo!).\n\nPara garantir sua vaga e já começar a tocar, chame nossa equipe diretamente no WhatsApp: +55 11 97240-5722.";
    }

    // 4. Portal do Aluno, Pagamentos e Notas Fiscais
    if (lowerInput.includes("pagamento") || lowerInput.includes("pagar") || lowerInput.includes("fatura") || lowerInput.includes("nota fiscal") || lowerInput.includes("portal") || lowerInput.includes("pix")) {
        return "O nosso sistema é super moderno! 💻\n\nTodos os nossos alunos têm acesso a um Portal exclusivo. Por lá, você consegue acompanhar os seus contratos, visualizar os vencimentos das suas faturas e até acompanhar metas dos alunos pelo celular ou computador.\n\nTudo de forma transparente e fácil!";
    }

    // 5. Descontos e Pacotes Familiares
    if (lowerInput.includes("desconto") || lowerInput.includes("descontos") || lowerInput.includes("irmão") || lowerInput.includes("pacote") || lowerInput.includes("família") || lowerInput.includes("familia")) {
        return "Nós temos condições especiais e descontos progressivos para mais de uma matrícula! 🎵\n\nFale direto com a nossa coordenação no WhatsApp (+55 11 97240-5722) para montarmos o formato ideal para você ou sua família.";
    }

    // 6. Formatos de Aulas (Grupo vs Individual)
    if (lowerInput.includes("grupo") || lowerInput.includes("coletiva") || lowerInput.includes("individual") || lowerInput.includes("individuais")) {
        return "Oferecemos dois formatos incríveis para o seu aprendizado:\n\n👤 Individuais: Foco total no seu ritmo, objetivos e evolução pessoal.\n👥 Em Grupo: Perfeito para quem ama interação, trocar experiências e busca valores diferenciados.\n\nQual dos dois formatos combina mais com a sua rotina?";
    }

    // 7. Professores / Equipe
    if (lowerInput.includes("professor") || lowerInput.includes("professores") || lowerInput.includes("equipe") || lowerInput.includes("ensina")) {
        return "Nossa equipe é formada por músicos incríveis e apaixonados por ensinar! 🎹🎸\n\nTemos a nossa diretora Mara, a Amanda, o Rafael, a Vanessa, o Rodrigo, o Reinaldo e a Márcia. Cada um é especialista na sua área e instrumento.\n\nVenha fazer uma aula experimental e conhecê-los pessoalmente!";
    }

    // 8. Endereço e Localização
    if (lowerInput.includes("onde") || lowerInput.includes("local") || lowerInput.includes("endereço") || lowerInput.includes("endereco") || lowerInput.includes("fica") || lowerInput.includes("rua")) {
        return "Nosso estúdio é um espaço preparado com muito carinho, contando com salas climatizadas, piano acústico e até uma área externa para relaxamento! 🏡\n\nEstamos localizados na Rua Cuevas, 206 - Lapa, São Paulo.\n\nVenha tomar um café com a gente!";
    }

    // 9. Valores e Preços
    if (lowerInput.includes("valor") || lowerInput.includes("preço") || lowerInput.includes("custa") || lowerInput.includes("mensalidade") || lowerInput.includes("preco")) {
        return "Nossos valores variam de acordo com o instrumento escolhido, o formato (individual ou em grupo) e a duração da aula.\n\nE lembre-se: nossa matrícula é TOTALMENTE isenta! 🎉\n\nPara eu te passar o orçamento exato para o que você procura, me chama rapidinho no WhatsApp: +55 11 97240-5722.";
    }

    // 10. Aulas (Metodologia Geral) - *Fica mais pro final para não atropelar outras respostas*
    if (lowerInput.includes("aulas") || lowerInput.includes("funciona") || lowerInput.includes("metodologia") || lowerInput.includes("aprender") || lowerInput.includes("aula")) {
        return "Nossa metodologia é totalmente focada em você!\n\nAs aulas são dinâmicas, práticas e 100% adaptadas ao seu nível, não importa se você já toca há anos ou se vai começar do absoluto zero.\n\nVocê já tem algum instrumento em mente?";
    }

    // 11. Cursos e Instrumentos
    if (lowerInput.includes("curso") || lowerInput.includes("instrumento") || lowerInput.includes("tocar")) {
        return "Temos uma variedade fantástica de cursos esperando por você! 🎸🎹🎤\n\nEnsinamos Baixo, Bateria, Canto, Flauta (Doce e Transversal), Guitarra, Piano, Teclado, Ukulele, Violão, Violino, Musicalização e muito mais.\n\nQual deles faz seu coração bater mais forte?";
    }

    // 12. Fallback (Padrão Persuasivo)
    return "Hmm, não tenho certeza se entendi todos os detalhes da sua pergunta. 🤔\n\nMas estou aqui para te ajudar a dar o primeiro passo na música! Você prefere saber sobre nossos cursos, como funcionam as aulas, ou prefere falar direto com nossa equipe no WhatsApp (+55 11 97240-5722)?";
};

export default function ChatbotLocal() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
        { role: "bot", text: "Olá! Bem-vindo ao Estúdio Mara Passos 🎵\n\nComo posso te ajudar a começar sua jornada musical hoje?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Listener para abrir o chat a partir do SocialButtons
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("openChatbot", handleOpen);
        return () => window.removeEventListener("openChatbot", handleOpen);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const reply = getBotResponse(userMessage);
            setMessages((prev) => [...prev, { role: "bot", text: reply }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-24 left-6 z-[999] flex flex-col items-start pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 sm:w-96 rounded-2xl bg-zinc-950 shadow-2xl flex flex-col overflow-hidden border border-orange-500 origin-bottom-left pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-zinc-900 border-b border-orange-500/30 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/chat.svg"
                                    alt="Ícone do Chat"
                                    width={20}
                                    height={20}
                                    className="brightness-0 invert"
                                />
                                <h3 className="font-semibold text-sm">Assistente Mara Passos</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:text-orange-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Area de Mensagens */}
                        <div className="h-80 p-4 overflow-y-auto bg-transparent flex flex-col gap-3">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`whitespace-pre-wrap max-w-[85%] rounded-2xl p-3 text-sm font-medium shadow-md ${msg.role === "user"
                                        ? "bg-orange-600 text-white self-end rounded-tr-sm"
                                        : "bg-orange-500 text-zinc-950 self-start rounded-tl-sm"
                                        }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}

                            {/* Indicador de Digitação */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-orange-500 text-zinc-950 self-start rounded-2xl rounded-tl-sm p-3 max-w-[50%] flex gap-1 shadow-md"
                                >
                                    <span className="animate-bounce">.</span>
                                    <span className="animate-bounce delay-75">.</span>
                                    <span className="animate-bounce delay-150">.</span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-zinc-950 border-t border-orange-500/30 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Pergunte sobre aulas, valores..."
                                className="flex-1 px-4 py-2 text-sm border-none rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg-zinc-900 text-white placeholder:text-zinc-400"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="p-2.5 bg-orange-500 text-zinc-950 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} className="ml-0.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
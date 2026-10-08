import { teachersList } from "../../data/teachersList";

/*
 * Conteúdo da página /aulas-de-piano.
 *
 * Fica separado da marcação por um motivo prático: o FAQ, a lista de
 * professores e o endereço alimentam tanto o que o visitante lê quanto o JSON-LD
 * que o Google lê. Com uma fonte só, o texto da página e o dado estruturado não
 * têm como divergir — e divergência entre os dois é motivo de rich result
 * ser ignorado.
 */

export const SITE_URL = "https://estudiomusicalmarapassos.com.br";
export const PAGE_PATH = "/aulas-de-piano";
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const NUMERO_WHATSAPP = "5511972405722";
export const TELEFONE_EXIBIDO = "(11) 97240-5722";
export const ENDERECO = "Rua Cuevas, 206 — Lapa, São Paulo/SP";
export const LINK_MAPA =
  "https://www.google.com/maps/search/?api=1&query=Rua+Cuevas+206+Lapa+S%C3%A3o+Paulo";
export const LINK_WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
  "Olá! Gostaria de agendar uma aula experimental de piano.",
)}`;

export const YOUTUBE_ID = "pv1RpR_RdbI";

export const diferenciais = [
  {
    titulo: "Instrutores qualificados",
    texto:
      "Professores graduados e com vasta experiência no ensino de piano popular e erudito.",
  },
  {
    titulo: "Currículo estruturado",
    texto:
      "Organização clara para você perceber sua evolução a cada aula, sem pular etapas essenciais.",
  },
  {
    titulo: "Aulas individuais",
    texto:
      "Foco total na sua técnica, postura e repertório preferido. O professor se adapta ao seu ritmo.",
  },
] as const;

export const passos = [
  {
    titulo: "Peça seu horário",
    texto:
      "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
  },
  {
    titulo: "Faça a aula experimental",
    texto:
      "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e toca no piano pela primeira vez.",
  },
  {
    titulo: "Comece a evoluir",
    texto:
      "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
  },
] as const;

/*
 * Só quem dá aula de piano aqui: Mara e Amanda. Nome, foto e biografia vêm da
 * fonte única da equipe (src/data/teachersList.ts), a mesma da home.
 */
const professorasDePiano = [1, 2];

export const professores = teachersList
  .filter((t) => professorasDePiano.includes(t.id))
  .map((t) => ({
    nome: t.nome,
    papel: t.id === 1 ? "Diretora e fundadora" : "Professora e sócia",
    bio: t.bio,
    foto: t.foto.trim(),
  }));

export const portalRecursos = [
  { titulo: "Agenda inteligente", texto: "Visualize suas aulas em lista ou calendário." },
  { titulo: "Reagendamentos", texto: "Cancele ou remarque com 24h de antecedência." },
  { titulo: "Pagamento facilitado", texto: "Pague via Pix e consulte seu histórico na hora." },
  { titulo: "Contratos digitais", texto: "Segurança jurídica gerada pelo próprio sistema." },
] as const;

/*
 * Vídeos dos alunos. Os pôsteres são quadros extraídos dos próprios arquivos
 * (public/posters): com preload="none" o navegador não baixa nenhum dos cinco
 * MP4 — 29 MB no total — até alguém apertar o play.
 */
export const videosAlunos = [
  { src: "/piano-1.mp4", poster: "/posters/piano-1.webp" },
  { src: "/piano-2.mp4", poster: "/posters/piano-2.webp" },
  { src: "/piano-3.mp4", poster: "/posters/piano-3.webp" },
  { src: "/piano-4.mp4", poster: "/posters/piano-4.webp" },
  { src: "/piano-5.mp4", poster: "/posters/piano-5.webp" },
] as const;

/*
 * Galeria enxuta: só os ambientes que importam para quem procura aulas de
 * piano. Todas as fotos originais são 4:3 (5712×4284), então a grade usa essa
 * proporção fixa e nada se mexe quando as imagens chegam.
 */
export const galeria = [
  {
    src: "/spaces/piano-1.webp",
    alt: "Piano vertical com banqueta em uma das salas de aula do Estúdio Mara Passos, na Lapa",
  },
  {
    src: "/spaces/piano-2.webp",
    alt: "Piano com partitura aberta no atril e metrônomo, pronto para a aula",
  },
  {
    src: "/spaces/piano.webp",
    alt: "Detalhe das teclas de um piano acústico da sala de aula",
  },
  {
    src: "/spaces/entrada.webp",
    alt: "Recepção do estúdio com balcão e um piano vertical ao lado da escada",
  },
  {
    src: "/spaces/fachada.webp",
    alt: "Fachada do Estúdio Mara Passos na Rua Cuevas, número 206, na Lapa",
  },
  {
    src: "/spaces/entrada-2.webp",
    alt: "Corredor interno do estúdio com cadeiras de espera e piano à esquerda",
  },
  {
    src: "/spaces/instrumentos.webp",
    alt: "Sala com bateria, teclado e violões e guitarras pendurados na parede",
  },
  {
    src: "/spaces/musicalizacao-1.webp",
    alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
  },
  {
    src: "/spaces/certificados.webp",
    alt: "Parede com certificados e diplomas emoldurados da equipe do estúdio",
  },
] as const;

/*
 * Perguntas e respostas em português do Brasil. A versão anterior misturava
 * construções de Portugal ("damos-lhe", "ecrã", "eletrónico", "contacto") —
 * para quem busca aula de piano na Lapa isso soa estranho e foge do que as
 * pessoas digitam no Google.
 */
export const perguntas = [
  {
    pergunta: "Preciso ter um piano em casa para começar?",
    resposta:
      "Não. No início você pode praticar com a estrutura do nosso estúdio ou começar com um teclado simples em casa. Quando decidir comprar o seu instrumento, nós orientamos a escolha.",
  },
  {
    pergunta: "Sou adulto e nunca toquei. Ainda dá tempo de aprender piano?",
    resposta:
      "Dá tempo, sim. Muitos alunos começam do zero na vida adulta. Nossa metodologia é prática e respeita o ritmo de cada pessoa, porque a música não tem idade.",
  },
  {
    pergunta: "A partir de que idade as crianças podem fazer aula de piano?",
    resposta:
      "A idade ideal para o piano é a partir de aproximadamente 5 anos. Para os menores, temos aulas de musicalização a partir de 6 meses de idade.",
  },
  {
    pergunta: "Como funciona a aula experimental gratuita?",
    resposta:
      "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o piano e conversa sobre seus objetivos musicais. É sem compromisso.",
  },
  {
    pergunta: "Posso remarcar a aula experimental?",
    resposta:
      "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
  },
  {
    pergunta: "As aulas de piano são em grupo ou individuais?",
    resposta:
      "São individuais. Assim o professor se concentra 100% na sua postura, na sua técnica e no repertório de que você mais gosta, seja clássico ou popular.",
  },
  {
    pergunta: "Vou aprender música erudita ou popular?",
    resposta:
      "Os dois caminhos são possíveis. Respeitamos o gosto musical de cada aluno e trabalhamos leitura à primeira vista, técnica e expressão emocional, do erudito ao popular.",
  },
  {
    pergunta: "Onde ficam as aulas de piano na Lapa e como agendo?",
    resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
  },
] as const;

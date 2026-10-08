/*
 * Dados do estúdio compartilhados pelas páginas de curso (/aulas-de-piano,
 * /aulas-de-bateria…). Um único lugar para endereço e telefone: eles aparecem
 * no texto, no FAQ e no JSON-LD, e não podem divergir entre as páginas.
 */

export const SITE_URL = "https://estudiomusicalmarapassos.com.br";
export const NOME_ESTUDIO = "Estúdio Musical Mara Passos";

export const NUMERO_WHATSAPP = "5511972405722";
export const TELEFONE_EXIBIDO = "(11) 97240-5722";
export const ENDERECO = "Rua Cuevas, 206 — Lapa, São Paulo/SP";
export const LINK_MAPA =
  "https://www.google.com/maps/search/?api=1&query=Rua+Cuevas+206+Lapa+S%C3%A3o+Paulo";

export function linkWhatsApp(instrumento: string) {
  const texto = `Olá! Gostaria de agendar uma aula experimental de ${instrumento.toLowerCase()}.`;
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

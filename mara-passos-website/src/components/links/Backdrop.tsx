import StaffParallax from "./StaffParallax";
import NoteRain from "./NoteRain";

/**
 * Fundo texturizado em seis camadas, sem nenhuma imagem: os gradientes, o grão
 * e a vinheta traduzem o veludo da referência visual para o laranja/preto da
 * marca.
 *
 * Todas as opacidades daqui saem de um mesmo nível de clareamento (0,62 numa
 * escala em que 0 é o fundo original). O preto puro com a vinheta a 0,92
 * deixava o pentagrama em 1,1:1 de contraste — existia no HTML e não existia
 * na tela. Para mexer na presença do fundo, mexa nestes seis números juntos;
 * um sozinho desequilibra a composição.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#14100e]"
    >
      {/* 1. Halo laranja atrás do emblema, contido no topo */}
      <div
        className="absolute left-1/2 top-[-22%] h-[420px] w-[680px] -translate-x-1/2 blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(242,101,34,0.25) 0%, rgba(242,101,34,0) 72%)",
        }}
      />

      {/* 2. Dobras de veludo, inclinadas e desfocadas */}
      <div
        className="absolute inset-[-25%]"
        style={{
          background:
            "repeating-linear-gradient(112deg, transparent 0 46px, rgba(242,101,34,0.047) 46px 92px, transparent 92px 150px)",
          filter: "blur(48px)",
        }}
      />

      {/* 3. Pentagrama, que corre para a esquerda conforme a página rola */}
      <StaffParallax />

      {/* 4. Chuva de notas, que sobe — antes do grão, para receber a textura */}
      <NoteRain />

      {/* 5. Brilho quente rasante na base */}
      <div
        className="absolute inset-x-0 bottom-[-20%] h-[380px] blur-[110px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgba(242,101,34,0.13) 0%, rgba(242,101,34,0) 75%)",
        }}
      />

      {/* 6. Grão e vinheta. A vinheta ainda devolve o preto da marca às bordas,
             mas a 0,70 e começando mais longe do centro: a 0,92 desde os 26%
             ela apagava as duas camadas anteriores. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 70% at 50% 2%, transparent 36%, rgba(8,8,8,0.70) 78%)",
        }}
      />
    </div>
  );
}

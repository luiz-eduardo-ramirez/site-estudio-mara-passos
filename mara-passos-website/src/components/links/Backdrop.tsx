import StaffParallax from "./StaffParallax";

/**
 * Fundo texturizado em cinco camadas, sem nenhuma imagem: os gradientes, o grão
 * e a vinheta traduzem o veludo da referência visual para o laranja/preto da
 * marca. A única camada com JavaScript é o pentagrama, que segue o ponteiro.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-mara-dark"
    >
      {/* 1. Halo laranja atrás do emblema, contido no topo */}
      <div
        className="absolute left-1/2 top-[-22%] h-[420px] w-[680px] -translate-x-1/2 blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(242,101,34,0.16) 0%, rgba(242,101,34,0) 72%)",
        }}
      />

      {/* 2. Dobras de veludo, inclinadas e desfocadas */}
      <div
        className="absolute inset-[-25%]"
        style={{
          background:
            "repeating-linear-gradient(112deg, transparent 0 46px, rgba(242,101,34,0.028) 46px 92px, transparent 92px 150px)",
          filter: "blur(48px)",
        }}
      />

      {/* 3. Pentagrama em parallax — antes do grão, para receber a textura por cima */}
      <StaffParallax />

      {/* 4. Brilho quente rasante na base */}
      <div
        className="absolute inset-x-0 bottom-[-20%] h-[380px] blur-[110px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgba(242,101,34,0.07) 0%, rgba(242,101,34,0) 75%)",
        }}
      />

      {/* 5. Grão e vinheta — a vinheta devolve o preto às bordas */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 70% at 50% 2%, transparent 26%, rgba(8,8,8,0.92) 78%)",
        }}
      />
    </div>
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Estúdio Musical e Cultural Mara Passos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Preview social gerado durante o build, com a tipografia da marca.
 * O Satori não interpola eixos de variable fonts nem decodifica WebP, por isso
 * usamos instâncias TTF estáticas e o emblema em PNG (ver scripts/optimize-assets.mjs).
 */
export default async function OpengraphImage() {
  const asset = (...p: string[]) => join(process.cwd(), "assets", ...p);

  const [playfairBold, geistSemiBold, geistRegular, emblem] = await Promise.all([
    readFile(asset("fonts", "PlayfairDisplay-Bold.ttf")),
    readFile(asset("fonts", "Geist-SemiBold.ttf")),
    readFile(asset("fonts", "Geist-Regular.ttf")),
    readFile(asset("emblem-og.png")),
  ]);

  const emblemSrc = `data:image/png;base64,${emblem.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(900px 480px at 50% -10%, rgba(242,101,34,0.28) 0%, rgba(242,101,34,0) 70%)",
          fontFamily: "Geist",
        }}
      >
        <img
          src={emblemSrc}
          width={132}
          height={132}
          style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.14)" }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: 7,
            textTransform: "uppercase",
            color: "#f26522",
          }}
        >
          Estúdio Musical e Cultural
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontFamily: "Playfair Display",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          Mara Passos
        </div>

        <div
          style={{
            display: "flex",
            width: 64,
            height: 3,
            marginTop: 30,
            backgroundColor: "#f26522",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 30,
            maxWidth: 760,
            fontSize: 27,
            textAlign: "center",
            color: "#e5e5e5",
          }}
        >
          Escola de música com metodologia lúdica, curativa e acolhedora
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: playfairBold, weight: 700, style: "normal" },
        { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
      ],
    },
  );
}

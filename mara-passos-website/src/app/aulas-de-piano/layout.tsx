import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aulas de Piano na Lapa | Estúdio Musical Mara Passos",
    description: "Aprenda a tocar piano com metodologia acolhedora e professores especializados. Agende uma experimental!",
};

export default function PianoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
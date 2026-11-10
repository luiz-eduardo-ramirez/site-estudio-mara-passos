import { buildCourseMetadata } from "../../components/course/metadata";
import { praticaConjunto } from "./data";

export const metadata = buildCourseMetadata(praticaConjunto);

export default function PraticaConjuntoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

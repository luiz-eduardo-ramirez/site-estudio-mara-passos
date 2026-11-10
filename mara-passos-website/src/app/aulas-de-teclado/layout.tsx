import { buildCourseMetadata } from "../../components/course/metadata";
import { teclado } from "./data";

export const metadata = buildCourseMetadata(teclado);

export default function TecladoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

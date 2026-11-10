import { buildCourseMetadata } from "../../components/course/metadata";
import { musicalizacaoInfantil } from "./data";

export const metadata = buildCourseMetadata(musicalizacaoInfantil);

export default function MusicalizacaoInfantilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

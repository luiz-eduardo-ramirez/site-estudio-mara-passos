import { buildCourseMetadata } from "../../components/course/metadata";
import { musicalizacaoAdultos } from "./data";

export const metadata = buildCourseMetadata(musicalizacaoAdultos);

export default function MusicalizacaoAdultosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

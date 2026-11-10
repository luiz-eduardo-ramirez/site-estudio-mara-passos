import { buildCourseMetadata } from "../../components/course/metadata";
import { musicaCamara } from "./data";

export const metadata = buildCourseMetadata(musicaCamara);

export default function MusicaCamaraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

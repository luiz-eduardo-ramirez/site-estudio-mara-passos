import { buildCourseMetadata } from "../../components/course/metadata";
import { teoriaMusical } from "./data";

export const metadata = buildCourseMetadata(teoriaMusical);

export default function TeoriaMusicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

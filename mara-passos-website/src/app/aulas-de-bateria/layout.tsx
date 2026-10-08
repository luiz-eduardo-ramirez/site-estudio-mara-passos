import { buildCourseMetadata } from "../../components/course/metadata";
import { bateria } from "./data";

export const metadata = buildCourseMetadata(bateria);

export default function BateriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

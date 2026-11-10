import { buildCourseMetadata } from "../../components/course/metadata";
import { pandeiro } from "./data";

export const metadata = buildCourseMetadata(pandeiro);

export default function PandeiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

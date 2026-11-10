import { buildCourseMetadata } from "../../components/course/metadata";
import { baixo } from "./data";

export const metadata = buildCourseMetadata(baixo);

export default function BaixoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { buildCourseMetadata } from "../../components/course/metadata";
import { canto } from "./data";

export const metadata = buildCourseMetadata(canto);

export default function CantoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

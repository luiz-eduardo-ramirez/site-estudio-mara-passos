import { buildCourseMetadata } from "../../components/course/metadata";
import { violao } from "./data";

export const metadata = buildCourseMetadata(violao);

export default function ViolaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

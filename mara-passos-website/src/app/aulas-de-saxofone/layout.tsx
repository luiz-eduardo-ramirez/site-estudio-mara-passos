import { buildCourseMetadata } from "../../components/course/metadata";
import { saxofone } from "./data";

export const metadata = buildCourseMetadata(saxofone);

export default function SaxofoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

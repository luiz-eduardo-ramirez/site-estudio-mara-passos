import { buildCourseMetadata } from "../../components/course/metadata";
import { guitarra } from "./data";

export const metadata = buildCourseMetadata(guitarra);

export default function GuitarraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

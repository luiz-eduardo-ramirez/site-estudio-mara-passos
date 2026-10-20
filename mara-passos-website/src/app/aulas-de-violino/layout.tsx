import { buildCourseMetadata } from "../../components/course/metadata";
import { violino } from "./data";

export const metadata = buildCourseMetadata(violino);

export default function ViolinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

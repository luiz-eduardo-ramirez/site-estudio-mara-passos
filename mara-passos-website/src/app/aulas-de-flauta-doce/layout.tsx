import { buildCourseMetadata } from "../../components/course/metadata";
import { flautaDoce } from "./data";

export const metadata = buildCourseMetadata(flautaDoce);

export default function FlautaDoceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

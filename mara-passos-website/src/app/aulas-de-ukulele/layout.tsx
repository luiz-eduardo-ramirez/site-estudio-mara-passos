import { buildCourseMetadata } from "../../components/course/metadata";
import { ukulele } from "./data";

export const metadata = buildCourseMetadata(ukulele);

export default function UkuleleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

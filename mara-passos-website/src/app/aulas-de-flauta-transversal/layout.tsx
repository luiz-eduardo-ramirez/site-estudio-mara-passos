import { buildCourseMetadata } from "../../components/course/metadata";
import { flautaTransversal } from "./data";

export const metadata = buildCourseMetadata(flautaTransversal);

export default function FlautaTransversalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

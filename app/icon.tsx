import { renderMonogram } from "./lib/seo/monogram";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return renderMonogram(size.width);
}

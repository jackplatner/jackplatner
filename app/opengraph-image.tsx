import { ImageResponse } from "next/og";
import { brandColors, defaultName, getSiteName } from "./lib/seo/site";
import { loadSpaceMono } from "./lib/seo/font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = defaultName;
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const name = await getSiteName();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.paper,
          color: brandColors.ink,
          fontFamily: "Space Mono",
          fontSize: 96,
        }}
      >
        {name}
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Space Mono", data: await loadSpaceMono(name), weight: 700 }],
    },
  );
}

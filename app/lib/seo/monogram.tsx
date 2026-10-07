import { ImageResponse } from "next/og";
import { brandColors, getSiteName, initialsOf } from "./site";
import { loadSpaceMono } from "./font";

export async function renderMonogram(size: number) {
  const initials = initialsOf(await getSiteName());
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.ink,
          color: brandColors.paper,
          fontFamily: "Space Mono",
          fontSize: size * 0.46,
          letterSpacing: -size * 0.02,
        }}
      >
        {initials}
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Space Mono", data: await loadSpaceMono(initials), weight: 700 }],
    },
  );
}

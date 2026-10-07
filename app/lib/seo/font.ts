export async function loadSpaceMono(text: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!fontUrl) throw new Error("Space Mono font could not be loaded");
  return (await fetch(fontUrl)).arrayBuffer();
}

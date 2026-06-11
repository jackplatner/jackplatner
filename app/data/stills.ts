export interface StillProject {
  slug: string;
  title: string;
  description: string;
  images: { src: string; width: number; height: number }[];
}

export const stills: StillProject[] = [
  {
    slug: "unbound14",
    title: "Unbound 14",
    description: "Ceramic + Camera",
    images: [
      { src: "/unbound14/Ceramic+Camera.jpg.webp",      width: 2500, height: 1617 },
      { src: "/unbound14/Ceramic+Camera-5.jpg.webp",     width: 2500, height: 1708 },
      { src: "/unbound14/Ceramic+Camera-12.jpg.webp",    width: 2500, height: 1667 },
      { src: "/unbound14/Ceramic+Camera-17.jpg.webp",    width: 2500, height: 1667 },
      { src: "/unbound14/Ceramic+Camera-20.jpg.webp",    width: 2500, height: 1667 },
      { src: "/unbound14/Ceramic+Camera-24.jpg.webp",    width: 2500, height: 1667 },
      { src: "/unbound14/Ceramic+Camera-25.jpg.webp",    width: 2500, height: 1667 },
    ],
  },
  {
    slug: "vermont-studio-center",
    title: "Vermont Studio Center",
    description: "Residency",
    images: [
      { src: "/vermont-studio-center/1.jpg", width: 1080, height: 1253 },
      { src: "/vermont-studio-center/2.jpg", width: 1080, height: 1254 },
      { src: "/vermont-studio-center/3.jpg", width: 1080, height: 1253 },
      { src: "/vermont-studio-center/4.jpg", width: 1080, height: 1253 },
      { src: "/vermont-studio-center/5.jpg", width: 1080, height: 1253 },
      { src: "/vermont-studio-center/6.jpg", width: 1080, height: 1254 },
    ],
  },
  {
    slug: "visionary-project-award",
    title: "Visionary Project Award",
    description: "Award",
    images: [
      { src: "/visionary-project-award/1.jpg", width: 1080, height: 1301 },
    ],
  },
];

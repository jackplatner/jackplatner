export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  images: ProjectImage[];
}

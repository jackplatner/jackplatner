export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string | null;
  images: ProjectImage[];
}

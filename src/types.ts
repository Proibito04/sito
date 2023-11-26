export interface Project {
  title: string;
  link: string;
  img?: ImageMetadata;
  technologies?: {
    fronted?: string[];
    backend?: string[];
  };
}

export interface BlogMeta {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  date: string;
  tags: string[];
  readTime: string;
  contentFile: string;
}

export interface BlogContent {
  title: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
}

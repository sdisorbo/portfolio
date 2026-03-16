export interface BlogPost {
  title: string;
  url: string;
  date: string;
  summary?: string;
}

export const posts: BlogPost[] = [
  // TODO: Add real articles from The Fantasy Footballers site
  { title: "Coming Soon", url: "https://www.thefantasyfootballers.com/author/samuel-disorbo/", date: "2025-01-01", summary: "Check back soon for fantasy football content." },
];

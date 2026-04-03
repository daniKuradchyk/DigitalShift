export interface PostSection {
  title: string;
  body: string[];
}

export interface PostAuthor {
  name: string;
  url: string;
}

export interface PostFaq {
  q: string;
  a: string;
}

export interface PostCta {
  label: string;
  href: string;
  text: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  h1: string;
  date: string;
  author: PostAuthor;
  tags: string[];
  intro: string;
  sections: PostSection[];
  highlights?: string[];
  faqs: PostFaq[];
  cta?: PostCta;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  h1: string;
  date: string;
  author: PostAuthor;
  tags: string[];
}

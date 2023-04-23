//https://github.com/shadcn/taxonomy/blob/main/types/index.d.ts

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NewsConfig = {
  mainNav: MainNavItem[];
};

export type AminesConfig = {
  mainNav: MainNavItem[];
};

export type BlogsConfig = {
  mainNav: MainNavItem[];
};

export type ChatbotConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

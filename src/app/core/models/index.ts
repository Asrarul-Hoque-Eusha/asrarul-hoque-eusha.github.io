export interface Profile {
  name: string;
  title: string;
  summary: string;
  keywords: string[];
  email: string;
  location: string;
  resumeUrl: string;
  profileImage?: string;
  social: {
    github: string;
    linkedin: string;
    googleScholar?: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  achievements: string[];
  links: {
    github?: string;
    live?: string;
    docs?: string;
  };
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  thesis?: string;
}

export interface Research {
  id: string;
  title: string;
  summary: string;
  techniques: string[];
  links: {
    paper?: string;
    code?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  date: string;
  link: string;
}

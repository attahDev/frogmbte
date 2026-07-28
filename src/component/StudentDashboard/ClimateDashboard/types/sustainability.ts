export type LessonSectionType =
  | "content"
  | "example"
  | "case-study"
  | "activity"
  | "summary"
  | "questions";

export type SectionMedia = {
  type: "image" | "video";
  url: string;
  caption?: string;
};

export type LessonSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
  type?: LessonSectionType;
  media?: SectionMedia;
  order?: number;
  /** Whether the current user has checked this section as done — merged
   *  in from ModuleProgress, not part of the authored content itself. */
  completed?: boolean;
};

export type CourseLesson = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  duration: string;
  learningOutcomes: string[];
  sections: LessonSection[];
  /** True once every section in this lesson is checked done. */
  completed?: boolean;
};

export type CourseProject = {
  title: string;
  description: string;
  deliverables: string[];
};

export type SustainabilityCourse = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  duration: string;
  contactHours: string;
  mode: string;
  level: string;
  progress: number;
  certificateAvailable: boolean;
  learningOutcomes: string[];
  lessons: CourseLesson[];
  finalProject?: CourseProject;
  // Sub-tags for filtering/sorting within a category (e.g. "Web
  // Development", "Beginner") and admin-curated spotlight flag — both
  // pass straight through from the backend Course row.
  tags: string[];
  isFeatured: boolean;
};
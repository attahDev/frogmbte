export type LessonSectionType =
  | "content"
  | "example"
  | "case-study"
  | "activity"
  | "summary"
  | "questions";

export type LessonSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
  type?: LessonSectionType;
};

export type CourseLesson = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  duration: string;
  learningOutcomes: string[];
  sections: LessonSection[];
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
};
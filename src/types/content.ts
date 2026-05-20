export interface SectionMeta {
  id: string;
  title: string;
  order: number;
}

export interface UnitMeta {
  id: string;
  title: string;
  order: number;
  description: string;
  sections: SectionMeta[];
}

export interface UnitSummary {
  id: string;
  title: string;
  order: number;
  sectionCount: number;
  description: string;
}

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
  /** 研究问题式副标题（仅研究路径模块有），如"A 组和 B 组有区别吗？" */
  question?: string;
  sections: SectionMeta[];
}

export interface UnitSummary {
  id: string;
  title: string;
  order: number;
  sectionCount: number;
  description: string;
}

export type NavMode = 'research' | 'toolkit';

export interface SectionManifestEntry {
  id: string;
  componentPath: string;
  titleKey: string;
  researchModule: string | null;
  researchOrder: number;
  toolkitCategory: string;
  toolkitOrder: number;
  isScenario?: boolean;
  hideInToolkit?: boolean;
}

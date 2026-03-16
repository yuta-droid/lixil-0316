
export type UserSegment = 'unknown' | 'semi-latent' | 'latent';

export type ChecklistItemType = 'link' | 'input' | 'check';

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'general' | 'semi-latent' | 'latent';
  subCategory?: string;
  type: ChecklistItemType;
  url?: string;
  urls?: { label: string; url: string }[];
  inputPlaceholder?: string;
  inputs?: { label: string; placeholder: string; key: string }[];
  hideQRLabel?: boolean;
}

export interface DiagnosisAnswer {
  id: string;
  text: string;
  targetSegment: UserSegment;
}

export interface DiagnosisQuestion {
  id: string;
  question: string;
  options: DiagnosisAnswer[];
}

export interface AppState {
  segment: UserSegment;
  progress: string[]; // array of completed checklist IDs
  isDiagnosed: boolean;
  gachaRolled: boolean;
}

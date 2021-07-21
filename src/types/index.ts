export interface Countries {
  [slug: string]: {
    Country: string;
    ISO2: string;
  };
}

export type CaseType = 'confirmed' | 'recovered' | 'deaths';

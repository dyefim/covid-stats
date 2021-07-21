import { CaseType } from '.';

export interface GlobalFilters {
  date_from: string;
  date_to: string;
  cases: CaseType;
  [k: string]: string;
}

export interface FiltersForLiveData {
  date_from: string;
  cases: CaseType;
  [k: string]: string;
}
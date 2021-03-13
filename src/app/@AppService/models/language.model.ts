import { PagingModel } from './common.model';

export interface LanguageModel {
  languageId: number;
  languageName: string;
  languageAliase: string;
  isRTL: boolean;
  isDefault: boolean;
}

export interface CreateLanguageModel {
  LanguageName: string;
  LanguageAliase: string;
  IsRTL: boolean;
}

export interface UpdateLanguageModel {
  languageId: number;
  LanguageName: string;
  LanguageAliase: string;
  IsRTL: boolean;
}

export interface LanguageSearchModel {
  paging: PagingModel;
  languageName: string;
  languageAliase: string;
}

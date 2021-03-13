import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel } from 'src/app/@AppService/models/language.model';
import { Language } from 'src/app/@AppService/Enums/common';

@Injectable({ providedIn: 'root' })
export class LanguageHandler {
  private langName = 'ipmats-currentLanguage';
  constructor(public translate: TranslateService) {}

  public GetLanguageId(): number {
    let langId: number = Language.Arabic;
    const langObj = this.getLanguageModel();

    if (langObj !== null && langObj !== undefined) {
      langId = langObj.languageId;
    }

    return langId;
  }

  public Setlanguage(lang: LanguageModel): void {
    localStorage.setItem(this.langName, JSON.stringify(lang));

    this.SetLangActions(lang);
  }

  public setTranslateLanguge() {
    const lang = this.getLanguageModel();
    this.translate.setDefaultLang(lang.languageAliase);
    this.translate.use(lang.languageAliase);
  }

  private SetLangActions(lang: LanguageModel): void {
    this.setTranslateLanguge();

    if (lang.isRTL) {
      document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
    } else {
      document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr');
    }
  }

  private getLanguageModel(): LanguageModel {
    const langStorage = JSON.parse(localStorage.getItem(this.langName));
    let langObj: LanguageModel = null;
    if (langStorage !== null && langStorage !== undefined) {
      langObj = (langStorage as unknown) as LanguageModel;
    }

    return langObj;
  }
}

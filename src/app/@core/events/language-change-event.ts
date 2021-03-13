// https://medium.com/@doyinolarewaju/firing-global-events-in-angular-2-4-af3c8ac874ec
import { EventEmitter } from '@angular/core';

export class LanguageChangingEvent {
  public languageChangeEmitter$: EventEmitter<number>;
  constructor() {
    this.languageChangeEmitter$ = new EventEmitter();
  }
  changeLanguage(langId: number): void {
    this.languageChangeEmitter$.emit(langId);
  }
}

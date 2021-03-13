import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './Component/delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmActionComponent } from './Component/confirm-action/confirm-action.component';
import { ConfirmSuccessComponent } from './Component/confirm-success/confirm-success.component';
import {
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChangeLanguageComponent } from './Component/change-language/change-language.component';
import { LoaderComponent } from './Component/loader-component/loader.component';
import { SuccessMsgComponent } from './Component/success-msg/success-msg.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    document.baseURI + '/assets/i18n/',
    '.json'
  );
}

@NgModule({
  imports: [
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader, // exported factory function needed for AoT compilation
        deps: [HttpClient],
      },
      isolate: false,
    }),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule
  ],

  entryComponents: [
    DeleteComponent,
    ConfirmActionComponent,
    ConfirmSuccessComponent,
    ChangeLanguageComponent,
    LoaderComponent,


  ],
  declarations: [
    DeleteComponent,
    ConfirmActionComponent,
    ConfirmSuccessComponent,
    ChangeLanguageComponent,
    LoaderComponent,
    SuccessMsgComponent
  ],
  exports: [LoaderComponent, SuccessMsgComponent],
  providers: [LoaderComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CoreModule {
  constructor() { }
}

import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {
  SystemActions,
  Pages,
  PageMode,
} from 'src/app/@AppService/Enums/security';
import { MessageType } from 'src/app/@AppService/Enums/common';
import { AuthService } from 'src/app/@AppService/services/auth.service';
import { LanguageChangingEvent } from '../../events/language-change-event';
import { PageChangingEvent } from '../../events/page-change-event';
import { AppInjector } from '../../Injector/app-injectore';
import { AuthenticationService } from '../../auth/authentication.service';
import { FormControl } from '@angular/forms';
import {
  BaseResult,
  PageInteractionMode,
} from 'src/app/@AppService/models/common.model';
import { HostListener } from '@angular/core';

export abstract class BaseComponent {
  protected authService: AuthService;
  private authentedService: AuthenticationService;
  protected router: Router;
  protected baseActivatedRoute: ActivatedRoute;
  private snackBar: MatSnackBar;
  private baseLangHandler: LanguageChangingEvent;
  private basePageEvent: PageChangingEvent;

  private privilegeList: number[] = [];

  constructor() {
    
   const injector = AppInjector.getInjector();
    // this.authService = injector.get(AuthService);
    // this.authentedService = injector.get(AuthenticationService);
    // this.router = injector.get(Router);
    this.snackBar = injector.get(MatSnackBar);
    // this.baseLangHandler = injector.get(LanguageChangingEvent);
    // this.basePageEvent = injector.get(PageChangingEvent);
    // this.baseActivatedRoute = injector.get(ActivatedRoute);

    // this.baseLangHandler.languageChangeEmitter$.subscribe((item: number) =>
    //   this.langChangedEventHandler(item)
    // );
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Reload Page
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.BeforeReload();
  }

  public BeforeReload() {}

  /////////////////////////////////////////////////////////////////////////////
  //////////// Page Mode
  get pageMode() {
    return PageMode;
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Page Name
  setPageName(pName: string) {
    this.basePageEvent.changePage(pName);
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Localization
  langChangedEventHandler(langId: number) {
    this.LoadLocalizedData();
  }

  public LoadLocalizedData() {}

  /////////////////////////////////////////////////////////////////////////////
  //////////// User Privilege
  get SystemActions() {
    return SystemActions;
  }

  setUserPrivilage(pageId: Pages, systemAction: SystemActions) {
    if (pageId != null && systemAction != null) {
     this.checkPagePrivilege(pageId, systemAction);
    }
  }

  private checkPagePrivilege(pageId: Pages, systemAction: SystemActions): void {
    this.authService.getUserViewActionList(pageId).subscribe(
      (result) => {
        this.checkPrivilage(result, systemAction);
      },
      (err) => {}
    );
  }

  private checkPrivilage(
    userPrivilege: number[],
    systemAction: SystemActions
  ): void {
    this.privilegeList = userPrivilege;

    if (!this.CheckActionPrivilage(systemAction)) {
      this.navigateToUrl(`/pages/401`);
    }
  }

  public CheckActionPrivilage(systemAction: SystemActions): boolean {
    return this.privilegeList.indexOf(systemAction) > -1;
  }

  ///////////////////////////////////////
  //////////////////// User TYpe/////////
  getUserType(): number {
    return this.authentedService.currentUser().userTypeId;
  }

  getUserPostOffice(): number {
    return this.authentedService.currentUser().postOfficeId;
  }
  getgovernorateId(): number {
    return this.authentedService.currentUser().governorateId;
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Navigation

  navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }

  navigateToUrlWithNavigationInfo(
    url: string,
    mode: PageMode,
    data: any
  ): void {
    const redirectInfo: PageInteractionMode = {
      pageMode: mode,
      redirectData: data,
    };

    this.router.navigateByUrl(url, {
      state: { NavigationMode: redirectInfo },
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Navigation
  saveToSession(data: any) {
    sessionStorage.setItem('PageData', JSON.stringify(data));
  }

  readSession(): any {
    const data = JSON.parse(sessionStorage.getItem('PageData'));
    sessionStorage.removeItem('PageData');
    return data;
  }

  /////////////////////////////////////////////////////////////////////////////
  //////////// Toster

  showMessage(messageModel: BaseResult): void {
    this.showMessageWithType(messageModel.result, messageModel.message);
  }

  showMessageWithType(messageType: MessageType, message: string): void {
    if (messageType === MessageType.Success) {
      status = 'success';
      this.opensucssSnackBar(message);
    } else if (messageType === MessageType.Error) {
      status = 'danger';
      this.openerroSnackBar(message);
    }
  }

  errorOccured(message: string): void {
    console.log(message);
    this.openerroSnackBar('An error has occurred please try again later');
  }

  private opensucssSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'backgroundsucss',
    });
  }

  private openerroSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'backgrounderro',
    });
  }

  ////////////////////////////
  /////////// Get Date
  getDate(value: string | number | Date): Date {
    if (value !== undefined && value != null) {
      const d = new Date(value);
      const date = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      );
      return date;
    }
    return null;
  }

  //////////////////////////////////////////////////////
  ////// Validator
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  public restrictNumeric(e: { metaKey: any; ctrlKey: any; which: number }) {
    let input: string;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 46) {
      return true;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  public restrictNotStartWithZero(e: {
    metaKey: any;
    ctrlKey: any;
    which: number;
    srcElement: any;
  }) {
    let input: string;
    if (!e.srcElement.value) {
      if (e.which === 48) {
        return false;
      }
    }

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }
}

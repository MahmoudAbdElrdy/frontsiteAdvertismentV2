export class UserPages {
  systemPageId: number;
  pageTitle: string;
  pageLink: string;
  parentPageId: number;
  menuOrder: number;
  pageIcon: string;
  show: boolean;
  childViews: UserPages[];
}

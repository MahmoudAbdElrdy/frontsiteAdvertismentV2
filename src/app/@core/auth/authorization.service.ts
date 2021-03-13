import { Injectable } from '@angular/core';
import { UserPages } from './app-user-pages';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  constructor() {}

  makeUserMenu(pageList: UserPages[]) {
    const menu: UserPages[] = [];

    return menu.concat(this.bindMenuItems(pageList));
  }

  bindMenuItems(userPages: UserPages[]) {
    const resultMenu: UserPages[] = [];
    const pgs = userPages.filter((a) => a.parentPageId == null);
    for (const pageItem of pgs) {
      const menuItem: UserPages = {
        systemPageId: pageItem.systemPageId,
        pageTitle: pageItem.pageTitle,
        pageLink: pageItem.pageLink,
        pageIcon: pageItem.pageIcon,
        menuOrder: pageItem.menuOrder,
        parentPageId: pageItem.parentPageId,
        show: false,
        // data: pageItem,
        childViews: this.bindChildMenuItems(userPages, pageItem.systemPageId),
      };
      resultMenu.push(menuItem);
    }
    return resultMenu;
  }

  bindChildMenuItems(userPages: UserPages[], parentId: number): UserPages[] {
    const resultMenu: UserPages[] = [];
    const pgs = userPages.filter((a) => a.parentPageId === parentId);
    for (const pageChItem of pgs) {
      const menuItem: UserPages = {
        systemPageId: pageChItem.systemPageId,
        pageTitle: pageChItem.pageTitle,
        pageLink: pageChItem.pageLink,
        pageIcon: pageChItem.pageIcon,
        menuOrder: pageChItem.menuOrder,
        parentPageId: pageChItem.parentPageId,
        show: false,
        childViews: [],
      };

      if (
        userPages.filter((a) => a.parentPageId === pageChItem.systemPageId)
          .length > 0
      ) {
        menuItem.childViews = this.bindChildMenuItems(
          userPages,
          pageChItem.systemPageId
        );
      }

      resultMenu.push(menuItem);
    }

    return resultMenu;
  }
}

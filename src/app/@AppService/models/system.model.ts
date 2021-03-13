export interface SystemActionModel {
  systemActionId: number;
  actionName: string;
  isSelected: boolean;
}

export interface SystemViewActionModel {
  systemPageActionId: number;
  systemActionId: number;
  systemPageId: number;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface SystemViewModel {
  systemPageId: number;
  pageTitle: string;
  pageActions: SystemViewActionModel[];
}
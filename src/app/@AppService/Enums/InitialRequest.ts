export enum InitialRequestStatusEnum {
  New = 1600,
  Reviewed = 1601,
  AssignToSupervisor = 1602,
  AssignToDistributor = 1603,
  Pickup = 1604,
  Avaiable = 1605,
  Blocked = 1606,
  Complete = 1607,
  Reject = 1608,
  UnderProcess = 1609,
  ClientNotExist = 1610,
  DeliveredTooffice = 1611,
  Cancel = 1612,
  NotDelivered = 1613,
  SupervisorApprovedDelivery = 1614,
  SupervisorApprovedNotDelivery = 1615,
}

export enum InitialRequestFileStatusEnum {
  New = 2500,
  Pending = 2501,
  Parsed = 2502,
  Cancelled = 2503,
  Finished = 2504,
}

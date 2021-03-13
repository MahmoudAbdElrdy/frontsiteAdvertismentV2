export enum ItemType {
  Request = 800,
  Group = 801,
  Manifest = 802,
  InitialRequest = 803,
  RunSheet = 804,
}

export enum ItemStatus {
  New = 1000,
  AddToGroup = 1001,
  AddToManifest = 1002,
  ReceivedToOffice = 1005,
  DeliveredToClient = 1006,
  GroupCreated = 1007,
  GroupTerminated = 1008,
  ManifestCreated = 1009,
  AssignedToSupervisor = 1010,
  AssignedToCourier = 1011,
  ManifestTerminated = 1012,
  UnderProcess = 1013,
  Pickup = 1014,
  NotDelivered = 1015,
  Binding = 1016,
  AssignedRequestToSupervisor = 1017,
  AssignedRequestToCourier = 1018,
  DeliveredToTheBranch = 1019,
  Cancel = 1020,
  SupervisorApprovedDelivery = 1021,
  SupervisorApprovedNotDelivery = 1022,
  GroupReceived = 1023,
  
  AddToRunSheet=1026
}

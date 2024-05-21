export enum ApplicationStatuses {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export namespace ApplicationTypes {
  export type Application = {
    id?: number;
    projectId: number;
    volunteerId: number;
    status: ApplicationStatuses;
  };

  export type ApplicationList = Application[];
}

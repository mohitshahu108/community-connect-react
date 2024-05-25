import { VolunteerTypes } from "service/volunteer/VolunteerTypes";

export enum ApplicationStatuses {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export namespace ApplicationTypes {
  export type Application = {
    id?: number;
    projectId: number;
    volunteer: VolunteerTypes.Volunteer;
    status: ApplicationStatuses;
  };

  export type ApplicationList = Application[];

 export type ApplicationRequest = {
    id?: number;
    projectId: number;
    volunteerId: number;
    status: ApplicationStatuses;
  };
}

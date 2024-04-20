export namespace ProjectTypes {
  export type Project = {
    id: number | null;
    name: string;
    description: string;
    location: string;
    timeCommitment: number;
    status: string;
    organizationId: number;
    skillIds: number[];
    volunteerIds: number[];
  };

  export type ProjectList = Project[];
}

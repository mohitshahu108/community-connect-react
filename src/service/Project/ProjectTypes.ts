import { ApplicationTypes } from "service/application/ApplicationTypes";
import { SkillTypes } from "service/skill/SkillTypes";
import { VolunteerTypes } from "service/volunteer/VolunteerTypes";

export namespace ProjectTypes {
  export type Project = {
    id: number | null;
    name: string;
    description: string;
    location: string;
    timeCommitment: number;
    status: string;
    organizationId: number;
    skills: SkillTypes.Skill[];
    applications: ApplicationTypes.ApplicationList;
    volunteers: VolunteerTypes.VolunteerLk[];
  };

  export type ProjectList = Project[];
}

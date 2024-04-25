import { SkillTypes } from "service/skill/SkillTypes";

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
    volunteerIds: number[];
  };

  export type ProjectList = Project[];
}

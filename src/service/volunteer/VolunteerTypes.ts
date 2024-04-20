import { SkillTypes } from "service/skill/SkillTypes";

export namespace VolunteerTypes {
  export type Volunteer = {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    location: string;
    availabilityStartDate: Date;
    availabilityEndDate: Date;
    skills: SkillTypes.Skill[];
    userId: number;
  };
}

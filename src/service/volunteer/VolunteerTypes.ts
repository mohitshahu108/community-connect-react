import { AssetTypes } from "service/asset/AssetTypes";
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
    profilePhoto?: AssetTypes.Asset;
  };

  export type VolunteerLk = {
    id: number;
    firstname: string;
    lastname: string;
  };
}

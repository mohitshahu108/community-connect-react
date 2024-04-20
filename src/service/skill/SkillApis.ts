import api from "./../../api/api";
import { SkillTypes } from "./SkillTypes";

class SkillApis {
  static async addSkill(values: SkillTypes.Skill) {
    try {
      const response: SkillTypes.Skill = await api.post({ url: `/skills`, data: values });
      return response;
    } catch (error) {
      throw error;
    }
  }


  static async getSkillList(): Promise<SkillTypes.Skill[]> {
    try {
      const response: SkillTypes.Skill[] = await api.get({ url: `/skills` });
      return response;
    } catch (error) {
      throw error;
    }
  }

}

export default SkillApis;

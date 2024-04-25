import api from "../../api/api";
import { VolunteerTypes } from "./VolunteerTypes";

class VolunteerApis {
  static async getVolunteerByUserId(userId: number) {
    try {
      const response: VolunteerTypes.Volunteer = await api.get({ url: `/volunteers/byUserId/${userId}` });
      return response;
    } catch (error) {
      throw error;
    }
  }

static async editVolunteer(volunteerId: number, volunteer: VolunteerTypes.Volunteer) {
    try {
      const response: VolunteerTypes.Volunteer = await api.put({ url: `/volunteers/${volunteerId}`, data: volunteer });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default VolunteerApis;
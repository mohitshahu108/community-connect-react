import api from "../../api/api";
import { OrganizationTypes } from "./OrganizationTypes";

class OrganizationApis {
  static async updateProfilePic(formData: FormData) {
    try {
      const response: OrganizationTypes.Organization = await api.uploadFile({ url: "/organizations/profile_pic", formData });
      return response;
    } catch (error) {
      throw error;
    }
  }
  static async getOrganizationByUserId(userId: number) {
    try {
      const response: OrganizationTypes.Organization = await api.get({ url: `/organizations/byUserId/${userId}` });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async editOrganization(organization: OrganizationTypes.Organization, orgId: number) {
    try {
      const response: OrganizationTypes.Organization = await api.put({
        url: `/organizations/${orgId}`,
        data: organization
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default OrganizationApis;

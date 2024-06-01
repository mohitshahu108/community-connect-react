import { ApplicationStatuses, ApplicationTypes } from "./ApplicationTypes";
import api from "../../api/api";

class ApplicationApis {
    static async approveApplication(id: number ): Promise<ApplicationTypes.Application> {
      try {
        const result: ApplicationTypes.Application = await api.put({ url: `applications/${id}`, data: { status: ApplicationStatuses.APPROVED } });
        return result;
      } catch (error) {
        throw error;
      }
    }

    static async rejectApplication(id: number): Promise<ApplicationTypes.Application> {
      try {
        const result: ApplicationTypes.Application = await api.put({ url: `applications/${id}`, data: { status: ApplicationStatuses.REJECTED } });
        return result;
      } catch (error) {
        throw error;
      }
    }


    static apply = async (
        req: ApplicationTypes.ApplicationRequest
      ): Promise<{ data?: ApplicationTypes.Application; errorMessage?: string }> => {
        try {
          const response: ApplicationTypes.Application = await api.post({
            url: "applications/apply",
            data: req
          });
          return { data: response };
        } catch (error) {
          throw error;
        }
      };

}

export default ApplicationApis;
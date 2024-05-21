import { ApplicationTypes } from "./ApplicationTypes";
import api from "../../api/api";

class ApplicationApis {
    static apply = async (
        req: ApplicationTypes.Application
      ): Promise<{ data?: ApplicationTypes.Application; errorMessage?: string }> => {
        try {
          const response: ApplicationTypes.Application = await api.post({
            url: "application/apply",
            data: req
          });
          return { data: response };
        } catch (error) {
          return { errorMessage: `Error during  applying: ${error}` };
        }
      };
}

export default ApplicationApis;
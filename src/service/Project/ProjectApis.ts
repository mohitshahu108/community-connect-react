import api from "../../api/api";
import { ProjectTypes } from "./ProjectTypes";

class ProjectApis {
  static getProjectById = async (projectId: number): Promise<ProjectTypes.Project> => {
    try {
      const result: ProjectTypes.Project = await api.get({ url: `projects/${projectId}` });
      return result;
    } catch (error) {
      throw error;
    }
  };
  static getProjectList = async () => {
    try {
      const result: ProjectTypes.ProjectList = await api.get({ url: "projects" });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static addProject = async (payload: ProjectTypes.Project): Promise<ProjectTypes.Project> => {
    try {
      const result: ProjectTypes.Project = await api.post({ url: "projects", data: payload });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static updateProject = async (projectId: number, payload: ProjectTypes.Project): Promise<ProjectTypes.Project> => {
    try {
      const result: ProjectTypes.Project = await api.put({ url: `projects/${projectId}`, data: payload });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static applyOnProject = async (
    projectId: number,
    payload: { projectId: number; volunteerId: number }
  ): Promise<ProjectTypes.Project> => {
    try {
      const result: ProjectTypes.Project = await api.put({ url: `projects/${projectId}/apply`, data: payload });
      return result;
    } catch (error) {
      throw error;
    }
  };

  static deleteProject = async (projectId: number): Promise<void> => {
    try {
      await api.delete({ url: `projects/${projectId}` });
    } catch (error) {
      throw error;
    }
  };
}

export default ProjectApis;

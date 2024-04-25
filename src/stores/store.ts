import { computed, makeAutoObservable, observable } from "mobx";
import { OrganizationTypes } from "../service/organization/OrganizationTypes";
import { ProjectTypes } from "../service/Project/ProjectTypes";
import SkillApis from "../service/skill/SkillApis";
import { SkillTypes } from "../service/skill/SkillTypes";
import { UserTypes } from "../service/user/UserTypes";
import { VolunteerTypes } from "../service/volunteer/VolunteerTypes";
import { AuthTypes } from "../service/auth/AuthTypes";
import Role from "../service/auth/Role";

export class Store {
  public readonly PROJECT_STATUSES: { label: string; value: string; description: string }[] = [
    { label: "NEW", value: "NEW", description: "Just Created" },
    { label: "ACTIVE", value: "ACTIVE", description: "Work Under Progress" },
    { label: "INACTIVE", value: "INACTIVE", description: "Halted" },
    { label: "OPEN", value: "OPEN", description: "Ready to Work" },
    { label: "CLOSED", value: "CLOSED", description: "Completed" }
  ];

  listProject: ProjectTypes.ProjectList = [];

  getDefaultCurrentUser(): UserTypes.User | null {
    const user = localStorage.getItem("currentUser");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  skills: SkillTypes.ListSkills = [];

  currentUser: UserTypes.User | null = this.getDefaultCurrentUser();

  get fullName() {
    return this.currentUser?.firstname + " " + this.currentUser?.lastname;
  }

  currentOrganization: OrganizationTypes.Organization | null = null;
  currentVolunteer: VolunteerTypes.Volunteer | null = null;

  public getCurrentOrganization(): OrganizationTypes.Organization | null {
    return this.currentOrganization;
  }
  public setCurrentOrganization(value: OrganizationTypes.Organization | null) {
    this.currentOrganization = value;
  }
  public getCurrentVolunteer(): VolunteerTypes.Volunteer | null {
    return this.currentVolunteer;
  }
  public setCurrentVolunteer(value: VolunteerTypes.Volunteer | null) {
    this.currentVolunteer = value;
  }

  public setProjectList(listProject: ProjectTypes.ProjectList) {
    this.listProject = listProject;
  }

  constructor() {
    makeAutoObservable(this, {
      currentUser: observable,
      currentOrganization: observable,
      currentVolunteer: observable,
      fullName: computed,
      listProject: observable
    });
  }

  public getCurrentUser = (): UserTypes.User | null => {
    return this.currentUser;
  };

  public setCurrentUser = (value: UserTypes.User | null) => {
    this.currentUser = value;
  };

  public fetchSkills = async () => {
    try {
      const result = await SkillApis.getSkillList();
      this.skills = result;
    } catch (error) {
      console.log("Error while fetching skills", error);
    }
  };

  saveToLocalStorage = (data: AuthTypes.AuthenticationResponse) => {
    localStorage.setItem("authToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
  };

 isOrganization = this.currentUser?.role === Role.ORGANIZATION;
 isVolunteer = this.currentUser?.role === Role.VOLUNTEER;
}

const store = new Store();

export default store;

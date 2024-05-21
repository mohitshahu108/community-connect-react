const routes = {
  landing: "/",
  organization: {
    login: "/organization/login",
    signup: "/organization/signup",
    profile: "/organization/profile",
    project: {
      list: "/organization/project/list",
      new: "/organization/project/new",
      details:(id: string) => `/organization/project/${id}`,
    }
  },
  volunteer: {
    login: "/volunteer/login",
    signup: "/volunteer/signup",
    profile: "/volunteer/profile",
    project: {
      list: "/volunteer/project/list",
      new: "/volunteer/project/new",
      details: (id: string) => `/volunteer/project/${id}`
    }
  }
};

export default routes;

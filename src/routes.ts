const routes = {
  landing: "/",
  organization: {
    login: "/organization/login",
    signup: "/organization/signup",
    profile: "/organization/profile",
    project: {
      list: "/organization/project/list",
      new: "/organization/project/new"
    }
  },
  volunteer: {
    login: "/volunteer/login",
    signup: "/volunteer/signup",
    profile: "/volunteer/profile",
    project: {
      list: "/volunteer/project/list",
      new: "/volunteer/project/new"
    }
  }
};

export default routes;

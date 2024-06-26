// src/hooks/useAuth.jsx

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../stores/useStore";
import { observer } from "mobx-react";
import { UserTypes } from "service/user/UserTypes";
import { useLocalStorage } from "./useLocalStorage";
import routes from "../routes";
import { OrganizationTypes } from "../service/organization/OrganizationTypes";
import { VolunteerTypes } from "../service/volunteer/VolunteerTypes";
type contextType = {
  user: UserTypes.User | null;
  login: (data: UserTypes.User) => Promise<void>;
  logout: () => void;
} | null;

const contextValue: contextType = null;
const AuthContext = createContext<contextType>(contextValue);

export const AuthProvider = observer(({ children }: { children: ReactNode }) => {
  const store = useStore();
  const user = store.currentUser;
  const setUser = store.setCurrentUser;
  const navigate = useNavigate();
  const [localCurrentUser, setLocalCurrentUser] = useLocalStorage("currentUser", null as UserTypes.User | null);
  const [localCurrentOrganization, setLocalCurrentOrganization] = useLocalStorage(
    "currentOrganization",
    null as OrganizationTypes.Organization | null
  );
  const [localCurrentVolunteer, setLocalCurrentVolunteer] = useLocalStorage(
    "currentVolunteer",
    null as VolunteerTypes.Volunteer | null
  );

  // call this function when you want to authenticate the user
  const login = async (data: UserTypes.User) => {
    setUser(data);
    setLocalCurrentUser(data);
    if (data.role === "ORGANIZATION") {
      navigate(routes.organization.profile);
    } else {
      navigate(routes.volunteer.profile);
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setLocalCurrentUser(null);
    setLocalCurrentOrganization(null);
    setLocalCurrentVolunteer(null);

    store.setCurrentUser(null);
    store.setCurrentOrganization(null);
    store.setCurrentVolunteer(null);

    navigate("/", { replace: true });
  };

  const value: contextType = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export const useAuth = () => {
  return useContext(AuthContext);
};

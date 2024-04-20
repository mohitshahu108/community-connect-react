import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing";
import theme from "./styles/thems";
import routes from "./routes";
import VolunteerLogin from "./pages/VolunteerLogin";
import VolunteerSignUp from "./pages/VolunteerSignUp";
import OrganizationSignUp from "./pages/OrganizationSignUp";
import OrganizationLogin from "./pages/OrganizationLogin";
import OrganizationProfile from "./pages/OrganizationProfile";
import store from "./stores/store";
import { StoreContext } from "./stores/useStore";
import Layout from "./layouts/layout";
import ProtectedRoute from "./routes/protectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path={routes.landing} element={<LandingPage />} />

                <Route path={routes.volunteer.login} element={<VolunteerLogin />} />
                <Route path={routes.volunteer.signup} element={<VolunteerSignUp />} />

                <Route path={routes.organization.login} element={<OrganizationLogin />} />
                <Route path={routes.organization.signup} element={<OrganizationSignUp />} />

                <Route
                  path={routes.organization.profile}
                  element={
                    <ProtectedRoute>
                      <OrganizationProfile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={routes.organization.project.list}
                  element={
                    <ProtectedRoute>
                      <ProjectList />
                    </ProtectedRoute>
                  }
                />

              </Routes>
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </StoreContext.Provider>
  );
}

export default App;

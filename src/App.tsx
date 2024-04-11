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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.landing} element={<LandingPage />} />

          <Route path={routes.volunteer.login} element={<VolunteerLogin />} />
          <Route path={routes.volunteer.signup} element={<VolunteerSignUp />} />

          <Route path={routes.organization.login} element={<OrganizationLogin />} />
          <Route path={routes.organization.signup} element={<OrganizationSignUp />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

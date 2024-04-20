import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "./navbar";
import Footer from "./footer";

type LayoutPropType = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutPropType) => (
  <Box minHeight="100vh" display="flex" flexDirection="column">
    <NavBar />
    <Box flex="1" overflow={"scroll"}>{children}</Box>
    <Footer />
  </Box>
);

export default Layout;

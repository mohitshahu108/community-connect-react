import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from "@chakra-ui/react";
import useStore from "../stores/useStore";
import Role from "../service/auth/Role";
import routes from "../routes";
import { useAuth } from "../hooks/useAuth";
import { observer } from "mobx-react";
import { Link as RouterLink } from "react-router-dom";

const NavBar = observer(() => {
  const store = useStore();
  const auth = useAuth();
  const currentUser = store?.currentUser;
  const isOrganization = currentUser?.role === Role.ORGANIZATION;
  const profileUrl = isOrganization ? "" : store.currentVolunteer?.profilePhoto?.s3Url;
  const fullName = isOrganization
    ? store.currentOrganization?.name
    : store.currentVolunteer?.firstname + " " + store.currentVolunteer?.lastname;
  const navColor = isOrganization ? "green.500" : "blue.500";
  return (
    <Flex as="nav" align="center" justify="space-between" p={4} bg={navColor}>
      <Flex>
        <Link href={!currentUser ? "/" : isOrganization ? routes.organization.profile : routes.volunteer.profile}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Community Connect
          </Text>
        </Link>

        {currentUser && (
          <Link
            as={RouterLink}
            ml={4}
            to={isOrganization ? routes.organization.project.list : routes.volunteer.project.list}
          >
            <Text fontSize="xl" fontWeight="bold" color="white">
              Projects
            </Text>
          </Link>
        )}
      </Flex>

      {/* should show profile related only when current user is there */}
      {currentUser && (
        <Flex>
          <Box>
            <Link as={RouterLink} to={isOrganization ? routes.organization.profile : routes.volunteer.profile} mr={4}>
              <Avatar size="sm" name={fullName} src={profileUrl} />
            </Link>
          </Box>

          <Menu>
            <MenuButton color={"white"}>{fullName}</MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={auth?.logout}>Log Out</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
});

export default NavBar;

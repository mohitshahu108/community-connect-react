import { Box, Text, Avatar, Button, Center, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import OrganizationApis from "../service/organization/OrganizationApis";
import { observer } from "mobx-react";
import useStore from "../stores/useStore";
import EditOrganizationForm from "../components/EditOrganizationForm";

const OrganizationProfile = observer(() => {
  const store = useStore();
  const organization = store.currentOrganization;
  const currentUser = store.currentUser;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getCurrentOrganization = async () => {
    try {
      if (currentUser?.id) {
        const result = await OrganizationApis.getOrganizationByUserId(currentUser?.id);
        store.setCurrentOrganization(result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCurrentOrganization();
  }, []);

  return (
    <>
      <EditOrganizationForm isOpen={isOpen} onClose={onClose} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        mt={8}
      >
        <Box mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 8 }}>
          <Center>
            <Avatar size="2xl" name={organization?.name} src="path/to/avatar.jpg" />
          </Center>
        </Box>
        <Box>
          <Center>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {organization?.name}
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                Website: {organization?.website}
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                Location: {organization?.location}
              </Text>
              <Text fontSize="md" color="gray.500" mt={2}>
                Description: {organization?.description}
              </Text>
              <Button borderRadius={0} type="button" variant="solid" colorScheme="green" mt={4} onClick={onOpen}>
                Edit Profile
              </Button>
            </Box>
          </Center>
        </Box>
      </Box>
    </>
  );
});

export default OrganizationProfile;

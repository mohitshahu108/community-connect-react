import { ReactNode, useEffect, useState } from "react";
import VolunteerApis from "../../service/volunteer/VolunteerApis";
import useStore from "../../stores/useStore";
import { Avatar, Box, Button, Center, Flex, Square, Text } from "@chakra-ui/react";
import EditVolunteerForm from "./EditVolunteersProfileForm";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const VolunteerProfile = observer(() => {
  const store = useStore();
  const currentUser = store.currentUser;
  const currentVolunteer = store.currentVolunteer;

  console.log(toJS(currentVolunteer));

  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);

  const getCurrentVolunteer = async () => {
    try {
      if (currentUser?.id) {
        const result = await VolunteerApis.getVolunteerByUserId(currentUser?.id);
        store.setCurrentVolunteer(result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCurrentVolunteer();
  }, []);

  return (
    <>
      {isVolunteerFormOpen && (
        <EditVolunteerForm isOpen={isVolunteerFormOpen} onClose={() => setIsVolunteerFormOpen(false)} />
      )}

      <Flex>
        <Box flex={"20%"} />
        <Box flex={"80%"}>
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Box flex={"50%"}>
              <Square>
                <Avatar
                  size="2xl"
                  name={currentVolunteer?.firstname + " " + currentUser?.lastname}
                  src="path/to/avatar.jpg"
                />
              </Square>
            </Box>
            <Box flex={"50%"} mt={30}>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {currentVolunteer?.firstname} {currentVolunteer?.lastname}
              </Text>
              <Text fontSize="md" color="gray.500" mb={2}>
                Phone: {currentVolunteer?.phone}
              </Text>
              <Text fontSize="md" color="gray.500" mb={2}>
                Location: {currentVolunteer?.location}
              </Text>
              <Text fontSize="md" color="gray.500" mb={2}>
                Availability Start Date: {currentVolunteer?.availabilityStartDate as ReactNode}
              </Text>
              <Text fontSize="md" color="gray.500" mb={2}>
                Availability End Date: {currentVolunteer?.availabilityEndDate as ReactNode}
              </Text>
              <Box mt={4}>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Skills:
                </Text>
                {currentVolunteer?.skills?.map((skill) => (
                  <Text key={skill.id} fontSize="md" color="gray.500" mb={2}>
                    - {skill.name}
                  </Text>
                ))}
              </Box>
              <Button
                borderRadius={0}
                onClick={() => {
                  setIsVolunteerFormOpen(true);
                }}
                type="button"
                variant="solid"
                colorScheme="blue"
                mt={4}
              >
                Edit Profile
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box flex={"20%"} />
      </Flex>
    </>
  );
});

export default VolunteerProfile;

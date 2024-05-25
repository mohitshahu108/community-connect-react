import { ReactNode, useEffect, useState } from "react";
import VolunteerApis from "../../service/volunteer/VolunteerApis";
import useStore from "../../stores/useStore";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import EditVolunteerForm from "./EditVolunteersProfileForm";
import { observer } from "mobx-react";
import ProfilePhotoPicker from "../../components/common/ProfilePhotoPicker";
import Role from "../../service/auth/Role";
import useToaster from "../../hooks/useToaster";

const VolunteerProfile = observer(() => {
  const store = useStore();
  const currentUser = store.currentUser;
  const currentVolunteer = store.currentVolunteer;
  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { handleSuccess, handleError } = useToaster();

  const getCurrentVolunteer = async () => {
    try {
      if (currentUser?.id) {
        const result = await VolunteerApis.getVolunteerByUserId(currentUser?.id);
        store.setCurrentVolunteer(result);
      }
    } catch (error) {
      console.log("error", error);
      handleError(error);
    }
  };

  const profileFormData = new FormData();
  const onChangeProfilePhoto = (file: File) => {
    if (currentVolunteer?.id) {
      profileFormData.append("assetFileName", file.name);
      profileFormData.append("assetableId", currentVolunteer?.id.toString());
      profileFormData.append("assetableType", Role.VOLUNTEER);
      profileFormData.append("profilePic", file);
    }
  };

  const onCancelProfilePhoto = () => {
    profileFormData.delete("assetfilename");
    profileFormData.delete("assetableid");
    profileFormData.delete("assetableType");
    profileFormData.delete("profilePic");
  };

  const onSaveProfilePhoto = async (onSaveSuccessCallback: () => void) => {
    try {
      setImageLoading(true);
      const result = await VolunteerApis.updateProfilePic(profileFormData);
      await getCurrentVolunteer();
      // no reload is required just updating currentUser
      setImageLoading(false);
      onSaveSuccessCallback();
      handleSuccess("Profile photo updated successfully");
    } catch (error) {
      setImageLoading(false);
      console.log(error);
      handleError(error);
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
              <ProfilePhotoPicker
                sourceUrl={currentVolunteer?.profilePhoto?.s3Url}
                avatarName={store.fullName}
                onChangeImageCallBack={onChangeProfilePhoto}
                onSaveImageCallBack={onSaveProfilePhoto}
                onCancelImageCallBack={onCancelProfilePhoto}
                loading={imageLoading}
              />
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

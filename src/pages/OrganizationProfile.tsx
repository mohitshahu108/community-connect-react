import { Box, Text, Avatar, Button, Center, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OrganizationApis from "../service/organization/OrganizationApis";
import { observer } from "mobx-react";
import useStore from "../stores/useStore";
import EditOrganizationForm from "../components/EditOrganizationForm";
import ProfilePhotoPicker from "../components/common/ProfilePhotoPicker";
import Role from "../service/auth/Role";

const OrganizationProfile = observer(() => {
  const store = useStore();
  const organization = store.currentOrganization;
  const currentUser = store.currentUser;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const toast = useToast();

  const getCurrentOrganization = async () => {
    try {
      if (currentUser?.id) {
        const result = await OrganizationApis.getOrganizationByUserId(currentUser?.id);
        store.setCurrentOrganization(result);
      }
    } catch (error: any) {
      console.log("error", error);
      toast({
        title: "Error",
        description: error.message,
        duration: 3000,
        status: "error"
      })
    }
  };

  const profileFormData = new FormData();
  const onChangeProfilePhoto = (file: File) => {
    if (organization?.id) {
      profileFormData.append("assetFileName", file.name);
      profileFormData.append("assetableId", organization?.id.toString());
      profileFormData.append("assetableType", Role.ORGANIZATION);
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
      const result = await OrganizationApis.updateProfilePic(profileFormData);
      await getCurrentOrganization();
      // no reload is required just updating currentUser
      setImageLoading(false);
      onSaveSuccessCallback();
    } catch (error) {
      setImageLoading(false);
      console.log(error);
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
          <ProfilePhotoPicker
                sourceUrl={organization?.profilePhoto?.s3Url}
                avatarName={store.fullName}
                onChangeImageCallBack={onChangeProfilePhoto}
                onSaveImageCallBack={onSaveProfilePhoto}
                onCancelImageCallBack={onCancelProfilePhoto}
                loading={imageLoading}
              />
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

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdCamera } from "react-icons/md";
import { observer } from "mobx-react";

type ProfilePhotoPickerPropsType = {
  disabled?: boolean;
  sourceUrl?: string;
  onChangeImageCallBack?: (file: File) => void;
  onCancelImageCallBack?: () => void;
  onSaveImageCallBack?: (saveSuccessCallback: () => void) => void;
  loading?: boolean;
  avatarName: string;
};

const ProfilePhotoPicker = observer(({
  disabled = false,
  sourceUrl,
  onChangeImageCallBack = (file: File) => {},
  onCancelImageCallBack = () => {},
  onSaveImageCallBack = (saveSuccessCallback = () => {}) => {},
  loading,
  avatarName = "A N"
}: ProfilePhotoPickerPropsType) => {
  const fileInputRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(sourceUrl);
  const [newImage, setNewImage] = useState<string | null>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const selectedFile = e.target.files[0];
    setNewImage(URL.createObjectURL(selectedFile));
    onChangeImageCallBack(selectedFile);
  };

  const onCancelImage = () => {
    setNewImage(null);
    onCancelImageCallBack();
  };

  const openFileDailoag = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setImageUrl(sourceUrl);
  }, [sourceUrl]);

  const saveSuccessCallback = () => {
    setNewImage(null);
  };

  return (
    <Box>
      <Stack direction="row" align="center" justify="center">
        <Stack align="center" justify="center">

          <Avatar size={"2xl"} src={newImage || imageUrl} name={avatarName} />
          {loading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}

          <input
            ref={fileInputRef}
            id="file-upload"
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            onChange={handleImageChange}
            onClick={(event: any) => {
              event.target.value = null;
            }}
            style={{ display: "none" }}
          />

          <Flex direction="row" gap="2">
            {!newImage && (
              <Button
                leftIcon={<MdCamera />}
                id="file-upload"
                variant="outline"
                onClick={openFileDailoag}
                disabled={disabled}
              >
                Select Photo
              </Button>
            )}

            {newImage && (
              <>
                <Button
                  leftIcon={<IoMdClose />}
                  variant="outline"
                  onClick={onCancelImage}
                  disabled={disabled || loading}
                >
                  Cancel
                </Button>
                <Button
                  leftIcon={<MdOutlineFileUpload />}
                  onClick={() => onSaveImageCallBack(saveSuccessCallback)}
                  variant="outline"
                  disabled={disabled || loading}
                >
                  Upload
                </Button>
              </>
            )}
          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
});

export default ProfilePhotoPicker;

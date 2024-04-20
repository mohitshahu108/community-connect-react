import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Flex
} from "@chakra-ui/react";
import { FormikHelpers, FormikProps } from "formik";
import { SkillTypes } from "service/skill/SkillTypes";
import SkillForm, { SKILL_FOMR_NAME } from "./SkillForm";
import { useRef } from "react";
import SkillApis from "./../../service/skill/SkillApis";

type AddSkillFormPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const AddSkillForm = ({ isOpen, onClose }: AddSkillFormPropsType) => {
  const formRef = useRef<FormikProps<SkillTypes.Skill>>({} as FormikProps<SkillTypes.Skill>);
  const handleSubmit = async (values: SkillTypes.Skill, actions: FormikHelpers<SkillTypes.Skill>): Promise<void> => {
    try {
      const result = await SkillApis.addSkill(values);
      onClose();
    } catch (error) {
      console.log("Error While creating skill", error);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Skill</DrawerHeader>
        <DrawerBody>
          <SkillForm formRef={formRef} initialValues={{} as SkillTypes.Skill} handleSubmit={handleSubmit} />
        </DrawerBody>
        <DrawerFooter>
          <Flex justifyContent="end" gap={4}>
            <Button variant="outline" colorScheme="green" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" colorScheme="green" type="submit" form={SKILL_FOMR_NAME}>
              Add
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddSkillForm;

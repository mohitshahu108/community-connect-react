import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Button
} from "@chakra-ui/react";
import AddSkillForm from "./../../components/skills/AddSkillForm";
import { Formik, Field, FieldProps, Form, FormikHelpers } from "formik";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import useStore from "../../stores/useStore";
import * as Yup from "yup";

type ProjectFormPropsType = {
  initialValue: ProjectTypes.Project;
  handleSubmit: (values: ProjectTypes.Project, actions: FormikHelpers<ProjectTypes.Project>) => Promise<void>;
  onClose: () => void;
  isAdd?: boolean;
};

const ProjectForm = observer(({ initialValue, handleSubmit, onClose, isAdd }: ProjectFormPropsType) => {
    console.log("initialValue",initialValue);
  const store = useStore();
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const ProjectSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    timeCommitment: Yup.number().required("Time commitment is required"),
    status: Yup.string().required("Status is required"),
    organizationId: Yup.number(),
    skillIds: Yup.array().of(Yup.number()).required("Skill IDs are required"),
    volunteerIds: Yup.array().of(Yup.number())
  });
  const onSkillFormClose = () => {
    store.fetchSkills();
    setIsSkillFormOpen(false);
  };

  useEffect(() => {
    store.fetchSkills();
  }, []);
  return (
    <>
      {isSkillFormOpen && <AddSkillForm isOpen={isSkillFormOpen} onClose={onSkillFormClose} />}
      <Formik initialValues={initialValue} validationSchema={ProjectSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, handleSubmit, errors, touched, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Stack spacing={4} p="1rem">
              <Field name="name">
                {({ field }: FieldProps) => (
                  <FormControl isInvalid={Boolean(errors.name && touched.name)}>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} type="text" placeholder="Name" focusBorderColor="green.500" />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description">
                {({ field }: FieldProps) => (
                  <FormControl isInvalid={Boolean(errors.description && touched.description)}>
                    <FormLabel>Description</FormLabel>
                    <Input {...field} type="text" placeholder="Description" focusBorderColor="green.500" />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="location">
                {({ field }: FieldProps) => (
                  <FormControl isInvalid={Boolean(errors.location && touched.location)}>
                    <FormLabel>Location</FormLabel>
                    <Input {...field} type="text" placeholder="Location" focusBorderColor="green.500" />
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="status">
                {({ field }: FieldProps) => (
                  <FormControl isInvalid={Boolean(errors.status && touched.status)}>
                    <FormLabel>Status</FormLabel>
                    <Select {...field} itemType="text" focusBorderColor="green.500" marginRight={"4px"}>
                      <option value="">Select Project</option>
                      {store.PROJECT_STATUSES.map(({ label, value }) => (
                        <option key={label} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="timeCommitment">
                {({ field }: FieldProps) => (
                  <FormControl isInvalid={Boolean(errors.timeCommitment && touched.timeCommitment)}>
                    <FormLabel>Time commitment</FormLabel>
                    <NumberInput defaultValue={0} min={0}>
                      <NumberInputField
                        {...field}
                        type="number"
                        placeholder="Time commitment"
                        borderColor="green.500"
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.timeCommitment}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="skillIds">
                {({ field }: FieldProps) => (
                  <FormControl isInvalid={Boolean(errors.skillIds && touched.skillIds)}>
                    <FormLabel>Skill IDs</FormLabel>
                    <Flex>
                      <Select
                        {...field}
                        itemType="number"
                        multiple
                        placeholder="Skill IDs"
                        focusBorderColor="green.500"
                        marginRight={"4px"}
                      >
                        {store.skills.map((skill) => (
                          <option key={skill.id} value={skill.id}>
                            {skill.name}
                          </option>
                        ))}
                      </Select>
                      <Button onClick={() => setIsSkillFormOpen(true)}>Add</Button>
                    </Flex>
                    <FormErrorMessage>{errors.skillIds}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Flex mb={"15px"} justifyContent={"end"}>
              <Button borderRadius={0} variant="outline" colorScheme="green" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="green" isLoading={isSubmitting}>
                {isAdd ? "Add" : "Update"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
});

export default ProjectForm;

import { Stack, FormControl, FormLabel, Input, FormErrorMessage, Select, Flex, Button, Textarea } from "@chakra-ui/react";
import { Formik, Field, FieldProps, Form, FormikHelpers } from "formik";
import { observer } from "mobx-react";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import useStore from "../../stores/useStore";
import * as Yup from "yup";
import SkillsPicker from "../../components/skills/SkillsPicker";

type ProjectFormPropsType = {
  initialValue: ProjectTypes.Project;
  handleSubmit: (values: ProjectTypes.Project, actions: FormikHelpers<ProjectTypes.Project>) => Promise<void>;
  onClose: () => void;
  isAdd?: boolean;
};

export const PROJECT_FORM_NAME = "project-form";

const ProjectForm = observer(({ initialValue, handleSubmit, onClose, isAdd }: ProjectFormPropsType) => {
  const store = useStore();
  const ProjectSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    timeCommitment: Yup.number().required("Time commitment is required"),
    status: Yup.string().required("Status is required"),
    organizationId: Yup.number(),
    skills: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          name: Yup.string().required()
        })
      )
      .required("Skill IDs are required")
  });

  return (
    <>
      <Formik initialValues={initialValue} validationSchema={ProjectSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, handleSubmit, errors, touched, values, setFieldValue }) => (
          <Form id={PROJECT_FORM_NAME} onSubmit={handleSubmit} noValidate>
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
                    <Textarea {...field} placeholder="Description" focusBorderColor="green.500" />
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
                {({ field }: FieldProps) => {
                  return (
                    <FormControl isInvalid={Boolean(errors.timeCommitment && touched.timeCommitment)}>
                      <FormLabel>Time commitment (hours)</FormLabel>
                      <Input {...field} type="number" />
                      <FormErrorMessage>{errors.timeCommitment}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>

              <SkillsPicker name="skills" />
            </Stack>
            <Flex mb={"15px"} justifyContent={"end"}>
              <Button borderRadius={0} variant="outline" colorScheme="green" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                borderRadius={0}
                form={PROJECT_FORM_NAME}
                type="submit"
                variant="solid"
                colorScheme="green"
                isLoading={isSubmitting}
              >
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

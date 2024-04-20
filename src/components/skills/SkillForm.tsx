import { Stack, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Formik, Field, FieldProps, FormikHelpers, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { SkillTypes } from "service/skill/SkillTypes";

type SkillFormPropsType = {
  initialValues: SkillTypes.Skill;
  handleSubmit: (values: SkillTypes.Skill, actions: FormikHelpers<SkillTypes.Skill>) => Promise<void>;
  formRef: React.Ref<FormikProps<SkillTypes.Skill>>;
};

export const SKILL_FOMR_NAME = "skill-form";

const SkillForm = ({ initialValues, handleSubmit, formRef }: SkillFormPropsType) => {
  const SkillSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
  });
  return (
    <Formik initialValues={initialValues} innerRef={formRef} validationSchema={SkillSchema} onSubmit={handleSubmit}>
      {({ handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit} noValidate id={SKILL_FOMR_NAME}>
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
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SkillForm;

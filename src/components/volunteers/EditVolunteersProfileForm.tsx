import { ReactNode } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  FormErrorMessage
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react";
import useStore from "../../stores/useStore";
import { VolunteerTypes } from "../../service/volunteer/VolunteerTypes";
import VolunteerApis from "../../service/volunteer/VolunteerApis";
import SkillsPicker from "../../components/skills/SkillsPicker";
import useToaster from "../../hooks/useToaster";

type EditVolunteerFormPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const EditVolunteerForm = observer(({ isOpen, onClose }: EditVolunteerFormPropsType) => {
  const store = useStore();
  const { handleError, handleSuccess } = useToaster();

  const handleSubmit = async (values: VolunteerTypes.Volunteer, actions: FormikHelpers<VolunteerTypes.Volunteer>) => {
    try {
      if (store?.currentVolunteer?.id) {
        const result = await VolunteerApis.editVolunteer(values.id, values);
        store.setCurrentVolunteer(result);
        actions.setSubmitting(false);
        onClose();
        handleSuccess("Volunteer updated successfully");
      }
    } catch (error) {
      console.log("error", error);
      handleError(error);
    }
  };

  const EditVolunteerFormSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone is required"),
    location: Yup.string().required("Location is required"),
    availabilityStartDate: Yup.date().required("Availability start date is required"),
    availabilityEndDate: Yup.date().required("Availability end date is required"),
    skills: Yup.array().required("At least one skill is required")
  });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Volunteer</DrawerHeader>
        {store.currentVolunteer && (
          <Formik
            initialValues={store.currentVolunteer}
            validationSchema={EditVolunteerFormSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <DrawerBody height={"80vh"} scrollBehavior={"smooth"}>
                  <Stack spacing={4} p="1rem">
                    <Field name="firstname">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={Boolean(errors.firstname && touched.firstname)}>
                          <FormLabel>First name</FormLabel>
                          <Input {...field} type="text" placeholder="First name" focusBorderColor="green.500" />
                          <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastname">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={Boolean(errors.lastname && touched.lastname)}>
                          <FormLabel>Last name</FormLabel>
                          <Input {...field} type="text" placeholder="Last name" focusBorderColor="green.500" />
                          <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phone">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={Boolean(errors.phone && touched.phone)}>
                          <FormLabel>Phone</FormLabel>
                          <Input {...field} type="tel" placeholder="Phone" focusBorderColor="green.500" />
                          <FormErrorMessage>{errors.phone}</FormErrorMessage>
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

                    <Field name="availabilityStartDate">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={Boolean(errors.availabilityStartDate && touched.availabilityStartDate)}>
                          <FormLabel>Availability start date</FormLabel>
                          <Input type="date" {...field} focusBorderColor="green.500" />
                          <FormErrorMessage>{errors.availabilityStartDate as ReactNode}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="availabilityEndDate">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={Boolean(errors.availabilityEndDate && touched.availabilityEndDate)}>
                          <FormLabel>Availability end date</FormLabel>
                          <Input type="date" {...field} focusBorderColor="green.500" />
                          <FormErrorMessage>{errors.availabilityEndDate as ReactNode}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <SkillsPicker name="skills" />
                  </Stack>
                </DrawerBody>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="green"
                  width="full"
                  isLoading={isSubmitting}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </DrawerContent>
    </Drawer>
  );
});

export default EditVolunteerForm;

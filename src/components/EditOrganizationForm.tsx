import React from "react";
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
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import useStore from "../stores/useStore";
import { OrganizationTypes } from "../service/organization/OrganizationTypes";
import OrganizationApis from "../service/organization/OrganizationApis";
import { observer } from "mobx-react";

type EditOrganizationFormPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const EditOrganizationForm = observer(({ isOpen, onClose }: EditOrganizationFormPropsType) => {
  const toast = useToast();

  const store = useStore();
  const handleSubmit = async (
    values: OrganizationTypes.Organization,
    actions: FormikHelpers<OrganizationTypes.Organization>
  ) => {
    if (store?.currentOrganization?.id) {
      const updateOrganizationProm = OrganizationApis.editOrganization(values, store?.currentOrganization?.id);
      const result = await updateOrganizationProm;
      toast.promise(updateOrganizationProm, {
          success: { title: 'Success', description: 'Organization Profile updated successfully' },
          error: { title: 'Error', description: 'Something wrong' },
          loading: { title: 'Loading', description: 'Please wait' },
        })
      store.setCurrentOrganization(result);
      actions.setSubmitting(false);
      onClose();
    }
  };

  const OrganizationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string(),
    website: Yup.string()
  });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Organization</DrawerHeader>
        {store.currentOrganization && (
          <Formik
            initialValues={store.currentOrganization}
            validationSchema={OrganizationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit} noValidate>
                <DrawerBody scrollBehavior={"smooth"} height={"80vh"}>
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

                    <Field name="website">
                      {({ field }: FieldProps) => (
                        <FormControl isInvalid={Boolean(errors.website && touched.website)}>
                          <FormLabel>Website url</FormLabel>
                          <Input {...field} type="url" placeholder="Website url" focusBorderColor="green.500" />
                          <FormErrorMessage>{errors.website}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
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

export default EditOrganizationForm;

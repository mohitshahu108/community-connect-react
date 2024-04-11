import { useState } from "react";
import {
 Flex, Stack, Avatar, Heading,
 Box, FormControl, InputGroup, Input,
 InputRightElement, Button, 
 InputLeftAddon, FormErrorMessage, 
 Card, Square, Link
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import routes from "../routes";

// Define validation schema using Yup
const SignupSchema = Yup.object().shape({
 firstname: Yup.string().required("Required"),
 lastname: Yup.string().required("Required"),
 email: Yup.string().email("Invalid email").required("Required"),
 password: Yup.string().min(8, "Password is too short - should be 8 chars minimum.").required("Required")
});

const OrganizationSignupForm = () => {
 const [showPassword, setShowPassword] = useState(false);

 const handleShowClick = () => setShowPassword(!showPassword);

 return (
    <Flex flexDirection="column" width="100wh" height="100vh" bg="gray.200" justifyContent="center" alignItems="center">
      <Card boxShadow="md" py={20}>
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Heading color="green.500" mb={4}>
            Organization Signup
          </Heading>
          <Avatar bg="green.500" />
          <Heading color="green.500">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Formik
              initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }: FormikHelpers<{ firstname: string; lastname: string; email: string; password: string }>) => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit} noValidate>
                 <Stack spacing={4} p="1rem">
                    <Field name="firstname">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={Boolean(form.errors.firstname && form.touched.firstname)}>
                          <InputGroup>
                            <InputLeftAddon pointerEvents="none">
                              <FaUserAlt color="gray.300" />
                            </InputLeftAddon>
                            <Input
                              {...field}
                              type="text"
                              name="firstname"
                              placeholder="First Name"
                              focusBorderColor="green.500"
                            />
                          </InputGroup>
                          <FormErrorMessage>{form.errors.firstname as string}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastname">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={Boolean(form.errors.lastname && form.touched.lastname)}>
                          <InputGroup>
                            <InputLeftAddon pointerEvents="none">
                              <FaUserAlt color="gray.300" />
                            </InputLeftAddon>
                            <Input
                              {...field}
                              type="text"
                              name="lastname"
                              placeholder="Last Name"
                              focusBorderColor="green.500"
                            />
                          </InputGroup>
                          <FormErrorMessage>{form.errors.lastname as string}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={Boolean(form.errors.email && form.touched.email)}>
                          <InputGroup>
                            <InputLeftAddon pointerEvents="none">
                              <FaUserAlt color="gray.300" />
                            </InputLeftAddon>
                            <Input
                              {...field}
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              focusBorderColor="green.500"
                            />
                          </InputGroup>
                          <FormErrorMessage>{form.errors.email as string}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field, form }: FieldProps) => (
                        <FormControl isInvalid={Boolean(form.errors.password && form.touched.password)}>
                          <InputGroup>
                            <InputLeftAddon
                              pointerEvents="none"
                              color="gray.300"
                              children={<FaLock color="gray.300" />}
                            />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Password"
                              focusBorderColor="green.500"
                            />

                            <InputRightElement width="4.5rem">
                              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.password as string}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorScheme="green"
                      width="full"
                      isLoading={isSubmitting}
                    >
                      Sign Up
                    </Button>
                 </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
        <Box>
          <Square>
            Already Registered?{" "}
            <Link as={RouterLink} to={routes.organization.login} color="green.500" >
              Log In 
            </Link>
          </Square>
        </Box>
      </Card>
    </Flex>
 );
};

export default OrganizationSignupForm;

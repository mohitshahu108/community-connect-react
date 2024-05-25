import { useState } from "react";
import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Box,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  InputLeftAddon,
  FormErrorMessage,
  Card,
  Square,
  Link as UILink
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../routes";
import UserApis from "../../service/user/UserApis";
import useStore from "../../stores/useStore";
import { useAuth } from "../../hooks/useAuth";
import AuthApis from "../../service/auth/AuthApis";
import useToaster from "../../hooks/useToaster";

// Define validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Password is too short - should be 4 chars minimum.").required("Required")
});

const VolunteerLoginForm = () => {
  const store = useStore();
  const auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { handleError, handleSuccess } = useToaster();

  const getCurrentUser = async () => {
    try {
      const result = await UserApis.currentUser();
      store.setCurrentUser(result);
      auth?.login(result);
      navigate(routes.volunteer.profile);
    } catch (error) {
      console.log("error", error);
      handleError(error);
    }
  };

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    try {
      const response = await AuthApis.authenticate(values);
      if (response.data) {
        store.saveToLocalStorage(response.data);
        await getCurrentUser();
        handleSuccess("Login Successful");
      }
      setSubmitting(false);
    } catch (error) {
      console.log("error", error);
      handleError(error, "Login Failed");
    }
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex flexDirection="column" width="100wh" height="100vh" bg="gray.200" justifyContent="center" alignItems="center">
      <Card boxShadow="md" py={20}>
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Heading color="blue.500" mb={4}>
            Volunteer Login
          </Heading>
          <Avatar bg="blue.500" />
          <Heading color="blue.500">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit} noValidate>
                  <Stack spacing={4} p="1rem">
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
                              placeholder="Email address"
                              focusBorderColor="blue.500"
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
                              focusBorderColor="blue.500"
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
                      colorScheme="blue"
                      width="full"
                      isLoading={isSubmitting}
                    >
                      Login
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
        <Box>
          <Square>
            New to us?{" "}
            <Link to={routes.volunteer.signup}>
              <UILink color={"blue.500"}>Sign Up</UILink>
            </Link>
          </Square>
        </Box>
      </Card>
    </Flex>
  );
};

export default VolunteerLoginForm;

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
  Link,
  InputLeftAddon,
  FormErrorMessage,
  Card,
  Square,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import routes from "./../routes";
import AuthApis from "../service/auth/AuthApis";
import UserApis from "../service/user/UserApis";
import useStore from "../stores/useStore";
import { useAuth } from "../hooks/useAuth";
import { observer } from "mobx-react";
import useToaster from "../hooks/useToaster";

// Define validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short - should be 8 chars minimum.").required("Required")
});

const OrganizationLoginForm = observer(() => {
  const store = useStore();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {handleError, handleSuccess} = useToaster();

  const getCurrentUser = async () => {
    try {
      const result = await UserApis.currentUser(); 
      store.setCurrentUser(result);
      auth?.login(result);
      navigate(routes.organization.profile);
    } catch (error) {
      console.log(error);
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
      }
      handleSuccess("Login Successful");
      setSubmitting(false);
    } catch (error) {
      console.log("error", error);
      handleError(error);
    }
  };
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex flexDirection="column" width="100wh" height="100vh" bg="gray.200" justifyContent="center" alignItems="center">
      <Card boxShadow="md" py={20}>
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Heading color="green.500" mb={4}>
            Organization Login
          </Heading>
          <Avatar bg="green.500" />
          <Heading color="green.500">Welcome</Heading>
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
            <RouterLink to={routes.organization.signup}>
              <Link color="green.500">Sign Up</Link>
            </RouterLink>
          </Square>
        </Box>
      </Card>
    </Flex>
  );
});

export default OrganizationLoginForm;

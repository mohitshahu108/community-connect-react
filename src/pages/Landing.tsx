import React from "react";
import { Box, Heading, Button, VStack, Card, CardBody, Text, Link, Flex, Square } from "@chakra-ui/react";
import { FaUser, FaBuilding } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import backgroundImage from "./../assets/images/premium_photo-1682092618317-9b50d60e6e0d.avif";
import routes from "./../routes";

const Landing = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      bgPosition="center"
      p="4"
    >
      <Square>
        <Box>
          <Heading as="h1" size="xl" color="white" textAlign="center" mb="8">
            Welcome to Community Connect
          </Heading>
          <Flex justifyContent="center" gap={4}>
            <Card width="400px" bg="white" boxShadow="lg" borderRadius="md" p={6}>
              <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <FaUser size="2em" color="blue.300" />
                <Text fontSize="xl" fontWeight="bold" mt="2" color="blue.300">
                  Login as Volunteer
                </Text>
                <Button as={RouterLink} to={routes.volunteer.login} mt="2" width="full" colorScheme="blue">
                  Login
                </Button>
                <Text mt={4} color="gray.500">
                  New to us?{" "}
                  <Link as={RouterLink} to={routes.volunteer.signup} color="blue.300">
                    Sign Up
                  </Link>
                </Text>
              </CardBody>
            </Card>
            <Card width="400px" bg="white" boxShadow="lg" borderRadius="md" p={6}>
              <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <FaBuilding size="2em" color="green.500" />
                <Text fontSize="xl" fontWeight="bold" mt="2" color="green.500">
                  Login as Organization
                </Text>
                <Button as={RouterLink} to={routes.organization.login} mt="2" width="full" colorScheme="green">
                  Login
                </Button>
                <Text mt={4} color="gray.500">
                  New to us?{" "}
                  <Link as={RouterLink} to={routes.organization.signup} color="green.500">
                    Sign Up
                  </Link>
                </Text>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      </Square>
    </Box>
  );
};

export default Landing;

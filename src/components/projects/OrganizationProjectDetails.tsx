import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectApis from "../../service/Project/ProjectApis";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import { Box, Breadcrumb, BreadcrumbItem, Button, Heading, Tooltip, useToast, VStack } from "@chakra-ui/react";
import { FaCheckCircle, FaHandPointRight, FaTimesCircle } from "react-icons/fa";
import routes from "../../routes";
import ApplicationApis from "../../service/application/ApplicationApis";
import store from "../../stores/store";
import { observer } from "mobx-react";
import { ApplicationStatuses } from "../../service/application/ApplicationTypes";
import useToaster from "../../hooks/useToaster";

const OrganizationProjectDetails = observer(() => {
  const { handleError, handleSuccess } = useToaster();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = React.useState<ProjectTypes.Project | null>(null);

  const getProjectDetails = async () => {
    // get project details from server
    const getProjectProm = ProjectApis.getProjectById(Number(id));
    const project = await getProjectProm;
    setProject(project);
  };

  const approveApplication = async (applicationId: number) => {
    try {
      if (project?.id) {
        const result = await ApplicationApis.approveApplication(applicationId);
        handleSuccess("Application Approved");
        getProjectDetails();
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const rejectApplication = async (applicationId: number) => {
    try {
      if (project?.id) {
        const result = await ApplicationApis.rejectApplication(applicationId);
        handleSuccess("Application Rejected");
        getProjectDetails();
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <Box w={"100%"} display="flex" flexDirection={"column"} paddingLeft={"5rem"} paddingRight={"5rem"}>
      <Box marginTop={"10px"}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={routes.volunteer.project.list}> Project </Link>
          </BreadcrumbItem>

          {id && (
            <BreadcrumbItem isCurrentPage>
              <Link to={routes.volunteer.project.details(id)}>{project?.name}</Link>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Box>
      <Box display={"flex"} marginTop={"10px"}>
        <Box padding="0px 10px" flex={1}>
          <VStack>
            <Box w="100%" display={"flex"}>
              <Box flex="1">Name</Box>
              <Box flex="1">{project?.name}</Box>
            </Box>
            <Box w="100%" marginTop={"4px"} display={"flex"}>
              <Box flex="1">Location</Box>
              <Box flex="1">{project?.location}</Box>
            </Box>
            <Box w="100%" marginTop={"4px"} display={"flex"}>
              <Box flex="1">Time Commitment</Box>
              <Box flex="1">{project?.timeCommitment}</Box>
            </Box>
            <Box w="100%" marginTop={"4px"} display={"flex"}>
              <Box flex="1">Status</Box>
              <Box flex="1">{project?.status}</Box>
            </Box>
            <Box w="100%" marginTop={"4px"} display={"flex"}>
              <Box flex="1">Preffered Skills</Box>
              <Box flex="1">{project?.skills.map((skill) => skill.name).join(", ")}</Box>
            </Box>

            <Box w="100%" marginTop={"4px"} display={"flex"}>
              <Box flex="1">Volunteers</Box>
              <Box flex="1">
                {Boolean(project?.volunteers?.length)
                  ? project?.volunteers
                      .map((volunteer) => {
                        return volunteer.firstname + " " + volunteer.lastname;
                      })
                      .join(",")
                  : "---"}
              </Box>
            </Box>
          </VStack>
        </Box>
        <Box flex={1}>
          <Box mb={"4px"}>
            <Heading size={"xl"}>Applications</Heading>
          </Box>

          <Box mb="16px">
            <Box mb={"4px"}>
              <Heading size={"md"}>Pendind Applications</Heading>
            </Box>

            {project?.applications
              .filter((application) => application.status === ApplicationStatuses.PENDING)
              .map((application) => {
                return (
                  <Box
                    key={application.id}
                    backgroundColor="yellow.100"
                    padding="8px"
                    borderRadius="4px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Box fontSize="lg" fontWeight="bold">
                        {application.volunteer.firstname + " " + application.volunteer.lastname}
                      </Box>
                      <Box fontSize="sm" color="gray.500">
                        {application.status}
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        variant="outline"
                        colorScheme="teal"
                        size="sm"
                        leftIcon={<FaCheckCircle color="teal.500" size="20px" />}
                        onClick={() => {
                          if (application.id) {
                            approveApplication(application.id);
                          }
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        marginLeft={"4px"}
                        size="sm"
                        leftIcon={<FaTimesCircle color="red.500" size="20px" />}
                        onClick={() => {
                          if (application.id) {
                            rejectApplication(application.id);
                          }
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Box>
                );
              })}
          </Box>

          <Box mb={"16px"}>
            <Box mb={"4px"}>
              <Heading size={"md"}>Approved Applications</Heading>
            </Box>

            {project?.applications
              .filter((application) => application.status === ApplicationStatuses.APPROVED)
              .map((application) => {
                return (
                  <Box
                    display={"flex"}
                    padding={"8px"}
                    borderRadius={"4px"}
                    justifyContent={"space-between"}
                    backgroundColor={"green.100"}
                  >
                    <Box>{application.volunteer.firstname + " " + application.volunteer.lastname}</Box>
                    <Box>{application.status}</Box>
                  </Box>
                );
              })}
          </Box>

          <Box mb={"16px"}>
            <Box mb={"4px"}>
              <Heading size={"md"}>Rejected Applications</Heading>
            </Box>

            {project?.applications
              .filter((application) => application.status === ApplicationStatuses.REJECTED)
              .map((application) => {
                return (
                  <Box
                    display={"flex"}
                    padding={"8px"}
                    borderRadius={"4px"}
                    justifyContent={"space-between"}
                    backgroundColor={"red.100"}
                  >
                    <Box>{application.volunteer.firstname + " " + application.volunteer.lastname}</Box>
                    <Box>{application.status}</Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
});

export default OrganizationProjectDetails;

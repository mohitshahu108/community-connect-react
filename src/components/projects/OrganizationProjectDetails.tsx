import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectApis from "../../service/Project/ProjectApis";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import { Box, Breadcrumb, BreadcrumbItem, Button, Tooltip, useToast, VStack } from "@chakra-ui/react";
import { FaHandPointRight } from "react-icons/fa";
import routes from "../../routes";
import ApplicationApis from "../../service/application/ApplicationApis";
import store from "../../stores/store";
import { observer } from "mobx-react";
import { ApplicationStatuses } from "../../service/application/ApplicationTypes";

const OrganizationProjectDetails = observer(() => {
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = React.useState<ProjectTypes.Project | null>(null);

  const getProjectDetails = async () => {
    // get project details from server
    const getProjectProm = ProjectApis.getProjectById(Number(id));
    const project = await getProjectProm;
    setProject(project);
  };

  const onApplyOnProject = async (project: ProjectTypes.Project) => {
    try {
      if (project?.id && store.currentVolunteer?.id) {
        const applicationProm = ApplicationApis.apply({
          projectId: project.id,
          volunteerId: store.currentVolunteer?.id,
          status: ApplicationStatuses.PENDING
        });
        const result = await applicationProm;
        toast.promise(applicationProm, {
          success: { title: "Success", description: "Applied on project" },
          error: { title: "Error", description: "Something wrong" },
          loading: { title: "Loading", description: "Please wait" }
        });

        getProjectDetails();
      }
    } catch (error) {
      console.log(error);
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
          
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
});

export default OrganizationProjectDetails;

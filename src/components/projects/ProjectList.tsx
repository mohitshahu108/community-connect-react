import { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { Box, Button, Flex, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import ProjectApis from "../../service/Project/ProjectApis";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import useStore from "../../stores/useStore";
import AddProjectForm from "../AddProjectForm";
import { observer } from "mobx-react";
import { FaEdit, FaHandPointRight, FaTrash } from "react-icons/fa";
import EditProject from "./EditProject";
import { Link } from "react-router-dom";
import routes from "../../routes";
import ApplicationApis from "../../service/application/ApplicationApis";
import { ApplicationStatuses, ApplicationTypes } from "../../service/application/ApplicationTypes";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
const ProjectList = observer(() => {
  const toast = useToast();
  const store = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProjectId, setEditProjectId] = useState<number>();
  const projectList: ProjectTypes.ProjectList = store.listProject;
  
  const getProjectList = useCallback(async () => {
    try {
      const result = await ProjectApis.getProjectList();
      store.setProjectList(result);
    } catch (error) {
      console.log(error);
    }
  }, [store]);

  const onApplyOnProject = async (project: ProjectTypes.Project) => {
    try {
      if (project?.id && store.currentVolunteer?.id) {
        const applicationProm = ApplicationApis.apply({
          projectId: project.id,
          volunteerId: store.currentVolunteer?.id,
          status: ApplicationStatuses.PENDING
        });
        toast.promise(applicationProm, {
          success: { title: "Success", description: "Applied on project" },
          error: { title: "Error", description: "Something wrong" },
          loading: { title: "Loading", description: "Please wait" }
        });
        const result = await applicationProm; 
        getProjectList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "name",
      headerName: "Name",
      checkboxSelection: true,
      cellRenderer: (params: any) => {
        return (
          <Link
            to={
              store.isVolunteer
                ? routes.volunteer.project.details(params.data.id)
                : routes.organization.project.details(params.data.id)
            }
          >
            {params.data.name}
          </Link>
        );
      }
    },
    {
      field: "location",
      headerName: "Location"
    },
    {
      field: "timeCommitment",
      headerName: "Time Commitment (hours)"
    },
    {
      field: "status",
      headerName: "Status"
    },
    {
      field: "organization.name",
      headerName: "Organization"
    },
    {
      field: "skills",
      headerName: "Skills",
      cellRenderer: useCallback(({ data }: any) => {
        return data?.skills?.map((item: { id: number; name: string }) => item.name).join(", ");
      }, []),
      filterValueGetter: (params: any) => {
        return params.data?.skills?.map((item: any) => item.name).join(", ");
      }
    },
    {
      field: "volunteers",
      headerName: "Volunteers",
      cellRenderer: useCallback(({ data }: any) => {
        return data?.volunteers?.map((volunteer: { id: number, firstname: string, lastname: string }) => {
          return `${volunteer.firstname} ${volunteer.lastname}`;
        }).join(", ");
      }, []),
      filterValueGetter: (params: any) => {
        return params.data?.volunteers?.map((volunteer: any) => volunteer.firstname + " " + volunteer.lastname).join(", ");
      }
    },
    {
      field: "action",
      headerName: "Action",
      cellRenderer: useCallback(
        ({ data }: any) => {
          const onEditClick = async () => {
            setEditProjectId(data.id);
            setIsEditOpen(true);
          };

          const onDeleteClick = async () => {
            await ProjectApis.deleteProject(data.id);
            await getProjectList();
          };

          const isAlreadyApplied = data?.applications?.findIndex((app: ApplicationTypes.Application) => app.volunteerId === store?.currentVolunteer?.id) !== -1;
          const isAlreadyAppliedApproved = data?.volunteers?.findIndex((vol: any) => vol.id === store?.currentVolunteer?.id) !== -1;

          return (
            <Flex alignItems="center" bg="transparent" _hover={{ bg: "transparent" }}>
              {store.isOrganization && (
                <>
                  <IconButton
                    size="sm"
                    aria-label="edit"
                    border={"none"}
                    icon={<FaEdit />}
                    color="green.500"
                    variant="outline"
                    onClick={onEditClick}
                  />
                  <IconButton
                    size="sm"
                    border={"none"}
                    ml={2}
                    aria-label="delete"
                    color="green.500"
                    icon={<FaTrash />}
                    variant="outline"
                    onClick={onDeleteClick}
                  />
                </>
              )}

              {store.isVolunteer && !isAlreadyAppliedApproved && !isAlreadyApplied && (
                <Tooltip label="Apply to contribute in project" hasArrow placement="top">
                  <IconButton
                    size="sm"
                    aria-label="apply"
                    border={"none"}
                    icon={<FaHandPointRight />}
                    color="blue"
                    ml={2}
                    variant="outline"
                    onClick={() => onApplyOnProject(data)}
                  />
                </Tooltip>
              )}
            </Flex>
          );
        },
        [store]
      )
    }
  ]);

  // Fetch data & update rowData state
  useEffect(() => {
    getProjectList();
  }, [getProjectList]);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      floatingFilter: true
    };
  }, []);

  const onAddFormClose = async () => {
    await getProjectList();
    setIsAddOpen(false);
  };

  const onEditClose = async () => {
    await getProjectList();
    setIsEditOpen(false);
  };

  return (
    <Box>
      {store.isOrganization && (
        <Box my={4}>
          {isEditOpen && editProjectId && (
            <EditProject projectId={editProjectId} isOpen={isEditOpen} onClose={onEditClose} />
          )}
          {isAddOpen && <AddProjectForm isOpen={isAddOpen} onClose={onAddFormClose} />}
        </Box>
      )}

      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="calc(100vh - 4rem)">
        <Box width="5rem" />
        <Box width="70vw" height="100%" py={4} my={4} style={{ flexGrow: 1 }}>
          <Box>
            {store.isOrganization && (
              <Flex>
                <Button
                  type="button"
                  borderRadius={0}
                  variant="solid"
                  colorScheme="green"
                  onClick={() => setIsAddOpen(true)}
                >
                  Add Project
                </Button>
              </Flex>
            )}
          </Box>
          <div className="ag-theme-quartz" style={{ height: "80%", marginTop: 4 }}>
            <AgGridReact rowData={projectList} columnDefs={colDefs} defaultColDef={defaultColDef} pagination={true} />
          </div>
        </Box>
        <Box width="5rem" />
      </Box>
    </Box>
  );
});

export default ProjectList;

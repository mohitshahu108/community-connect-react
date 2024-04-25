import { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { Box, Button, Center, Flex, IconButton, Toast } from "@chakra-ui/react";
import ProjectApis from "../../service/Project/ProjectApis";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import useStore from "../../stores/useStore";
import AddProjectForm from "../AddProjectForm";
import { observer } from "mobx-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProject from "./EditProject";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
const ProjectList = observer(() => {
  const store = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProjectId, setEditProjectId] = useState<number>();
  const projectList: ProjectTypes.ProjectList = store.listProject;

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "name",
      headerName: "Name",
      checkboxSelection: true
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
      field: "organizationId",
      headerName: "Organization ID",
      editable: false
    },
    {
      field: "skills",
      headerName: "Skills",
      cellRenderer: useCallback(({ data }: any) => {
        return data?.skills?.map((item: { id: number; name: string }) => item.name).join(", ");
      }, [])
    },
    {
      field: "volunteers",
      headerName: "Volunteers"
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
              {store.isVolunteer && (
                <Button
                  size="sm"
                  colorScheme="blue"
                  ml={2}
                  aria-label="apply"
                  onClick={() => {
                    Toast({
                      title: "Applying...",
                      status: "info",
                      duration: 2000,
                      isClosable: true
                    });
                  }}
                >
                  Apply
                </Button>
              )}
            </Flex>
          );
        },
        [store]
      )
    }
  ]);

  const getProjectList = useCallback(async () => {
    try {
      const result = await ProjectApis.getProjectList();
      store.setProjectList(result);
    } catch (error) {
      console.log(error);
    }
  }, [store]);

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
    <>
      {store.isOrganization && (
        <>
          {isEditOpen && editProjectId && (
            <EditProject projectId={editProjectId} isOpen={isEditOpen} onClose={onEditClose} />
          )}
          {isAddOpen && <AddProjectForm isOpen={isAddOpen} onClose={onAddFormClose} />}
        </>
      )}

      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="calc(100vh - 4rem)">
        <Box width="5rem" />
        <Box width="70vw" height="100%" py={4} style={{ flexGrow: 1 }}>
          {store.isOrganization && (
            <Center>
              <Button
                type="button"
                borderRadius={0}
                variant="solid"
                colorScheme="green"
                onClick={() => setIsAddOpen(true)}
              >
                Add Project
              </Button>
            </Center>
          )}
          <div className="ag-theme-quartz" style={{ height: "80%" }}>
            <AgGridReact rowData={projectList} columnDefs={colDefs} defaultColDef={defaultColDef} pagination={true} />
          </div>
        </Box>
        <Box width="5rem" />
      </Box>
    </>
  );
});

export default ProjectList;

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Square } from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { observer } from "mobx-react";
import React from "react";
import ProjectApis from "../../service/Project/ProjectApis";
import { ProjectTypes } from "../../service/Project/ProjectTypes";
import ProjectForm from "./ProjectForm";

type EditProjectFormPropsType = {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
};

const EditProject = observer(({ isOpen, onClose, projectId }: EditProjectFormPropsType) => {
  const [project, setProject] = React.useState<ProjectTypes.Project | null>(null);

  React.useEffect(() => {
    const fetchProject = async () => {
      const result = await ProjectApis.getProjectById(projectId);
      setProject(result);
    };

    if (!project && projectId) {
      fetchProject();
    }
  }, [projectId, project]);

  const handleSubmit = async (values: ProjectTypes.Project, actions: FormikHelpers<ProjectTypes.Project>) => {
    console.log(values);
    const result = await ProjectApis.updateProject(projectId, values);
    actions.setSubmitting(false);
    onClose();
  };

  if (!project) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalOverlay>
          <ModalContent>
            <Square>
              <CircularProgress isIndeterminate />
            </Square>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProjectForm initialValue={project} handleSubmit={handleSubmit} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default EditProject;

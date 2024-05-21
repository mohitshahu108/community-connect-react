import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import ProjectApis from "../service/Project/ProjectApis";
import { ProjectTypes } from "../service/Project/ProjectTypes";
import { observer } from "mobx-react";
import ProjectForm from "./projects/ProjectForm";
import useStore from "./../stores/useStore";

type AddProjectFormPropsType = {
  isOpen: boolean;
  onClose: () => void;
};

const AddProjectForm = observer(({ isOpen, onClose }: AddProjectFormPropsType) => {
  const store = useStore();
  const toast = useToast();
  const handleSubmit = async (values: ProjectTypes.Project, actions: FormikHelpers<ProjectTypes.Project>) => {
    if(store.currentOrganization?.id){
      values.organizationId = store.currentOrganization?.id;
    }
    const addProjectProm = ProjectApis.addProject(values); 
    const result = await addProjectProm;
    toast.promise(addProjectProm, {
      success: { title: "Success", description: "Project Created" },
      error: { title: "Error", description: "Something wrong" },
      loading: { title: "Loading", description: "Please wait" }
    });
    actions.setSubmitting(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProjectForm
              isAdd
              initialValue={
                {
                  id: null,
                  name: "",
                  description: "",
                  location: "",
                  timeCommitment: 0,
                  status: "",
                  organizationId: store.currentOrganization?.id,
                  skills: [],
                  volunteerIds: []
                } as ProjectTypes.Project
              }
              handleSubmit={handleSubmit}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default AddProjectForm;

import { useToast } from "@chakra-ui/react";

const useToaster = () => {
  const toast = useToast();
  const handleError = (error: any, message: string = "Something went wrong.") => {
    if (error.response) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true
    });
  };

  const handleWarning = (message: string) => {
    toast({
      title: "Warning",
      description: message,
      status: "warning",
      duration: 3000,
      isClosable: true
    });
  } 

  return { handleError, handleSuccess, handleWarning };
};

export default useToaster;
import { Alert, Fade } from "@mui/material";

interface validationProps {
  visible: boolean;
  message: string;
  alertType: "error" | "success";
}

const Validation = ({ alertType, message, visible }: validationProps) => {
  return (
    <>
      <Fade in={visible} timeout={250}>
        <Alert
          severity={alertType}
          variant="filled"
          sx={{ position: "absolute", zIndex: 10, width: "10rem" }}
        >
          {message}
        </Alert>
      </Fade>
    </>
  );
};

export default Validation;

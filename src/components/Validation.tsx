import { Alert, Fade } from "@mui/material";

interface validationProps {
  success: boolean;
  successMessage: string;
  failure: boolean;
  failureMessage: string;
}

const Validation = ({
  success,
  successMessage,
  failure,
  failureMessage,
}: validationProps) => {
  return (
    <>
      {success ? (
        <Fade in={success} timeout={250}>
          <Alert
            severity="success"
            variant="filled"
            sx={{ position: "absolute" }}
          >
            {successMessage}
          </Alert>
        </Fade>
      ) : null}
      {failure ? (
        <Fade in={failure} timeout={250}>
          <Alert
            severity="error"
            variant="filled"
            sx={{ position: "absolute" }}
          >
            {failureMessage}
          </Alert>
        </Fade>
      ) : null}
    </>
  );
};

export default Validation;
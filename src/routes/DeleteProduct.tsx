import { useState, useEffect } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";
import HomeButton from "../components/HomeButton";
import Validation from "../components/Validation";

const DeleteProduct = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);

  useEffect(() => {
    if (success || failure) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setFailure(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, failure]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        height: "100vh",
      }}
    >
      <Typography variant="h3">Delete product</Typography>
      <TextField label="Product id"></TextField>
      <Button variant="contained">Delete</Button>
      <HomeButton></HomeButton>
      <Validation
        success={success}
        successMessage="Deleted product succesfully"
        failure={failure}
        failureMessage="Deletion unsuccessful"
      ></Validation>
    </Box>
  );
};

export default DeleteProduct;

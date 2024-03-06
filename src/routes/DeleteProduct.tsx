import { useState, useEffect, ChangeEvent } from "react";
import { deleteProduct } from "../services/productsService";
import { Box, Typography, TextField, Button } from "@mui/material";
import HomeButton from "../components/HomeButton";
import Validation from "../components/Validation";

const DeleteProduct = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  useEffect(() => {
    if (success || failure) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setFailure(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, failure]);

  const handleDelete = async (
    event: React.FormEvent<HTMLFormElement>,
    productId: number
  ) => {
    event.preventDefault();
    try {
      await deleteProduct(productId);
      setSuccess(true);
    } catch(error) {
      setFailure(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteId(Number(event.target.value));
  };

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
      component={"form"}
      onSubmit={(event) => handleDelete(event, deleteId)}
    >
      <Typography variant="h3">Delete product</Typography>
      <TextField
        label="Product id"
        type="number"
        inputProps={{ min: 0 }}
        onChange={handleChange}
      ></TextField>
      <Button variant="contained" type="submit">
        Delete
      </Button>
      <HomeButton />
      <Validation
        success={success}
        successMessage="Deletion succeeded"
        failure={failure}
        failureMessage="Deletion unsuccessful"
      />
    </Box>
  );
};

export default DeleteProduct;

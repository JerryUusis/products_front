import { useState, useEffect } from "react";
import { deleteProduct } from "../services/productsService";
import { Box, Typography, TextField, Button } from "@mui/material";
import HomeButton from "../components/HomeButton";
import Validation from "../components/Validation";

const DeleteProduct = () => {
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number>(0);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alertType]);

  const handleDelete = async (
    event: React.FormEvent<HTMLFormElement>,
    productId: number
  ) => {
    event.preventDefault();
    try {
      await deleteProduct(productId);
      setVisible(true);
      setAlertType("success");
      setMessage(`Succesfully deleted product with id ${productId}`);
    } catch (error: any) {
      setVisible(true);
      setAlertType("error");
      setMessage(error.message);
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
        required
      />
      <Button variant="contained" type="submit">
        Delete
      </Button>
      <HomeButton />
      <Validation alertType={alertType} visible={visible} message={message} />
    </Box>
  );
};

export default DeleteProduct;

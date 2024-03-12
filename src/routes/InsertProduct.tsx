import { useEffect, useState } from "react";
import { getKeys, insertProduct } from "../services/productsService";
import { Box, TextField, Typography, Button } from "@mui/material";
import Validation from "../components/Validation";
import HomeButton from "../components/HomeButton";
import { ProductType } from "../types/product";

const InsertProduct = () => {
  const [keys, setKeys] = useState<string[]>();
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [formdata, setFormData] = useState<ProductType>({
    productId: 0,
    name: "",
    model: "",
    type: "",
    price: 0,
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const keyData = await getKeys();
        setKeys(keyData);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleChange =
    (key: keyof ProductType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await insertProduct({
        productId: formdata.productId,
        name: formdata.name,
        model: formdata.model,
        type: formdata.type,
        price: formdata.price,
      });
      setVisible(true);
      setMessage("Product added");
      setAlertType("success");
    } catch (error: any) {
      setMessage(error.message);
      setVisible(true);
      setAlertType("error");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        height: "100vh",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">Insert new product</Typography>
      <Validation alertType={alertType} message={message} visible={visible} />
      {keys?.map((key) => {
        return (
          <TextField
            key={key}
            label={key}
            type={key === "price" || key === "productId" ? "number" : "text"}
            sx={{ textTransform: "capitalize" }}
            value={formdata[key as keyof ProductType]}
            onChange={handleChange(key as keyof ProductType)}
            inputProps={
              key === "price"
                ? { step: "0.01", min: 0 }
                : key === "productId"
                ? { step: "1", min: 0 }
                : {}
            }
            required
          />
        );
      })}
      <Button variant="contained" type="submit">
        Send
      </Button>
      <HomeButton />
    </Box>
  );
};

export default InsertProduct;

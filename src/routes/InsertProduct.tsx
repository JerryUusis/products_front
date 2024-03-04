import { useEffect, useState } from "react";
import { getKeys } from "../services/productsService";
import { Box, TextField, Typography, Button, Alert, Fade } from "@mui/material";
import { insertProduct } from "../services/productsService";
import HomeButton from "../components/HomeButton";
import { ProductType } from "../types/product";

const InsertProduct = () => {
  const [keys, setKeys] = useState<string[]>();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [formdata, setFormData] = useState<ProductType>({
    productId: 0,
    name: "",
    model: "",
    type: "",
    price: 0,
  });

  useEffect(() => {
    try {
      getKeys().then((keydata) => {
        setKeys(keydata);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (success || failure) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setFailure(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, failure]);

  const handleChange =
    (key: keyof ProductType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        key === "price" || key === "productId"
          ? parseFloat(event.target.value)
          : event.target.value;

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
      setSuccess(true);
    } catch (error) {
      setFailure(true);
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
      {success ? (
        <Fade in={success} timeout={250}>
          <Alert
            severity="success"
            variant="filled"
            sx={{ position: "absolute" }}
          >
            Post succesful!
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
            Product ID already exists
          </Alert>
        </Fade>
      ) : null}
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
              key === "price" || key === "productId" ? { min: 0 } : { min: "" }
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

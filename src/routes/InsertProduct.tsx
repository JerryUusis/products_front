import { useEffect, useState } from "react";
import { getKeys } from "../services/productsService";
import { Box, TextField, Typography, Button } from "@mui/material";

const InsertProduct = () => {
  const [keys, setKeys] = useState<string[]>();
  const [formdata, setFormData] = useState<Record<string, string | number>>({});

  useEffect(() => {
    try {
      getKeys().then((keydata) => {
        setKeys(keydata);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        key === "productId" || key || "price"
          ? parseFloat(event.target.value)
          : event.target.value;

      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
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
    >
      <Typography variant="h4">Insert new product</Typography>
      {keys?.map((key) => {
        return (
          <TextField
            sx={{ textTransform: "capitalize" }}
            key={key}
            label={key}
            type={key === "price" || key === "productId" ? "number" : "text"}
            required
            value={formdata[key] || ""}
            onChange={handleChange(key)}
          />
        );
      })}
      <Button variant="contained">Send</Button>
    </Box>
  );
};

export default InsertProduct;

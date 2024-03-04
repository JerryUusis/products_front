import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { getAll, getOne } from "../services/productsService";
import { ProductType } from "../types/product";

const UpdateProduct = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [searchId, setSearchId] = useState<number>();

  useEffect(() => {
    try {
      getAll().then((data) => {
        const productIds = data.map((product: ProductType) =>
          product.productId.toString()
        );
        setOptions(productIds);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number,
    ) => {
        setSearchId(Number(value))
  };

  const getValuesById = async (productId: number) => {
    const values = getOne(productId)
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
      <Typography variant="h4">Update product</Typography>
      <Autocomplete
        onChange={handleChange}
        options={options}
        renderInput={(params) => <TextField {...params} label="productId" />}
      ></Autocomplete>
      <Button variant="contained" onClick={() => getValuesById(searchId)}>
        Select ID
      </Button>
      <TextField label={"Name"}></TextField>
      <TextField label={"Model"}></TextField>
      <TextField label={"Type"}></TextField>
      <TextField label={"Price"}></TextField>
      <Button variant="contained">Update</Button>
    </Box>
  );
};

export default UpdateProduct;

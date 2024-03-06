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
  const [searchId, setSearchId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductType[]>([
    {
      productId: 0,
      name: "",
      model: "",
      type: "",
      price: 0,
    },
  ]);

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
    value: number
  ) => {
    setSearchId(Number(value));
  };

  const getValuesById = async (productId: number) => {
    const values = await getOne(productId);
    setSelectedProduct(values);
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
      <TextField
        label={"Name"}
        value={selectedProduct ? selectedProduct[0].name : null}
      />
      <TextField
        label={"Model"}
        value={selectedProduct ? selectedProduct[0].model : null}
      />
      <TextField
        label={"Type"}
        value={selectedProduct ? selectedProduct[0].type : null}
      />
      <TextField
        label={"Price"}
        value={selectedProduct ? selectedProduct[0].price : null}
      />
      <Button variant="contained">Update</Button>
    </Box>
  );
};

export default UpdateProduct;

import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Alert,
} from "@mui/material";
import {
  getAll,
  getOne,
  getKeys,
  updateProduct,
} from "../services/productsService";
import { ProductType } from "../types/product";
import Validation from "../components/Validation";

const UpdateProduct = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [searchId, setSearchId] = useState<number>(0);
  const [keys, setKeys] = useState<string[]>([]);
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

  useEffect(() => {
    getKeys()
      .then((fetchKeys) => {
        setKeys(fetchKeys);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleUpdate = (updatedProduct: ProductType, productId: number) => {
    try {
      updateProduct(updatedProduct, productId);
      setSuccess(true);
    } catch {
      setFailure(true);
    }
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setSearchId(Number(value ? value : null));
  };

  const getValuesById = async (
    event: FormEvent<HTMLFormElement>,
    productId: number
  ) => {
    event.preventDefault();
    try {
      const values = await getOne(productId);
      setSelectedProduct(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFieldChange = (field: keyof ProductType, value: string) => {
    setSelectedProduct((prevSelectedProduct) => {
      const updatedProduct = { ...prevSelectedProduct[0], [field]: value };
      return [updatedProduct];
    });
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
      <Validation
        success={success}
        successMessage="Update successful"
        failure={failure}
        failureMessage="Update failed"
      />
      <Typography variant="h4">Update product</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          my: "1rem",
        }}
        component={"form"}
        onSubmit={(event) => getValuesById(event, searchId)}
      >
        <Autocomplete
          onChange={handleChange}
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="Product Id" required />
          )}
        />
        <Button variant="contained" type="submit">
          Select ID
        </Button>
      </Box>
      {keys.slice(1).map((key) => {
        return (
          <TextField
            sx={{ textTransform: "capitalize" }}
            key={key}
            label={key}
            value={
              selectedProduct
                ? selectedProduct[0][key as keyof ProductType]
                : ""
            }
            onChange={(event) =>
              handleFieldChange(key as keyof ProductType, event.target.value)
            }
          />
        );
      })}
      <Button
        variant="contained"
        onClick={() =>
          handleUpdate(selectedProduct[0], selectedProduct[0].productId)
        }
      >
        update values
      </Button>
    </Box>
  );
};

export default UpdateProduct;

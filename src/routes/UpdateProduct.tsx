import { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import {
  getAll,
  getOne,
  getKeys,
  updateProduct,
} from "../services/productsService";
import { ProductType } from "../types/product";
import Validation from "../components/Validation";
import HomeButton from "../components/HomeButton";

const UpdateProduct = () => {
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
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

  // Get product ID's after loading the page
  useEffect(() => {
    const getProductIds = async () => {
      try {
        const response = await getAll();
        const productIds = response.map((product: ProductType) =>
          product.productId.toString()
        );
        setOptions(productIds);
      } catch (error) {
        console.log(error);
      }
    };
    getProductIds();
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
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleUpdate = (updatedProduct: ProductType, productId: number) => {
    try {
      if (!productId) {
        throw new Error("Bad product Id");
      }
      updateProduct(updatedProduct, productId);
      setVisible(true);
      setMessage("Updated succesfully");
      setAlertType("success");
      resetFormData();
    } catch (error: any) {
      setMessage(error.message);
      setVisible(true);
      setAlertType("error");
    }
  };

  const resetFormData = () => {
    setSelectedProduct([
      {
        productId: 0,
        name: "",
        model: "",
        type: "",
        price: 0,
      },
    ]);
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      setSearchId(0);
    }
    setSearchId(Number(value));
    resetFormData();
  };

  const getValuesById = async (
    event: FormEvent<HTMLFormElement>,
    productId: number
  ) => {
    event.preventDefault();
    try {
      const values = await getOne(productId);
      setSelectedProduct(values);
    } catch (error: any) {
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
        gap: "1rem",
        height: "100vh",
      }}
    >
      <Validation message={message} visible={visible} alertType={alertType} />
      <Typography variant="h4">Update product</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
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
      {keys?.slice(1).map((key) => {
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
      <HomeButton />
    </Box>
  );
};

export default UpdateProduct;

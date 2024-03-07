import { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";
import Validation from "../components/Validation";
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getOne, getKeys } from "../services/productsService";
import { ProductType } from "../types/product";

const GetProduct = () => {
  const [searchId, setSearchId] = useState<number>(0);
  const [foundProduct, setFoundProduct] = useState<ProductType | null>();
  const [keys, setKeys] = useState<string[]>();
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  }, [visible]);

  useEffect(() => {
    getKeys()
      .then((fetchKeys) => {
        setKeys(fetchKeys);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      const item = await getOne(searchId);
      setFoundProduct(item[0]);
    } catch (error: any) {
      setAlertType("error");
      setMessage(error.message);
      setVisible(true);
    }
  };

  const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    setSearchId(inputValue);
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
      <Validation alertType={alertType} message={message} visible={visible} />
      <Typography variant="h4">Get product by id</Typography>
      <TextField
        label="Product id"
        type="number"
        inputProps={{ min: 0 }}
        onChange={handleId}
        required
        defaultValue={searchId}
      />
      <Button variant="contained" onClick={() => handleSearch()}>
        Get product
      </Button>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {keys?.map((item) => {
                  return (
                    <TableCell key={item} sx={{ textTransform: "capitalize" }}>
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {foundProduct ? (
                <TableRow>
                  <TableCell>{foundProduct.productId}</TableCell>
                  <TableCell>{foundProduct.name}</TableCell>
                  <TableCell>{foundProduct.model}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {foundProduct.type}
                  </TableCell>
                  <TableCell>{foundProduct.price}</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={keys?.length} sx={{textAlign:"center"}}>No product found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <HomeButton />
    </Box>
  );
};

export default GetProduct;

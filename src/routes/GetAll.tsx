import { useEffect, useState } from "react";
import { getAll, getKeys } from "../services/productsService";
import { ProductType } from "../types/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const GetAll = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [data, setData] = useState<ProductType[]>([]);

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
    getAll()
      .then((fetchData) => {
        setData(fetchData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((key) => {
                return (
                  <TableCell key={key} sx={{ textTransform: "capitalize" }}>
                    {key}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.productId}>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to={"/"}>
        <Button variant="contained" sx={{my:"2rem"}}>Home</Button>
      </Link>
    </Box>
  );
};

export default GetAll;

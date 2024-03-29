import { useEffect, useState } from "react";
import { getAll, getKeys } from "../services/productsService";
import { ProductType } from "../types/product";
import Loading from "../components/Loading";
import HomeButton from "../components/HomeButton";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
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
    getAll()
      .then((fetchData) => {
        setData(fetchData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {keys?.length !== undefined ? (
                keys?.map((key) => {
                  return (
                    <TableCell key={key} sx={{ textTransform: "capitalize" }}>
                      {key}
                    </TableCell>
                  );
                })
              ) : (
                <TableCell sx={{ textAlign: "center" }}>
                  No Data found
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {keys?.length !== 0 ? (
              data?.map((item) => {
                return (
                  <TableRow key={item.productId}>
                    <TableCell>{item.productId}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell>No product found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <HomeButton />
    </Box>
  );
};

export default GetAll;

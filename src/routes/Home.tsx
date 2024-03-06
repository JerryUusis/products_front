import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography variant="h3" sx={{ mb: "2rem" }}>
        Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Link to={"/getall"}>
          <Button variant="contained">Get all</Button>
        </Link>
        <Link to={"/getproduct"}>
          <Button variant="contained">Get product</Button>
        </Link>
        <Link to={"/insertproduct"}>
          <Button variant="contained">Insert product</Button>
        </Link>
        <Link to={"/updateproduct"}>
          <Button variant="contained">Update product</Button>
        </Link>
        <Link to={"deleteproduct"}>
          <Button variant="contained">Delete product</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;

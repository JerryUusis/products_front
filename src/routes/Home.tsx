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
        <Link to={"/insertproduct"}><Button variant="contained">Insert product</Button></Link>
        <Button variant="contained">Update product</Button>
        <Button variant="contained">Delete product</Button>
      </Box>
    </Box>
  );
};

export default Home;

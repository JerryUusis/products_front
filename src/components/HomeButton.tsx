import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const HomeButton = () => {
  return (
    <>
      <Link to={"/"}>
        <Button variant="contained" sx={{ my: "2rem" }}>
          Home
        </Button>
      </Link>
    </>
  );
};

export default HomeButton;

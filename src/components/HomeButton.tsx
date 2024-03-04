import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const HomeButton = () => {
  return (
    <>
      <Link to={"/"}>
        <Button variant="contained" >
          Home
        </Button>
      </Link>
    </>
  );
};

export default HomeButton;

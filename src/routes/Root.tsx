import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Root = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Root;

import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;

import { Box, Divider, Typography } from "@mui/material";
import FrontLayout from "../components/FrontLayout";

export default function IndexPage() {
  return (
    <FrontLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          marginTop: "4em",
        }}
      >
        <Typography variant="h2">Crypto Brodcast News</Typography>
        <Divider sx={{ margin: "2em" }} />
        <Typography variant="h4">A decentralized media platform</Typography>
        <Divider sx={{ margin: "2em" }} />
        <Typography variant="h6">[by AI43]</Typography>
      </Box>
    </FrontLayout>
  );
}

import { Box } from "@mui/material";
import Image from "next/image";

const SignIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        marginBottom: "50%",
      }}
    >
      <Box>
        <Image src="/cbn.png" alt="logo" width={200} height={100} />
        <button onClick={() => (window.location.href = "/api/auth/login?returnTo=/dashboard")}>
          login
        </button>
      </Box>
    </Box>
  );
};

export default SignIn;

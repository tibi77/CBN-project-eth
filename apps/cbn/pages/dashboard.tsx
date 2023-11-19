import { useEffect, useState, useMemo, useContext, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { uploadFileToIPFS } from "../utils";
import { useUser } from "@auth0/nextjs-auth0/client";

import AsyncLayout from "../components/AsyncLayout";
// import { useWalletStore } from "../lib/stores/wallet";

interface Article {
  wallet: string;
  wcid: string;
  title: string;
  category: string;
  article: string;
  date: string;
}

const Dashboard = (props: any) => {
  const { user, error, isLoading } = useUser();

  const [walletAddress, setwalletAddress] = useState("");
  const interval = useRef<any>(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      const data = localStorage.getItem("walletAddr");
      if (data) {
        setwalletAddress(data);
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }
    }, 1000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  const wcId = useMemo(() => {
    return user?.sub?.split?.("|")?.[2] || "";
  }, [user]);
  // send wcid to the contract so together with the mina address

  // console.log("WCID::", wcId);
  // console.log("Wallet:222:", walletAddress);

  const [data, setData] = useState<Article>({
    wallet: "",
    wcid: "",
    title: "",
    category: "",
    article: "",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (walletAddress)
      setData({
        ...data,
        wallet: walletAddress,
      });

    if (wcId)
      setData({
        ...data,
        wcid: wcId,
      });
  }, [walletAddress, wcId]);

  const handleUpdateFormData = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendToFileCoin = async () => {
    try {
      await uploadFileToIPFS(data);
      setData({
        ...data,
        title: "",
        category: "",
        article: "",
      });
    } catch (e) {
      console.log("[Error]::", e);
    }
  };

  return (
    <AsyncLayout>
      <Box>
        <TextField
          id="title"
          name="title"
          label="Article title"
          variant="outlined"
          value={data.title}
          onChange={handleUpdateFormData}
          required
          fullWidth
        />

        <FormControl fullWidth sx={{ marginY: "2em" }}>
          <InputLabel>Choose a category</InputLabel>
          <Select
            id="category-select"
            label="Choose a category"
            name="category"
            value={data.category}
            onChange={handleUpdateFormData}
            variant="outlined"
            required
          >
            {["World", "BlockChain", "Politics", "Business"].map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          id="article"
          name="article"
          label="Article body"
          variant="outlined"
          value={data.article}
          multiline
          rows={10}
          fullWidth
          onChange={handleUpdateFormData}
          required
          sx={{
            marginBottom: "2em",
          }}
        />
      </Box>

      <Button variant="contained" onClick={sendToFileCoin}>
        Save
      </Button>
    </AsyncLayout>
  );
};

export default Dashboard;

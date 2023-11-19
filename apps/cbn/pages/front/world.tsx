import FrontLayout from "../../components/FrontLayout";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useAppState } from "../../stateContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsDownIcon from "@mui/icons-material/ThumbDown";
import { useEffect, useState } from "react";
import Link from "next/link";

const World = () => {
  const { posts } = useAppState();
  const category = "World";
  const [walletAddr, setwalletAddr] = useState("");

  useEffect(() => {
    setwalletAddr(localStorage.getItem("walletAddr") || ("" as string));
  }, []);
  return (
    <FrontLayout>
      <h1>World</h1>
      {posts
        .filter((post) => post.category === category)
        .map((post) => {
          return (
            <Box
              key={post.title}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "30em",
                border: "1px solid black",
                borderRadius: "1em",
                padding: "1em",
              }}
            >
              <Typography>{post.title}</Typography>
              <Typography variant="caption">
                Category: {post.category} | Date: {post.date}
              </Typography>
              <Divider />
              <Box
                sx={{
                  height: "10em",
                  overflowX: "hidden",
                  overflowY: "auto",
                  wordWrap: "break-word",
                }}
              >
                <Typography variant="body1">{post.article}</Typography>
              </Box>
              <Divider />
              {walletAddr && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3em",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Link href={post.file}  target="self">IPFS</Link>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton>
                    <ThumbUpIcon color="secondary" />
                  </IconButton>
                  <IconButton>
                    <ThumbsDownIcon color="primary" />
                  </IconButton>
                </Box>
              )}
            </Box>
          );
        })}
    </FrontLayout>
  );
};

export default World;

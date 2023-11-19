import FrontLayout from "../../components/FrontLayout";
import { Box, IconButton, Typography } from "@mui/material";
import { useAppState } from "../../stateContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsDownIcon from "@mui/icons-material/ThumbDown";

const Business = () => {
  const { posts } = useAppState();
  const category = "Business";

  return (
    <FrontLayout>
      <h1>Business</h1>
      {posts
        .filter((post) => post.category === category)
        .map((post) => {
          return (
            <Box>
              <Typography>{post.title}</Typography>
              <Typography>{post.category}</Typography>
              <Typography>{post.date}</Typography>
              <Typography>{post.article}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <IconButton>
                  <ThumbsDownIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
    </FrontLayout>
  );
};

export default Business;

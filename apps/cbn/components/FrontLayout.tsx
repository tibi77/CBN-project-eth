import { Box } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { Divider } from "@mui/material";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";

const FrontLayout = (props: any) => {
  return (
    <Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Image
          src="/cbn.png"
          alt="logo"
          width={200}
          height={100}
          style={{
            marginRight: "2em",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        {Menu.LINKS.map(({ text, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton component={Link} href={href}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton
            component={Button}
            variant="contained"
            onClick={() =>
              (window.location.href = "/api/auth/login?returnTo=/dashboard")
            }
            sx={{
              textAlign: "center",
              color: "primary",
            }}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {props.children}
    </Box>
  );
};

export default FrontLayout;

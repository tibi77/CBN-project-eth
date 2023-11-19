import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = ({
  open,
  handleClose,
  children,
}: {
  open: boolean;
  handleClose: (event: any, reason: any) => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        scroll="paper"
        className="customScrollbar"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "background.default",
            height: "auto",
            maxWidth: "100%",
            borderRadius: "0.5em",
            padding: "0.5em",
          },
        }}
      >
        <DialogContent>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "0.3em",
              border: "1px solid #bbb",
              flexDirection: "column",
              padding: "2em",
              boxShadow: "0px 1px 0px 0px #bbb",
              overflowX: "hidden",
              maxWidth: "100%",
            }}
          >
            {children}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogSlide;

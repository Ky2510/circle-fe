import { Box, Modal } from "@mui/material";
import React from "react";

interface IModalDialogProps extends React.PropsWithChildren {
   children: React.ReactElement;
   show: boolean;
   callback: () => void;
}

const style = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "#1D1D1D",
   
   p: 4,
};

const ModalDialog: React.FC<IModalDialogProps> = ({
   children,
   show,
   callback,
}) => {
   return (
      <Modal
         open={show}
         onClose={callback}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>{children}</Box>
      </Modal>
   );
};

export default ModalDialog;

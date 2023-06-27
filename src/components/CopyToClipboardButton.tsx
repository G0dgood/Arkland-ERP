import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { ImCopy } from "react-icons/im";


const CopyToClipboardButton = ({ url }: any) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setOpen(true);
    // eslint-disable-next-line no-useless-concat
    navigator.clipboard.writeText(`${url}`);
  };

  return (
    <div >
      <IconButton onClick={handleClick} color="primary" style={{ border: "2px solid black", borderRadius: "50%", marginLeft: "10px", padding: "6px" }}>
        <ImCopy color="black" />
      </IconButton>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};

export default CopyToClipboardButton;

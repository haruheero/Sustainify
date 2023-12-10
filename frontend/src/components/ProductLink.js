import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LinkIcon from "@mui/icons-material/Link";

const ProductLink = ({ product }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(24 24 24)",
    border: "2px solid #000",
    color: "#ADADAD",
    boxShadow: 24,
    p: 4,
  };

  // console.log(product.position);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h6"
            component="h2"
          >
            Go to product page
            <a
              style={{ display: "flex", marginLeft: "15px" }}
              href={product?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon sx={{ color: "#1f88d9" }} />
            </a>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {product?.title}
          </Typography>
        </Box>
      </Modal>

      <div
        style={{
          width: "19%",
          // height: "24%",
          overflow: "hidden",
          position: "relative",
          aspectRatio: "1/1",
        }}
      >
        <img
          src={product?.thumbnail}
          alt="new"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <span
          className="name"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            display: "flex",
            padding: "5px",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
          }}
        >
          {product?.["Carbon footprint"]}
          <Button style={{ zIndex: 1000 }} onClick={handleOpen}>
            <MenuIcon sx={{ color: "#1f88d9" }} />
          </Button>
        </span>
      </div>
    </>
  );
};

export default ProductLink;

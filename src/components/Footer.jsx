import { Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <>
      <Typography sx={{ fontWeight: "600" }}>
        {" "}
        <a
          href="https://github.com/jaydeep4884"
          style={{ textDecoration: "none", color: "#2F3C7E" }}
        >
          Frontend by Jaydeep Sagathiya 🚀
        </a>
      </Typography>
    </>
  );
}

export default Footer;

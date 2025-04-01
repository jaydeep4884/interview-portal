import { createContext } from "react";

export const token = createContext(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjE4MzU3NX0.Xwtx7dNyxspgDzx_WCS5nhRr8D46VrS0mkSfd-4aXFE"
);

export const displayStyle = createContext({
  display: "flex",
  width: "100%",
  alignItems: "center",
  columnGap: "16px",
  marginBottom: "20px",
});

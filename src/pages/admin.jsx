import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import TotalCategoryCount from "../components/TotalCategoryCount";

function Admin() {
  const [categoryData, setCategoryData] = useState(0);
  const [subCategoryData, setSubCategoryData] = useState(0);
  const [questionData, setQuestionData] = useState(0);
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjE4MzU3NX0.Xwtx7dNyxspgDzx_WCS5nhRr8D46VrS0mkSfd-4aXFE";

  const fetchCategoryData = async () => {
    try {
      await axios
        .get("https://interviewback-ucb4.onrender.com/category/count", {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          setCategoryData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestionData = async () => {
    try {
      await axios
        .get("https://interviewback-ucb4.onrender.com/subcategory/count", {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          setSubCategoryData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategoryData = async () => {
    try {
      await axios
        .get("https://interviewback-ucb4.onrender.com/questions/count", {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          setQuestionData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchSubCategoryData();
    fetchQuestionData();
  }, []);
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Navbar />
        <Box
          sx={{
            position: "absolute",
            left: "15rem",
            top: "5.5rem",
            width: "calc(100% - 15rem)",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TotalCategoryCount
                  Title="Total Categorie"
                  Count={categoryData}
                />
                <TotalCategoryCount
                  Title="Total Sub-Categorie"
                  Count={subCategoryData}
                />
                <TotalCategoryCount
                  Title="Total Quations"
                  Count={questionData}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Admin;

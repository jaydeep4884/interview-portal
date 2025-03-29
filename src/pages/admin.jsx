import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import TotalCategoryCount from "../components/TotalCategoryCount";
import { token } from "../assets/contexts";

function Admin() {
  const [categoryData, setCategoryData] = useState(0);
  const [subCategoryData, setSubCategoryData] = useState(0);
  const [questionData, setQuestionData] = useState(0);
  const Token = useContext(token);
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
          // console.log(res.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box>
        {/* <Navbar /> */}
        <Box
          sx={{
            // position: "absolute",
            // left: "15rem",
            // top: "5.5rem",
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
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalCategoryCount
                  Title="Total Sub-Categorie"
                  Count={subCategoryData}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalCategoryCount Title="Total Q /A" Count={questionData} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Admin;

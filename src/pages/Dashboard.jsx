import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import TotalCategoryCount from "../components/TotalCategoryCount";
import { token } from "../assets/contexts";

const fetchData = async (url, Token, setter) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: Token },
    });
    setter(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

function Admin() {
  const [categoryData, setCategoryData] = useState(0);
  const [subCategoryData, setSubCategoryData] = useState(0);
  const [questionData, setQuestionData] = useState(0);
  const Token = useContext(token);

  useEffect(() => {
    fetchData(
      "https://interviewback-ucb4.onrender.com/category/count",
      Token,
      setCategoryData
    );
    fetchData(
      "https://interviewback-ucb4.onrender.com/subcategory/count",
      Token,
      setSubCategoryData
    );
    fetchData(
      "https://interviewback-ucb4.onrender.com/questions/count",
      Token,
      setQuestionData
    );
  }, [Token]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        <TotalCategoryCount Title="Total Category" Count={categoryData} />
        <TotalCategoryCount
          Title="Total Sub Category"
          Count={subCategoryData}
        />
        <TotalCategoryCount Title="Total Q & A" Count={questionData} />
      </Box>
    </Box>
  );
}

export default Admin;

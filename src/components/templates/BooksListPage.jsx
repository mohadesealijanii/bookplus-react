"use client";

import React, { useEffect, useState } from "react";
import Table from "../module/Table";
import Cookies from "js-cookie";
import { setInfo } from "@/redux/bookCategoriesSlice";
import { token } from "@/constants/config";
import { useDispatch, useSelector } from "react-redux";

function BooksListPage() {
  const dispatch = useDispatch();
  const { info, currentPage, categoryPerPage } = useSelector(
    (state) => state.bookCategories
  );

  const fetchBooks = async () => {
    try {
      const res = await fetch("https://stg-core.bpapp.net/api/Book/GetBooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pageSize: categoryPerPage,
          pageNumber: currentPage,
        }),
      });
      const data = await res.json();
      dispatch(setInfo(data.data));
      console.log(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <Table data={info} fetchData={fetchBooks} title="Books List" />;
}

export default BooksListPage;

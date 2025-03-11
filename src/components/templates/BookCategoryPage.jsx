"use client";
import React, { useEffect } from "react";
import Table from "../module/Table";
import { token } from "@/constants/config";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setInfo } from "@/redux/bookCategoriesSlice";

function BookCategoryPage() {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.bookCategories);

  const fetchData = async () => {
    try {
      if (!token) {
        toast.error("You're not logged in");
        return;
      }
      const res = await fetch(
        "https://stg-core.bpapp.net/api/BookCategory/GetAllBookCategories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      dispatch(setInfo(data.data));
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  return <Table data={info} fetchData={fetchData} title="Books Category" />;
}

export default BookCategoryPage;

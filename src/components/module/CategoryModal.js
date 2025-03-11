import { setCurrentPage } from "@/redux/bookCategoriesSlice";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

function CategoryModal({ onClose, setCategoryModal, totalPages, fetchData }) {
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addHandler = async (categoryTitle) => {
    if (!categoryTitle.trim()) {
      toast.error("Category title cannot be empty");
      return;
    }

    const token = Cookies.get("authToken");

    try {
      setLoading(true);
      const res = await fetch(
        "https://stg-core.bpapp.net/api/BookCategory/CreateBookCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: categoryTitle }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create category");
      }
      setLoading(false);
      setCategoryModal(false);
      toast.success("category created successfully");
      await fetchData();
      dispatch(setCurrentPage(totalPages + 1));
      await fetchData();
    } catch (error) {
      console.log(error.message);
      toast.error("failed to create new category");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          value={categoryTitle}
          placeholder="Enter the category title"
          onChange={(e) => setCategoryTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-around gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-red-400 hover:bg-opacity-45"
          >
            Cancel
          </button>
          {loading ? (
            <p className="flex items-center justify-center min-w-16 max-h-5 mt-1 px-4 py-5 bg-ocean text-white rounded">
              <ClipLoader size={20} color="white" />
            </p>
          ) : (
            <button
              onClick={() => addHandler(categoryTitle)}
              className="px-4 py-2 bg-ocean text-white rounded"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;

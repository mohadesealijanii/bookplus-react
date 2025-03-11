import { setCurrentPage } from "@/redux/bookCategoriesSlice";
import Cookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function DeleteModal({
  onClose,
  setDeleteModal,
  id,
  fetchData,
  totalPages,
  selectedTitle,
}) {
  const [loading, setLoading] = useState(false);
  const currentPage = useSelector((state) => state.bookCategories.currentPage);
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const deleteHandler = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://stg-core.bpapp.net/api/BookCategory/DeleteBookCategory?id=${id}&transfer=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      const data = await res.json();

      if (data === true) {
        toast.success("Category deleted successfully");
      }
      await fetchData();
      const updatedTotalPages =
        totalPages - (currentPage === totalPages ? 1 : 0);

      if (currentPage > updatedTotalPages) {
        dispatch(setCurrentPage(Math.max(updatedTotalPages, 1)));
      }

      setDeleteModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting category");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-lg  mb-9 text-center">
          Are you sure to delete "
          {<span className="text-red-300">{selectedTitle}</span>}" category?
        </h2>
        <div className="flex justify-around gap-2">
          <button
            onClick={onClose}
            className="px-7 py-2 bg-ocean text-white rounded"
          >
            Cancel
          </button>
          {loading ? (
            <p className="flex items-center justify-center max-h-10 mb-[1px] px-9 bg-red-400 text-white rounded">
              <ClipLoader size={20} color="white" />
            </p>
          ) : (
            <button
              onClick={() => deleteHandler(id)}
              className="px-2 py-2 bg-gray-300 rounded bg-red-400 bg-opacity-45 hover:bg-opacity-95 hover:text-white"
            >
              Yes! Im sure
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

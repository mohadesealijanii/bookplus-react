"use client";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { ClipLoader, PropagateLoader } from "react-spinners";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdArrowDropUp } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

import toast, { Toaster } from "react-hot-toast";
import Layout from "@/app/layout/Layout";
import Sidebar from "../module/Sidebar";
import RowDropdown from "../module/RowDropdown";
import CategoryModal from "../module/CategoryModal";
import DeleteModal from "../module/DeleteModal";
import { useDispatch, useSelector, createAsyncThunk } from "react-redux";
import {
  setCurrentPage,
  setEditingCategoryId,
  setFilteredCategories,
  setInfo,
  setSearchTerm,
  setCategoryPerPage,
  setLoading,
  jumpInput,
  setEditedTitle,
  updateCategory,
  setJumpInput,
} from "@/redux/bookCategoriesSlice";

function BookCategories() {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");

  const {
    info,
    searchTerm,
    filteredCategories,
    currentPage,
    categoryPerPage,
    editingCategoryId,
    loading,
    jumpInput,
    editedTitle,
  } = useSelector((state) => state.bookCategories);
  // const [info, setInfo] = useState([]);
  // const [filteredCategories, setFilteredCategories] = useState(info);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [categoryPerPage, setCategoryPerPage] = useState(5);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [editingCategoryId, setEditingCategoryId] = useState(null);
  // const [editedTitle, setEditedTitle] = useState("");
  // const [loading, setLoading] = useState(false);

  const [selecetedId, setSelectedId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const totalPages = Math.ceil(
    (searchTerm ? filteredCategories.length : info.length) / categoryPerPage
  );
  const currentCategories = (searchTerm ? filteredCategories : info).slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

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
      // setInfo(data.data);
      dispatch(setInfo(data.data));
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [editedTitle]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      // setCurrentPage(+currentPage + 1);
      dispatch(setCurrentPage(+currentPage + 1));
    }
    // setEditingCategoryId(null);
    dispatch(setEditingCategoryId(null));
    dispatch(setJumpInput(""));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      // setCurrentPage(currentPage - 1);
      dispatch(setCurrentPage(currentPage - 1));
      dispatch(setJumpInput(""));
    }
  };

  const jumpHandler = (e) => {
    const input = e.target.value;
    dispatch(setJumpInput(input));

    if (input > totalPages) {
      toast.error(`page must be between 1 to ${totalPages}`);
      // setCurrentPage(1);
      dispatch(setCurrentPage(1));
    } else if (input === "") {
      // setCurrentPage(1);
      dispatch(setCurrentPage(1));
    } else {
      // setCurrentPage(input);
      dispatch(setCurrentPage(input));
    }
    // setEditingCategoryId(null);
    dispatch(setEditingCategoryId(null));
  };

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    // setSearchTerm(value);
    dispatch(setSearchTerm(value));

    if (!value) {
      // setFilteredCategories(info);
      dispatch(setFilteredCategories(info));
    } else {
      const searchResult = info.filter((category) =>
        category.title.toLowerCase().includes(value)
      );
      // setFilteredCategories(searchResult);
      dispatch(setFilteredCategories(searchResult));
    }

    // setCurrentPage(1);
    dispatch(setCurrentPage(1));
    dispatch(setJumpInput(""));
  };

  const dropdownHandler = () => {
    setDropdown((prev) => !prev);
  };

  const handleRowsChange = (newRows) => {
    // setCategoryPerPage(newRows);
    dispatch(setCategoryPerPage(newRows));
    // setCurrentPage(1);
    dispatch(setCurrentPage(1));
    setDropdown(false);
  };

  const editHandler = async (id) => {
    const token = Cookies.get("authToken");

    dispatch(setLoading(false));
    try {
      // setLoading(true);
      const res = await fetch(
        `https://stg-core.bpapp.net/api/BookCategory/GetBookCategoryForUpdate?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setLoading(false);
      const data = await res.json();
      // setEditingCategoryId(data.id);
      dispatch(setEditingCategoryId(data.id));
      // setEditedTitle(data.title);
      dispatch(setEditedTitle(data.title));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(setLoading(false));
  };

  // const saveHandler = async (id) => {
  //   const token = Cookies.get("authToken");
  //   setLoading(true);

  //   try {
  //     const updatedCategory = {
  //       id,
  //       title: editedTitle,
  //       parentId: editedCategory ? editedCategory.parentId : 5,
  //       categoryType: editedCategory ? editedCategory.categoryType : 0,
  //       hasBook: editedCategory ? editedCategory.hasBook : true,
  //     };

  //     const res = await fetch(
  //       "https://stg-core.bpapp.net/api/BookCategory/UpdateBookCategory",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(updatedCategory),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to update category");

  //     const data = await res.json();
  //     console.log(data);
  //     toast.success("category updated successfully!");
  //     // setEditingCategoryId(null);
  //     dispatch(setEditingCategoryId(null));
  //     // setEditedCategory(null);
  //     dispatch(setEditedCategory(null));
  //     fetchData();
  //     // setLoading(false);
  //     dispatch(setLoading(false));
  //   } catch (error) {
  //     console.error(error.message);
  //     toast.error("error updating category");
  //   }
  // };



  
  const saveHandler = async (id) => {
    const token = Cookies.get("authToken");

    try {
      dispatch(updateCategory({ id, editedTitle, token }));
      await fetchData();

      toast.success("Category updated successfully!");
      dispatch(setEditingCategoryId(0));
      dispatch(setEditedTitle("editedTiotle"));
      // console.log(editedTitle);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelHandler = () => {
    // setEditingCategoryId(null);
    dispatch(setEditingCategoryId(null));
    // setEditedTitle("");
    dispatch(setEditedTitle(""));
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <div className="flex justify-self-start flex-1 min-w-0 max-w-full mx-auto px-4">
        <Sidebar />
        <div className="shadow-md overflow-auto max-h-fit md:min-w-max max-w-[900] mx-auto w-screen rounded-b-2xl">
          <div className="overflow-auto flex flex-col h-fit min-h-fit text-slate-700 bg-white shadow-t-2xl rounded-xl">
            <div className="flex mx-4 mt-4 text-slate-700 rounded-none">
              <h3 className="text-lg font-semibold text-slate-800">
                Book Categories
              </h3>
              {/* <button
                onClick={allHandler}
                className="justify-items-end ml-auto bg-ocean text-white px-2 rounded"
              >
                {showAll ? "see less" : "see all"}
              </button> */}
            </div>

            <div className="p-0">
              {info.length > 0 ? (
                <table className="w-full mt-4 text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-y border-slate-200">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex border-[1px] border-solid border-slate-200 p-2 rounded">
                            <CiSearch size={30} />
                            <input
                              onChange={searchHandler}
                              placeholder="search categories"
                              className="pl-2 focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={() => setCategoryModal(true)}
                            className="flex border-2 border-sea p-1.5 rounded hover:bg-sea hover:text-white transition-colors duration-400"
                          >
                            <IoMdAddCircleOutline size={20} />‌ add category
                          </button>
                          {categoryModal && (
                            <CategoryModal
                              onClose={() => setCategoryModal(false)}
                              setCategoryModal={setCategoryModal}
                              setCurrentPage={setCurrentPage}
                              fetchData={fetchData}
                              totalPages={totalPages}
                            />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map((item) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="p-4 flex justify-between items-center">
                          {editingCategoryId === item.id ? (
                            <input
                              type="text"
                              value={editedTitle}
                              onChange={(e) =>
                                dispatch(setEditedTitle(e.target.value))
                              }
                              className="border p-1 rounded"
                              autoFocus
                              // readOnly={loading}
                            />
                          ) : (
                            <span>{item.title}</span>
                          )}

                          <div className="flex space-x-2">
                            {editingCategoryId !== item.id && (
                              <button
                                onClick={() => editHandler(item.id)}
                                className="px-2 pt-1 flex hover:bg-blue-200 rounded"
                              >
                                <CiEdit size={20} className="m-1" />
                              </button>
                            )}

                            {editingCategoryId === item.id && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveHandler(item.id)}
                                  className="px-3 py-1 flex items-center justify-center hover:bg-green-200 rounded"
                                >
                                  {loading ? (
                                    <p>
                                      <ClipLoader className="-mb-2" size={20} />
                                    </p>
                                  ) : (
                                    <p>Save</p>
                                  )}
                                </button>
                                <button
                                  onClick={cancelHandler}
                                  className="px-3 py-1 flex items-center justify-center hover:bg-yellow-100 rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}

                            <button
                              onClick={() => {
                                setDeleteModal(true);
                                setSelectedId(item.id);
                                setSelectedTitle(item.title);
                              }}
                              className="px-3 py-1 flex items-center justify-center hover:bg-red-200 rounded"
                            >
                              <GoTrash className="m-1" />
                            </button>
                            {deleteModal && (
                              <DeleteModal
                                onClose={() => setDeleteModal(false)}
                                className="px-3 py-1 flex hover:bg-red-100 rounded"
                                setDeleteModal={setDeleteModal}
                                id={selecetedId}
                                fetchData={fetchData}
                                totalPages={totalPages}
                                selectedTitle={selectedTitle}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <PropagateLoader size={20} color="#023047" />
                </div>
              )}
            </div>

            <div className="text-nowrap bg-blue-950 bg-opacity-10 border-[1px] border-blue-950 border-opacity-15 rounded-b-2xl shadow-2xl">
              <div className="flex items-center justify-between p-3">
                <div className="flex relative">
                  <p className="text-sm text-slate-500 pr-3 pt-2.5">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="group rounded border border-slate-300 pr-2 h-fit py-1 mt-1.5   pl-1 m-1 lg:px-3 text-center text-xs font-semibold text-slate-600 transition-all ">
                    <label className="group-hover:text-ocean group-focus-within:text-ocean text-sm text-slate-500">
                      jump to page
                      <input
                        type="number"
                        max={totalPages}
                        value={jumpInput}
                        // pattern="\d{1,3}"
                        placeholder=" "
                        className="pl-4 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-10 outline-none bg-inherit"
                        onChange={jumpHandler}
                      />
                    </label>
                  </div>

                  <div
                    ref={dropdownRef}
                    className="relative flex group rounded border border-slate-300 text-nowrap h-fit py-1 mt-1 text-center text-xs font-semibold text-slate-600 transition-all hover:cursor-pointer"
                  >
                    <p
                      onClick={dropdownHandler}
                      className="group-hover:text-ocean group-focus-within:text-ocean text-sm text-slate-500 pl-1"
                    >
                      rows
                      <span> {categoryPerPage}</span>
                    </p>
                    <p>
                      <MdArrowDropUp size={20} />
                    </p>
                    {dropdown && (
                      <div className="absolute bottom-10 mx-auto left-6 shadow-lg rounded mt-1 z-50">
                        <RowDropdown onSelect={handleRowsChange} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    disabled={currentPage === 1}
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default BookCategories;

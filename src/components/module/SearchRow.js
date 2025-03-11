import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import CategoryModal from "../module/CategoryModal";
import { useState } from "react";
import {
  setCurrentPage,
  setFilteredCategories,
  setSearchTerm,
  setJumpInput,
} from "@/redux/bookCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
function SearchRow({ fetchData, totalPages }) {
  const { info } = useSelector((state) => state.bookCategories);
  const dispatch = useDispatch();
  const [categoryModal, setCategoryModal] = useState(false);

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    dispatch(setSearchTerm(value));

    if (!value) {
      dispatch(setFilteredCategories(info));
    } else {
      const searchResult = info.filter((category) =>
        category.title.toLowerCase().includes(value)
      );
      dispatch(setFilteredCategories(searchResult));
    }

    dispatch(setCurrentPage(1));
    dispatch(setJumpInput(""));
  };
  return (
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
  );
}

export default SearchRow;

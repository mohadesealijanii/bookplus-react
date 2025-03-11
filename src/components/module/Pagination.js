// "use client"
// import { useEffect, useState } from "react"

// function Pagination() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [info, setInfo] = useState([])
//   const [products, setProducts] = useState([])

//   const fetchData = async () => {
//     try {
//       const token = Cookies.get("authToken")

//       if (!token) {
//         toast.error("You're not logged in")
//         return
//       }
//       const res = await fetch(
//         "https://stg-core.bpapp.net/api/BookCategory/GetAllBookCategories",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )

//       const data = await res.json()
//       setInfo(data.data) // ✅ Fix: Set info directly to data.data
//       setProducts(data.data)
//       console.log(data.data) // ✅ Fix: Log the new data instead of `info`
//     } catch (error) {
//       toast.error("Error fetching data")
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const booksPerPage = 5

//   const indexOfLastBook = currentPage * booksPerPage
//   const indexOfFirstBook = indexOfLastBook - booksPerPage

//   const currentBooks = data.data.slice(indexOfFirstBook, indexOfLastBook)

//   const totalPages = Math.ceil(data.data.length / booksPerPage)

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }
//   return (
//     <div>
//       <div className="flex items-center justify-between p-3">
//         <p className="block text-sm text-slate-500">
//           Page {currentPage} of {totalPages}
//         </p>
//         <div className="flex gap-1">
//           <button
//             className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//             type="button"
//             disabled={currentPage === 1}
//             onClick={handlePrevious}
//           >
//             Previous
//           </button>
//           <button
//             className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//             type="button"
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Pagination

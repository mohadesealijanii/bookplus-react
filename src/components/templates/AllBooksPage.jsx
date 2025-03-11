// "use client"
// import Layout from "@/app/layout/Layout"
// import Link from "next/link"
// import { IoIosAddCircleOutline } from "react-icons/io"
// import { CiBadgeDollar } from "react-icons/ci"
// // import ProgressLine from "@/components/module/ProgressLine"
// import BadgeGroup from "@/components/module/Badges"
// import { MdAddShoppingCart } from "react-icons/md"
// import { LuFilter } from "react-icons/lu"
// import Image from "next/image"
// import books from "@/constants/Books"

// function AllBooks() {
//   const addHandler = () => {}

//   return (
//     <Layout>
//       <div className="max-w-[1200px] mx-auto">
//         <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl">
//           <div className="relative mx-4 mt-4 text-slate-700 bg-white rounded-none bg-clip-border">
//             <div className="flex items-center justify-between ">
//               <div>
//                 <h3 className="text-lg font-semibold text-slate-800">
//                   Audio Files + PDFs
//                 </h3>
//               </div>
//               <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
//                 <Link href={"/all-books"}>
//                   {/* <button
//                     className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                     type="button"
//                   >
//                     View All
//                   </button> */}
//                 </Link>
//                 <button
//                   className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                   type="button"
//                 >
//                   <IoIosAddCircleOutline color="white" size={15} />
//                   Sell Stock Books
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="p-0">
//             <table className="w-full mt-4 text-left table-auto min-w-max">
//               <thead>
//                 <tr>
//                   <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
//                       Books
//                     </p>
//                   </th>
//                   <th className="transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="flex text-center justify-center gap-2 font-sans text-sm font-normal leading-none text-slate-500">
//                       <LuFilter size={20} />
//                       Level
//                     </p>
//                   </th>
//                   <th className="transition-colors content-center cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="p-3 flex text-center justify-center gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
//                       {/* <button onClick={ageHandler}> */}
//                       <LuFilter size={20} />
//                       {/* </button> */}
//                       Age Group
//                     </p>
//                   </th>
//                   <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
//                       Publication
//                     </p>
//                   </th>
//                   <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
//                       Price
//                     </p>
//                   </th>

//                   <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="flex text-center justify-center gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
//                       Rate
//                     </p>
//                   </th>

//                   <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
//                     <p className="flex text-center justify-center gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
//                       Purchase
//                     </p>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book, index) => (
//                   <tr key={index}>
//                     <td className="p-4 border-b border-slate-200">
//                       <div className="flex items-center gap-4">
//                         <Image
//                           src="/pics/book.png"
//                           alt="John Michael"
//                           width={30}
//                           height={20}
//                           className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
//                         />
//                         <div className="flex flex-col">
//                           <p className="text-sm font-semibold text-slate-700">
//                             {book.title}
//                           </p>
//                           <p className="text-sm text-slate-500">
//                             {book.author}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="content-center border-b border-slate-200 align-middle">
//                       <div className="flex flex-col justify-center">
//                         <div className=" text-center">
//                           <BadgeGroup level={book.level} />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 border-b border-slate-200 align-middle">
//                       <div className="flex flex-col">
//                         <p className="text-sm text-slate-700 text-center">
//                           {book.ageGroup}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="p-4 border-b border-slate-200 align-middle">
//                       <div className="flex flex-col">
//                         <p className="text-sm text-slate-700">
//                           {book.publication.replace(/-/g, "/")}
//                         </p>
//                       </div>
//                     </td>

//                     <td className="p-4 border-b border-slate-200 align-middle">
//                       <div className="flex flex-col">
//                         <p className="text-sm text-slate-700">
//                           <span className="flex">
//                             {book.price}
//                             <span className="px-1">
//                               <CiBadgeDollar size={20} color="green" />
//                             </span>
//                           </span>
//                         </p>
//                       </div>
//                     </td>

//                     <td className="p-4 border-b border-slate-200 align-middle">
//                       <div className="flex flex-col">
//                         <div className="text-sm text-slate-700">
//                           {/* <ProgressLine rate={book.rate} /> */}
//                         </div>
//                       </div>
//                     </td>

//                     <td className="p-4 border-b border-slate-200 align-middle justify-center">
//                       <div className="flex flex-col pl-6">
//                         <button
//                           onClick={addHandler}
//                           className="text-sm text-slate-700"
//                         >
//                           <MdAddShoppingCart size={22} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex items-center justify-between p-3"></div>
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default AllBooks

import React from "react"
import Badges from "./Badges"
import { CiBadgeDollar } from "react-icons/ci"
// import ProgressLine from "./ProgressLine"
import { MdAddShoppingCart, MdDeleteOutline } from "react-icons/md"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import { productQuantity } from "@/constants/functions"

function BookTable({ data }) {
  const [state, dispatch] = useCart()
  console.log(state)

  

  const clickHandler = (type) => {
    dispatch({ type, payload: data })
  }

  const quantity = productQuantity(state, data.id)

  return (
    <>
      <td className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Image
            src="/pics/book.png"
            alt="John Michael"
            width={30}
            height={20}
            className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-slate-700">{data.title}</p>
            <p className="text-sm text-slate-500">{data.author}</p>
          </div>
        </div>
      </td>
      <td className="content-center border-b border-slate-200 align-middle">
        <div className="flex flex-col justify-center">
          <div className=" text-center">
            <Badges level={data.level} />
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-slate-200 align-middle">
        <div className="flex flex-col">
          <p className="text-sm text-slate-700 text-center">{data.ageGroup}</p>
        </div>
      </td>
      <td className="p-4 border-b border-slate-200 align-middle">
        <div className="flex flex-col">
          <p className="text-sm text-slate-700">
            {data.publication.replace(/-/g, "/")}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-slate-200 align-middle">
        <div className="flex flex-col">
          <p className="text-sm text-slate-700">
            <span className="flex">
              {data.price}
              <span className="px-1">
                <CiBadgeDollar size={20} color="green" />
              </span>
            </span>
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-slate-200 align-middle">
        <div className="flex flex-col">
          <div className="text-sm text-slate-700">
            {/* <ProgressLine rate={data.rate} /> */}
          </div>
        </div>
      </td>

      <td className="min-w-40 p-4 border-b border-slate-200 align-middle justify-center">
        <div className="flex">
          {quantity === 0 ? (
            <button
              onClick={() => clickHandler("ADD_ITEM")}
              className="text-sm text-slate-700  pl-16"
            >
              <MdAddShoppingCart size={22} />
            </button>
          ) : (
            <button
              onClick={() => clickHandler("INCREASE")}
              className="px-2 border-2 shadow-sm rounded ml-7"
            >
              +
            </button>
          )}

          {!!quantity && <span className="px-5">{quantity}</span>}
          {quantity > 1 && (
            <button
              onClick={() => clickHandler("DECREASE")}
              className="px-2 border-2 shadow-sm rounded"
            >
              -
            </button>
          )}

          {quantity === 1 && (
            <button
              onClick={() => clickHandler("REMOVE_ITEM")}
              className="text-red-800 border-2 shadow-sm rounded p-1"
            >
              <MdDeleteOutline />
            </button>
          )}
        </div>
      </td>
    </>
  )
}

export default BookTable

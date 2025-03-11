"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import loginpic from "../../../public/pics/loginpic.png";

function SignupPage2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  return (
    <div className="flex items-center  mx-auto min-h-screen max-w-[1000px]">
      <div className="flex justify-around lg:w-auto md:w-auto w-screen mx-auto bg-white p-5 rounded-3xl">
        <div className="flex-1 min-w-0 hidden md:block lg:block mr-10">
          <div className="text-wrap h-full min-h-max ">
            <div className="p-20 bg-ocean h-full rounded-tl-3xl rounded-br-3xl text-white">
              <div className="card sm:max-w-sm">
                <figure>
                  {/* <img
                    src="https://cdn.flyonui.com/fy-assets/components/card/image-7.png"
                    alt="headphone"
                  /> */}
                  <Image src={loginpic} alt="loginpic" />
                </figure>
                <div className="card-body">
                  <h5 className="card-title mb-2.5">Airpods Max</h5>
                  <p className="mb-4">
                    A perfect balance of exhilarating high-fidelity audio and
                    the effortless magic of Airpods.
                  </p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                    <button className="btn btn-secondary btn-soft">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-nowrap flex-1">
          <p className="font-bold text-3xl mb-5 text-center md:mb-12 lg:mb-12">
            Sign Up
          </p>

          <div className="flex flex-col">
            <div className="relative w-full mb-3">
              <input
                type="text"
                id="input"
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border-gray-400 px-3 pb-2 text-gray-900 focus:outline-none focus:border-sun text-sm p-2 m-1 rounded-3xl border-2 border-slate-200 py-3"
                placeholder=" "
                value={email}
              />
              <label
                htmlFor="input"
                className="absolute left-3 top-1 transform -translate-y-1/2 text-slate-600 bg-white px-1 transition-all
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:text-sm peer-focus:text-ocean-500 peer-focus:px-1 peer-focus:bg-white"
              >
                <p className="text-sm pb-2">username</p>
              </label>
            </div>

            <div className="relative w-full mb-3">
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full border-gray-400 px-3 pb-2 text-gray-900 focus:outline-none focus:border-sun text-sm p-2 m-1 rounded-3xl border-2 border-slate-200 py-3"
                placeholder=" "
                value={password}
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-1 transform -translate-y-1/2 text-slate-600 bg-white px-1 transition-all
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:text-sm peer-focus:text-ocean-500 peer-focus:px-1 peer-focus:bg-white"
              >
                <p className="text-sm pb-2">password</p>
              </label>
            </div>
            <div className="relative w-full mb-3">
              <input
                type="password"
                id="repassword"
                onChange={(e) => setRePassword(e.target.value)}
                className="peer w-full border-gray-400 px-3 pb-2 text-gray-900 focus:outline-none focus:border-sun text-sm p-2 m-1 rounded-3xl border-2 border-slate-200 py-3"
                placeholder=" "
                value={rePassword}
              />
              <label
                htmlFor="repassword"
                className="absolute left-3 top-1 transform -translate-y-1/2 text-slate-600 bg-white px-1 transition-all
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-0 peer-focus:text-sm peer-focus:text-ocean-500 peer-focus:px-1 peer-focus:bg-white"
              >
                <p className="text-sm pb-2">confirm password</p>
              </label>
            </div>

            <div className="flex">
              <input type="checkbox" className="accent-ocean ml-3" />
              <label className="text-slate-600 ml-1">remember me</label>
            </div>
            <button className="bg-orange rounded-3xl p-2 mt-10 text-white text-xl hover:text-ocean">
              register
            </button>
            <div className="flex mb-4 mt-3 text-slate-700 text-sm justify-center">
              <p>Have an account? ‌ </p>
              <Link href={"/singup"} className="text-orange underline">
                sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage2;

"use client";

import { sans } from "@/utils/fonts";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ProgressStep } from "../module/ProgressStep";

export default function ForgetPage() {
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    const res = await fetch("https://stg-core.bpapp.net/api/Member/CheckCode", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });
    const data = await res.json();
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  return (
    <div className={sans.className}>
      <div className="min-w-full flex align-middle justify-center mt-10">
        <div className="flex w-screen sm:w-auto md:w-auto lg:w-auto mx-auto md:rounded-3xl lg:rounded-3xl sm:rounded-3xl shadow-lg bg-white p-10">
          <div className="mx-auto">
            <div className="flex justify-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18602/18602423.png"
                data-src="https://cdn-icons-png.flaticon.com/128/18602/18602423.png"
                alt="Password"
                title="Password"
                width="94"
                className="lzy lazyload--done"
                srcset="https://cdn-icons-png.flaticon.com/128/18602/18602423.png 4x"
              ></img>
            </div>
            <p className="mb-2 text-center text-ocean font-bold text-xl">
              Enter the verification code
            </p>
            <p className="text-slate-600 text-sm text-wrap mb-10">
              enter the 4-digit code that was sent to your phone number
            </p>
            <section className="bg-white">
              <div className="container">
                <form id="otp-form" className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      onFocus={handleFocus}
                      onPaste={handlePaste}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="shadow-xs flex w-[64px] items-center justify-center rounded-lg  border focus:border-2 bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl focus:border-sea text-ocean"
                    />
                  ))}
                </form>
                <div className="flex mt-2 justify-center">
                  <p className="text-sm text-center">
                    if you remember your password
                  </p>
                  <Link
                    href={"/signin"}
                    className="text-ocean underline text-sm pl-1"
                  >
                    sign up
                  </Link>
                </div>

                <button
                  type="submit"
                  className="bg-ocean rounded-xl py-3 text-white mt-9 mb-3 text-sm w-full"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <p>
                      <PropagateLoader
                        color="white"
                        className="content-center -mt-2"
                      />
                    </p>
                  ) : (
                    <p>submit</p>
                  )}
                </button>
                <div className="mt-7 mx-auto">
                  <div className="content-center ml-24">
                    <ProgressStep />
                  </div>
                </div>
              </div>
            </section>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

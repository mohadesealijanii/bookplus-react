"use client";

import { sans } from "@/utils/fonts";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ProgressStep } from "../module/ProgressStep";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/navigation";

function AcceptPage() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const inputRefs = useRef([]);

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

  const handleReset = async (e) => {
    e.preventDefault();
    if (!userName || !password || otp.some((digit) => digit === "")) {
      toast.error("Please enter your data completely");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        "https://stg-core.bpapp.net/api/Member/ForgotPasswordAccept",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: otp.join(""), userName, password }),
        }
      );
      const data = await res.json();
      setLoading(false);
      console.log(data);
      console.log({ otp, userName, password });

      if (data.status === true) {
        toast.success("your password changed successfully");
        router.push("/");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to reset your password");
    }
  };

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
  };

  return (
    <div className={sans.className}>
      <div className="min-w-full flex align-middle justify-center mt-5 pb-5">
        <div className="flex w-screen lg:w-auto sm:w-auto md:rounded-3xl lg:rounded-3xl sm:rounded-3xl shadow-lg bg-white px-10 py-2">
          <div className="mx-auto">
            <div className="flex justify-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18602/18602423.png"
                data-src="https://cdn-icons-png.flaticon.com/128/18602/18602423.png"
                alt="Password"
                title="Password"
                width="94"
                className="lazy lazyload--done"
                srcSet="https://cdn-icons-png.flaticon.com/128/18602/18602423.png 4x"
              ></img>
            </div>
            <p className="mb-2 text-center text-ocean font-bold text-xl">
              Reset your password
            </p>
            <section className="bg-white">
              <div className="container">
                <div className="mb-3">
                  <input
                    placeholder="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    type="userName"
                    value={userName}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean mb-5"
                    required
                  />
                </div>
                <p className="text-slate-600 text-sm text-wrap">
                  enter the 5-digit code that was sent to your phone number
                </p>
                <form
                  id="otp-form"
                  className="flex gap-2 justify-center"
                  // onSubmit={handleReset}
                >
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
                      className="mt-5 shadow-xs flex w-[64px] items-center justify-center rounded-lg  border focus:border-2 bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl focus:border-sea text-ocean"
                    />
                  ))}
                </form>
                <button
                  type="submit"
                  className="bg-ocean rounded-xl py-3 text-white mt-9 mb-3 text-sm w-full"
                  onClick={handleReset}
                >
                  {loading ? (
                    <p>
                      <PropagateLoader
                        color="white"
                        className="h-7 content-center -mt-2"
                      />
                    </p>
                  ) : (
                    <p>reset</p>
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

export default AcceptPage;

"use client";

import { sans } from "@/utils/fonts";
import Link from "next/link";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ProgressStep } from "../module/ProgressStep";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";

export default function ForgetPassPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (!username ) {
      toast.error("please enter your username");
      return;
    }

    setLoading(true);
    const res = await fetch(
      `https://stg-core.bpapp.net/api/Member/ForgotPassword/${username}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      }
    );
    setLoading(false);
    // console.log(username);
    const data = await res.json();
    // console.log(data);

    if (data.status === true) {
      router.push("/forgetPassword/accept");
    } else {
      setUsername("");
      toast.error("account not found");
    }
  };

  return (
    <div className={sans.className}>
      <div className="min-w-full flex align-middle justify-center mt-5 pb-5">
        <div className="flex w-screen sm:w-auto md:w-auto lg:w-auto mx-auto md:rounded-3xl lg:rounded-3xl sm:rounded-3xl shadow-lg bg-white p-16">
          <div className="mx-auto">
            <div className="flex justify-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/128/18505/18505272.png"
                data-src="https://cdn-icons-png.flaticon.com/128/18505/18505272.png"
                alt="Security shield"
                title="Security shield"
                width="94"
                className="lazy lazyload--done"
                srcSet="https://cdn-icons-png.flaticon.com/128/18505/18505272.png 4x"
              ></img>
            </div>
            <p className="mb-2 text-center text-ocean font-bold text-xl">
              Enter your username
            </p>
            <p className="text-slate-600 text-sm text-wrap mb-9">
              please type your username to recover your account
            </p>
            <section className="bg-white">
              <div className="container">
                <div>
                  <input
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    value={username}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>{" "}
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
                        className="content-center -mt-2 h-7"
                      />
                    </p>
                  ) : (
                    <p>submit</p>
                  )}
                </button>
                <div className="mt-12 mx-auto">
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

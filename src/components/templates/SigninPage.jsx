import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../../src/pics/logo.png";
import study from "../../../src/pics/study.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function SigninPage() {
  // const router = useRouter();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);

    if (!username || !password) {
      toast.error("please enter your username and password");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        "https://stg-core.bpapp.net/api/Member/AdminLogin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            rememberMe: true,
            confirmed: true,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!data.token) {
        setPassword("");
        setUsername("");
        throw new Error(data.errors);
      }

      Cookies.set("authToken", data.token, { expires: 7, path: "/" });

      toast.success("you logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen justify-center items-center mt-10">
        <div className="md:flex sm:flex lg:w-auto md:w-auto w-full rounded-3xl shadow-lg bg-white">
          <img
            src={study}
            alt="study"
            height={450}
            className="rounded-l-3xl hidden md:block sm:block lg:block bg-white"
          />
          <div className="p-3 md:w-96 mx-auto">
            <form
              noValidate
              onSubmit={handleLogin}
              className="flex flex-col justify-center"
            >
              <div className="flex justify-center">
                <img src={logo} alt="logo" className="w-17 h-auto" />
              </div>
              <h3 className="font-bold mt-10 mb-5 text-center">
                welcome back!
              </h3>
              <div className="flex flex-col">
                <input
                  placeholder="phone or email"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                  className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean mb-2"
                  required
                />
                <div>
                  <input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>
              </div>

              <Link
                href={"/forgetPassword"}
                className="text-ocean mt-3 text-sm pl-1 mb-5"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                className="bg-ocean rounded-xl py-3 text-white mt-9 mb-3 text-sm"
              >
                {loading ? (
                  <p>
                    <PropagateLoader
                      color="white"
                      className="content-center -mt-2 h-7"
                    />
                  </p>
                ) : (
                  <p>sign in</p>
                )}
              </button>
              <div className="flex">
                <p className="text-sm">Don&apos;t you have an account?</p>
                <Link
                  href={"/signup"}
                  className="text-ocean underline text-sm pl-1"
                >
                  sign up
                </Link>
              </div>
            </form>
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;

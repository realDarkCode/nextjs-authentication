"use client";
import validate from "@/helpers/validation";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
const initialState = {
  email: "",
  password: "",
};
const toastId = "loginPage";
const LoginPage = () => {
  const router = useRouter();
  const [state, setState] = useState({ ...initialState });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const isValidFormData = () => {
    try {
      validate(state.email, "email", { minLen: 6 });
      validate(state.password, { minLen: 8, maxLen: 40 });
      return true;
    } catch (error) {
      toast.error(`[Validation Error]: ${error.message}`, { toastId });

      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate form data
    const isValid = isValidFormData();
    if (!isValid) return;
    const { email, password } = state;
    try {
      setLoading(true);
      // request to login
      const response = await axios.post("api/users/login", {
        email,
        password,
      });

      const { data } = response;
      // show server response
      toast[data?.success ? "success" : "warning"](data?.message || r.message, {
        toastId,
      });

      // navigate to profile page after successfully login
      data?.success && router.push("/profile");
    } catch (error) {
      toast.error(error?.response?.data.message || error.message, { toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Login
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Don't have a account?{" "}
            <Link
              className="text-indigo-600 underline  font-semibold"
              href="signup"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              {loading ? "loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

"use client";
import validate from "@/helpers/validation";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termCheck: false,
};
const toastId = "signUpPage";
const SignUpPage = () => {
  const [state, setState] = useState({ ...initialState });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const handleTermCheck = () => {
    setState({ ...state, termCheck: !state.termCheck });
  };

  const isValidFormData = () => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        termCheck,
      } = state;
      validate(firstName, "First name", { minLen: 4 });
      validate(lastName, "Last name", { minLen: 4 });
      validate(email, "email", { minLen: 6 });
      validate(password, "password", { minLen: 8, maxLen: 40 });
      if (password !== confirmPassword)
        throw new Error("Password and confirm password should match");

      if (!termCheck) throw new Error("Please check term and condition ");
      return true;
    } catch (error) {
      toast.error(`[Validation Error]: ${error.message}`, { toastId });
      return false;
    } finally {
    }
  };
  const handleSubmit = async (e) => {
    // prevent page reload on form submit
    e.preventDefault();

    // extract user data from state
    const { firstName, lastName, email, password } = state;

    // check if form data is valid
    const isValid = isValidFormData();
    if (!isValid) return;

    try {
      setLoading(true);
      // request to create a new user
      const response = await axios.post("api/users/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      const { data } = response;
      toast[data?.success ? "success" : "warning"](data?.message || r.message, {
        toastId,
      });
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
            Sign Up
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Already have a account?{" "}
            <Link
              className="text-indigo-600 underline  font-semibold"
              href="login"
            >
              Login
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
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={state.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Password
              </label>
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
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={state.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
              <div className={`flex h-6 items-center`}>
                <button
                  type="button"
                  className={`bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ${
                    state.termCheck ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={state.termCheck}
                  aria-labelledby="termCheck"
                  onClick={handleTermCheck}
                >
                  <span className={`sr-only`}>Agree to policies</span>

                  <span
                    aria-hidden="true"
                    className={`translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out  ${
                      state.termCheck ? "translate-x-3.5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <label className="text-sm leading-6 text-gray-600" id="termCheck">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </label>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
              disabled={loading}
            >
              {loading ? "loading..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;

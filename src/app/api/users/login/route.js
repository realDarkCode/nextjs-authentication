import connect from "@/core/DBConnection";
import httpError from "@/helpers/httpError";
import validate from "@/helpers/validation";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    // extract data
    const requestData = await req.json();
    const { password, email } = requestData;
    // validate data
    validate(password, "password");
    validate(email, "email");
    // check if user exists with  email
    let user = await User.findOne({ email });
    if (!user) throw httpError("User doesn't exist with this email");

    // match user password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw httpError("Invalid password");

    // generate token
    const tokenData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // set token to the client browser cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    if (error.status === 400) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: error.status }
      );
    } else {
      console.log(error);
      return NextResponse.json(
        {
          success: false,
          message: "Internal server error",
        },
        { status: 500 }
      );
    }
  }
}

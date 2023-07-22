import connect from "@/core/DBConnection";
import httpError from "@/helpers/httpError";
import validate from "@/helpers/validation";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    // extract data
    const requestData = await req.json();
    const { firstName, lastName, password, email } = requestData;
    // validate data
    validate(firstName, "firstName", { minLen: 4 });
    validate(lastName, "lastName", { minLen: 4 });
    validate(password, "password");
    validate(email, "email");
    // check if user already exist with same email
    let user = await User.findOne({ email });
    if (user) throw httpError("User already exist, please login");

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user
    user = new User({ firstName, lastName, password: hashedPassword, email });
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: `Account created successfully`,
      },
      { status: 200 }
    );
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

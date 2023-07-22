import mongoose from "mongoose";
export default async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`Connected successfully to database ${connection.name}`);
    });
    connection.on("error", (error) => {
      console.log("error while connecting to database");
      console.log(error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong with database");
    console.log(error);
  }
}

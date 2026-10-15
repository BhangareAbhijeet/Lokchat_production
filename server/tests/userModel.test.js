require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../src/domain/users/User");

async function testUserModel() {
  try {
    console.log("Testing User Model...");

    const user = new User({
      name: "Test User",
      email: "test@example.com",
      passwordHash: "example_hash_for_schema_test",
    });

    await user.validate();

    console.log("PASS: Valid user data accepted");

    const invalidUser = new User({
      email: "invalid@example.com",
      passwordHash: "example_hash_for_schema_test",
    });

    try {
      await invalidUser.validate();
      console.log("FAIL: Missing name was accepted");
      process.exitCode = 1;
    } catch (error) {
      if (error.errors?.name) {
        console.log("PASS: Missing name rejected");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("FAIL:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

testUserModel();
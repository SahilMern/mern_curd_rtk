import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Registration
const userRegister = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      address,
      location,
      city,
      state,
      country,
      password,
      confirmPassword,
    } = req.body;

    const requiredFields = [
      "username",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

    // Ensure all required fields are provided
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `${field} is required`,
          message: `${field} is required`,
          status: false,
        });
      }
    }

    // Check if the user already exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "User already registered with this email",
        status: false,
        error: "User already registered with this email",
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        status: false,
        error: "Passwords do not match",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      phone,
      address,
      location,
      city,
      state,
      country,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      status: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      error: "An error occurred during registration",
      message: error.message,
      status: false,
    });
  }
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const requiredFields = ["email", "password"];

    // Ensure all required fields are provided
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `${field} is required`,
          message: `${field} is required`,
          status: false,
        });
      }
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: "User not found",
        status: false,
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
        error: "Invalid credentials",
        status: false,
      });
    }

    // Generate JWT token
    const userData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userData, process.env.SECRET_KEY, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Set cookie with the token
    res.cookie("usercookies", token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      status: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      error: "An error occurred during login",
      message: error.message,
      status: false,
    });
  }
};

// All User Details
const userDetails = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: true,
      message: "All user details",
      users,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      error: "An error occurred while fetching user details",
      message: error.message,
      status: false,
    });
  }
};

// Single User Details
const singleUser = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        error: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User details retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching single user details:", error);
    res.status(500).json({
      error: "An error occurred while fetching user details",
      message: error.message,
      status: false,
    });
  }
};


//?Edit User data 
const userUpdate = async (req, res) => {
  try {
    console.log(req.body, "In single user");

    const {
      username,
      email,
      phone,
      address,
      location,
      city,
      state,
      country,
      password,
    } = req.body;

    console.log(username, email, phone, address, location, city, state, country, password);

    const requiredFields = [
      "username",
      "email",
      "phone",
      "password",
    ];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `${field} is required`,
          message: `${field} is required`,
          status: false,
        });
      }
    }


    const { id } = req.params;
    console.log(id, "UserId");

    const updateuser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        phone,
        address,
        location,
        city,
        state,
        country,
        password,
      },
      { new: true } // Correctly pass the option to return the updated document
    );

    return res.status(200).json({
      message: "User updated successfully",
      updateuser,
      status:true
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      status: false,
    });
  }
}

export { userRegister, userLogin, userDetails, singleUser, userUpdate };

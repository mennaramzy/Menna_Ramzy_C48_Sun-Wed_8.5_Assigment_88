import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../DB/model/user.model.js";
import { JWT_SECRET, SALT_ROUNDS } from "../../config/config.js";

export const signUpService = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "SignUp error", error: error.message });
  }
};

export const logInService = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login error", error: error.message });
  }
};
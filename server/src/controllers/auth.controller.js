const {
  createUser,
  findUserByEmail,
  findUserByPhoneNumber,
} = require("../services/auth.service");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { registerType, data } = req.body;

    if (!registerType || !data) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Required fields are missing",
        missingFields: {
          registerType: !registerType,
          data: !data,
        },
      });
    }

    if (data.password !== data.confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Passwords do not match",
      });
    }

    const isEmailAlreadyExists = await findUserByEmail(data.email);

    if (isEmailAlreadyExists) {
      return res.status(409).json({
        success: false,
        error: "EMAIL_ALREADY_EXISTS",
        message: "An account with this email already exists",
        fieldErrors: {
          email: "Already in use",
        },
      });
    }

    const isPhoneAlreadyExists = await findUserByPhoneNumber(data.mobile);

    if (isPhoneAlreadyExists) {
      return res.status(409).json({
        success: false,
        error: "PHONE_ALREADY_EXISTS",
        message: "An account with this phone number already exists",
        fieldErrors: {
          phoneNumber: "Already in use",
        },
      });
    }

    const user = await createUser(req.body);

    const jwtToken = generateToken({ userId: user.id });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token: jwtToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Required fields are missing",
        missingFields: {
          email: !email,
          password: !password,
        },
      });
    }

    // 2️⃣ Find user
    const user = await findUserByEmail(email.toLowerCase());

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "AUTH_FAILED",
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: "AUTH_FAILED",
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Generate token
    const jwtToken = generateToken({ userId: user.id });

    // 5️⃣ Success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: jwtToken,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          mobile: user.mobile,
          registerType: user.registerType,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};

const {
  createUser,
  findUserByEmail,
  findUserByPhoneNumber,
} = require("../services/auth.service");
const { generateToken } = require("../utils/jwt");

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

module.exports = {
  register,
};

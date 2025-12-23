const { generateToken } = require("../utils/jwt");
const { randomId } = require("../utils/randomId");

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

    const userId = randomId();
    const jwtToken = generateToken({ userId });

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

const crypto = require("crypto");

const randomId = () => {
  return crypto.randomBytes(12).toString("base64url").slice(0, 16);
};

module.exports = { randomId };

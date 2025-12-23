const prisma = require("../model/prisma");
const bcrypt = require("bcrypt");

const createUser = async (payload) => {
  const {
    registerType,
    data: {
      fullName,
      email,
      mobile,
      password,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      agreeTerms,
      coordinates,
      formattedAddress,
    },
  } = payload;

  // 1️⃣ Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 2️⃣ Insert into DB using Prisma
  const user = await prisma.user.create({
    data: {
      registerType: registerType.toUpperCase(), // USER
      fullName,
      email: email.toLowerCase(),
      mobile,
      passwordHash,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      agreeTerms,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      formattedAddress,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      mobile: true,
      registerType: true,
      createdAt: true,
    },
  });

  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  
  return user;
};

const findUserByPhoneNumber = async (phoneNumber) => {
  const user = await prisma.user.findFirst({
    where: {
      mobile: phoneNumber,
    },
  });

  return user;
};

module.exports = { createUser, findUserByEmail, findUserByPhoneNumber };

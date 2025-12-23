require("dotenv").config();
const app = require("./app");
const authRoutes = require("./router/auth.router");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);

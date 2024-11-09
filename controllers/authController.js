const {
  signUpService,
  loginService,
  getUserDetailsByEmail,
} = require("../services/authService");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await signUpService(email, password, name);
    res.status(201).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password);
    res.json({ user, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const getUserDetails = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserDetailsByEmail(email);

    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = { signUp, login, getUserDetails };

import User from '../model/user.model.js';
import bcrypt from 'bcrypt';

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, //  Save hashed password
    });

    await newUser.save(); //send the data to the database
    res.status(201).json({ message: "User created successfully", user:{ //  sends the data whoever is making a POST request to the backend with endpoint /User/signup
        //  this is the data that is sent to the frontend
        _id : newUser._id,
        username: newUser.username,
        email: newUser.email
    } });

  } catch (err) {
    console.error("Signup Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // ✅ Corrected method name
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login Successful",
      user: {
        name: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

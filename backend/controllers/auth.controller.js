import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js"; // Ensure the path is correct

// REGISTER FUNCTION
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10; // Adjust if necessary for performance/security balance
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user to the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond to the client
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const payload = {
      userId: user._id, // User ID to identify the user
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiry time as needed

    // Respond to the client
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      token, // Send token in the response
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT FUNCTION
export const logout = (req, res) => {
  // Since no JWT or session management is involved, simply notify the client
  res.status(200).json({
    message: "Logout successful. Please clear client-side credentials if stored.",
  });
};

// UPDATE PROFILE FUNCTION
export const updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.user.userId; // Get the user ID from the decoded token

    // Validate input
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required" });
    }

    // Find the user by ID (using the authenticated user's ID)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is already taken by another user
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id.toString() !== userId) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Update username and email
    user.username = username;
    user.email = email;

    // If password is provided, hash it and update it
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    // Save the updated user data
    await user.save();

    // Respond to the client
    res.status(200).json({
      message: "Profile updated successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// GET USER DETAILS FUNCTION
export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the decoded token (added by verifyToken middleware)

    // Find the user by ID
    const user = await User.findById(userId).select('-password'); // Exclude the password field for security reasons
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details
    res.status(200).json({
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


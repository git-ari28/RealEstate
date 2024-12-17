import PostDetails from "../models/PostDetails.js";

// Controller to add details for a post
export const addPostDetails = async (req, res) => {
  try {
    const { id, desc, utilities, pet, income, size, school, bus, restaurant } = req.body;

    // Create new PostDetails
    const newPostDetails = new PostDetails({
      id, // Refers to the post ID
      desc,
      utilities,
      pet,
      income,
      size,
      school,
      bus,
      restaurant,
    });

    const savedPostDetails = await newPostDetails.save();
    res.status(201).json({ message: "Post details added successfully", postDetails: savedPostDetails });
  } catch (error) {
    console.error("Error while adding post details:", error);
    res.status(500).json({ error: "Failed to add post details" });
  }
};

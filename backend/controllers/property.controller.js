import Property from "../models/Property.js";


export const addProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const imagePaths = req.files.map((file) => file.path); // Get image file paths

    if (!title || !description || !price || !location || imagePaths.length === 0) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      images: imagePaths, // Store image URLs
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", newProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });

    if (!updatedProperty) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error: error.message });
  }
};


export const deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error: error.message });
  }
};


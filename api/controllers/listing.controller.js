import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

//Create Listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

//Delete Listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

//Update Listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  //Check Authenticate User
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
//Get Listing
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
//Search Functionality
// controllers/listing.controller.js
// controllers/listing.controller.js
// controllers/listing.controller.js
export const getListings = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 9;
    const startIndex = Number(req.query.startIndex) || 0;

    // ----- TEXT SEARCH (name | address | description) -----
    const searchTerm = (req.query.searchTerm || "").trim();
    const textFilter = searchTerm
      ? {
          $or: [
            { name:        { $regex: searchTerm, $options: "i" } },
            { address:     { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    // ----- TYPE FILTER (rent | sale | all) - case/space tolerant -----
    const rawType = (req.query.type || "all").toString().trim().toLowerCase();
    const typeFilter =
      rawType === "all"
        ? { type: { $in: ["rent", "sale"] } }
        : { type: { $regex: `^${rawType}$`, $options: "i" } }; // matches "Rent", "rent ", etc.

    // ----- SORT -----
    const sortField = (req.query.sort || "createdAt").toString();
    const sortDir = (req.query.order || "desc").toString().toLowerCase() === "asc" ? 1 : -1;
    const sortObj = { [sortField]: sortDir };

    const listings = await Listing.find({
      ...textFilter,
      ...typeFilter,
    })
      .sort(sortObj)
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};



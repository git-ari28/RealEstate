import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTrash, FaHome, FaBed, FaBath, FaParking, FaTag } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-yellow-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Create New Listing
          </h1>
          <p className="mt-2 text-lg text-pink-900/70">Fill in the details of your property</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6 bg-white/80 p-6 rounded-xl border border-pink-200 shadow-[0_10px_30px_-10px_rgba(244,114,182,0.35)]">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-pink-900 mb-1">
                  Property Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                  placeholder="Beautiful Modern Apartment"
                  maxLength="62"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-pink-900 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                  placeholder="Describe your property in detail..."
                  required
                  onChange={handleChange}
                  value={formData.description}
                ></textarea>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-pink-900 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                  placeholder="123 Main St, City, State"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="rent"
                      name="type"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                      onChange={handleChange}
                      checked={formData.type === "rent"}
                    />
                    <label htmlFor="rent" className="ml-2 block text-sm text-pink-900">
                      For Rent
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sale"
                      name="type"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                      onChange={handleChange}
                      checked={formData.type === "sale"}
                    />
                    <label htmlFor="sale" className="ml-2 block text-sm text-pink-900">
                      For Sale
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="parking"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 rounded"
                      onChange={handleChange}
                      checked={formData.parking}
                    />
                    <label htmlFor="parking" className="ml-2 block text-sm text-pink-900 flex items-center">
                      <FaParking className="mr-1" /> Parking
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="furnished"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 rounded"
                      onChange={handleChange}
                      checked={formData.furnished}
                    />
                    <label htmlFor="furnished" className="ml-2 block text-sm text-pink-900">
                      Furnished
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="offer"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 rounded"
                      onChange={handleChange}
                      checked={formData.offer}
                    />
                    <label htmlFor="offer" className="ml-2 block text-sm text-pink-900 flex items-center">
                      <FaTag className="mr-1" /> Offer
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-pink-900 mb-1">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="bedrooms"
                      min="1"
                      max="10"
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                      onChange={handleChange}
                      value={formData.bedrooms}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaBed className="text-pink-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-pink-900 mb-1">
                    Bathrooms
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="bathrooms"
                      min="1"
                      max="10"
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                      onChange={handleChange}
                      value={formData.bathrooms}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaBath className="text-pink-300" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="regularPrice" className="block text-sm font-medium text-pink-900 mb-1">
                    Regular Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="regularPrice"
                      min="50"
                      max="10000000"
                      required
                      className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                      onChange={handleChange}
                      value={formData.regularPrice}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-pink-500">$</span>
                    </div>
                  </div>
                  {formData.type === "rent" && (
                    <p className="mt-1 text-xs text-pink-700/70">Per month</p>
                  )}
                </div>

                {formData.offer && (
                  <div>
                    <label htmlFor="discountPrice" className="block text-sm font-medium text-pink-900 mb-1">
                      Discounted Price
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="discountPrice"
                        min="0"
                        max="10000000"
                        required
                        className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white/90 text-pink-900 placeholder:text-pink-400 focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
                        onChange={handleChange}
                        value={formData.discountPrice}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-pink-500">$</span>
                      </div>
                    </div>
                    {formData.type === "rent" && (
                      <p className="mt-1 text-xs text-pink-700/70">Per month</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 bg-white/80 p-6 rounded-xl border border-pink-200 shadow-[0_10px_30px_-10px_rgba(244,114,182,0.35)]">
              <div>
                <label className="block text-sm font-medium text-pink-900 mb-2">
                  Property Images
                  <span className="text-xs text-pink-700/70 ml-1">(First image will be cover)</span>
                </label>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-pink-200 border-dashed rounded-lg cursor-pointer bg-pink-50/50 hover:bg-pink-50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <IoIosImages className="w-8 h-8 text-pink-400" />
                        <p className="mb-2 text-sm text-pink-700/80">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-pink-700/70">PNG, JPG (MAX. 2MB each)</p>
                      </div>
                      <input 
                        id="images" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => setFiles(e.target.files)}
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    disabled={uploading || files.length === 0}
                    onClick={handleImageSubmit}
                    className={`px-4 py-2 h-32 rounded-lg border flex flex-col items-center justify-center ${
                      uploading || files.length === 0
                        ? "bg-pink-50 text-pink-300 border-pink-100"
                        : "bg-gradient-to-b from-pink-100 to-yellow-100 text-pink-800 border-pink-200 hover:from-pink-200 hover:to-yellow-200"
                    } transition`}
                  >
                    <FaUpload className="w-6 h-6 mb-1" />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                  </button>
                </div>
                
                {imageUploadError && (
                  <p className="mt-2 text-sm text-rose-600">{imageUploadError}</p>
                )}
              </div>

              {formData.imageUrls.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-pink-900">
                    Uploaded Images ({formData.imageUrls.length}/6)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {formData.imageUrls.map((url, index) => (
                      <div key={url} className="relative group">
                        <img
                          src={url}
                          alt="listing"
                          className="w-full h-32 object-cover rounded-lg border border-pink-100"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || uploading}
                className={`w-full py-3 px-4 rounded-md shadow text-sm font-medium text-white transition ${
                  loading
                    ? "bg-pink-400"
                    : "bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500"
                } focus:outline-none focus:ring-4 focus:ring-pink-300/50`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Listing...
                  </span>
                ) : (
                  "Create Listing"
                )}
              </button>

              {error && (
                <div className="rounded-md bg-rose-50 p-4 border border-rose-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-rose-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-rose-800">Error</h3>
                      <div className="mt-2 text-sm text-rose-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

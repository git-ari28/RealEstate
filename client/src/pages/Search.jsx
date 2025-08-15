import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";

// Search Page
export default function Search() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ track query changes

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    // ✅ backend expects camelCase field names
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    // sync UI from URL
    setSidebardata((prev) => ({
      ...prev,
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      parking: parkingFromUrl === "true",
      furnished: furnishedFromUrl === "true",
      offer: offerFromUrl === "true",
      sort: sortFromUrl || "createdAt", // ✅ camelCase
      order: orderFromUrl || "desc",
    }));

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
      const data = await res.json();
      setShowMore(data.length > 8);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]); // ✅ re-run when query changes

  const handleChange = (e) => {
    // type (mutually exclusive checkboxes)
    if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: !!e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebardata({ ...sidebardata, sort: sort || "createdAt", order: order || "desc" });
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sidebardata.searchTerm) urlParams.set("searchTerm", sidebardata.searchTerm.trim());
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);   // ✅ createdAt or regularPrice
    urlParams.set("order", sidebardata.order); // ✅ asc/desc
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    if (data.length < 9) setShowMore(false);
    setListings((prev) => [...prev, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-yellow-50">
      {/* Sidebar */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-white/80 border-pink-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold text-pink-900">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-pink-200 rounded-lg p-3 w-full bg-white/90 text-pink-900 placeholder:text-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-pink-900">Type:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="all"
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span className="text-pink-800">Rent & Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span className="text-pink-800">Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span className="text-pink-800">Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span className="text-pink-800">Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-pink-900">Amenities:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span className="text-pink-800">Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span className="text-pink-800">Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold text-pink-900">Sort:</label>
            <select
              id="sort_order"
              onChange={handleChange}
              // ✅ controlled: reflects state & URL
              value={`${sidebardata.sort}_${sidebardata.order}`}
              className="border border-pink-200 rounded-lg p-3 bg-white/90 text-pink-900 focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-pink-400 transition"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white p-3 rounded-lg uppercase font-medium shadow hover:from-pink-600 hover:to-yellow-500 transition">
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b border-pink-200 p-3 text-pink-900 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-pink-800">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-pink-800 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-pink-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { FaSearch, FaHome, FaInfoCircle, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm.trim());
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    // Sync search box with URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.search]);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl",
        isScrolled
          ? "bg-white/80 shadow-lg border-b border-pink-200"
          : "bg-white/60 shadow-md border-b border-pink-100",
      ].join(" ")}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-tight">
            HomeHues
          </h1>
          <span className="ml-2 hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 group-hover:bg-pink-200 transition">
            beta
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 mx-4 md:mx-8 max-w-xl relative"
          role="search"
          aria-label="Property search"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search by city, price, or type…"
              className="w-full py-2.5 pl-4 pr-10 rounded-full border border-pink-200 bg-white/80 text-pink-900 placeholder:text-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300/40 focus:border-pink-400 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-pink-600 hover:text-pink-700 hover:bg-pink-100/70 transition"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link
            to="/"
            className="hidden md:flex items-center text-pink-800 hover:text-pink-900 hover:underline underline-offset-4 transition"
          >
            <FaHome className="mr-1" />
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            className="hidden md:flex items-center text-pink-800 hover:text-pink-900 hover:underline underline-offset-4 transition"
          >
            <FaInfoCircle className="mr-1" />
            <span>About</span>
          </Link>

          {/* Profile / Sign In */}
          {currentUser ? (
            <Link to="/profile" className="flex items-center">
              <div className="relative group">
                <img
                  className="h-9 w-9 rounded-full object-cover border-2 border-transparent"
                  src={currentUser.avatar}
                  alt="profile"
                  style={{
                    boxShadow:
                      "0 0 0 2px rgba(244,114,182,0.6), 0 0 0 4px rgba(250,204,21,0.35)",
                  }}
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-pink-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  My Profile
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/sign-in" className="flex items-center">
              <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-4 py-2 rounded-full shadow-md hover:shadow-pink-500/30 hover:from-pink-600 hover:to-yellow-500 transition">
                <FaUser className="text-sm" />
                <span className="text-sm font-semibold">Sign In</span>
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

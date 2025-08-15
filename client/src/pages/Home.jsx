import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import "swiper/css/pagination";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Navigation, Autoplay, Pagination]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch("/api/listing/get?offer=true&limit=4"),
          fetch("/api/listing/get?type=rent&limit=4"),
          fetch("/api/listing/get?type=sale&limit=4"),
        ]);
        const [offerData, rentData, saleData] = await Promise.all([
          offerRes.json(),
          rentRes.json(),
          saleRes.json(),
        ]);
        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-pink-50 to-yellow-50">
      {/* Hero Section */}
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-900/70 to-transparent z-10"></div>
  <div className="flex flex-col justify-center min-h-[500px] p-8 md:p-28 max-w-6xl mx-auto relative z-20">
    <h1 className="text-white font-bold text-4xl md:text-6xl leading-tight mb-4">
      Your <span className="text-yellow-300">Dream Home</span> Awaits
    </h1>
    <p className="text-pink-100 text-lg mb-8 max-w-2xl">
      From cozy corners to grand estates — explore homes that match your style, 
      your story, and your budget. Let us help you turn the key to your perfect future.
    </p>
    <div className="flex gap-4">
      <Link
        to="/search"
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 shadow-lg"
      >
        Explore Homes
      </Link>
      <Link
        to="/about"
        className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-pink-700 transition duration-300"
      >
        Why Choose Us?
      </Link>
    </div>
  </div>


        {/* Background Swiper */}
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="absolute inset-0 h-[500px] md:h-full w-full"
        >
          {offerListings.length > 0 ? (
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="w-full h-full"
                ></div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full bg-pink-200"></div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Featured Listings */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Special Offers */}
        {offerListings.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-pink-900">
                Special Offers
              </h2>
              <Link
                to="/search?offer=true"
                className="text-pink-600 hover:text-pink-800 font-medium flex items-center"
              >
                View all offers
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* For Rent */}
        {rentListings.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-pink-900">
                Places for Rent
              </h2>
              <Link
                to="/search?type=rent"
                className="text-pink-600 hover:text-pink-800 font-medium flex items-center"
              >
                View all rentals
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* For Sale */}
        {saleListings.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-pink-900">
                Places for Sale
              </h2>
              <Link
                to="/search?type=sale"
                className="text-pink-600 hover:text-pink-800 font-medium flex items-center"
              >
                View all properties
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl p-8 md:p-12 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-pink-50 mb-6 max-w-2xl mx-auto">
            Our team of real estate experts can help you find the perfect
            property that meets all your needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-pink-700 px-8 py-3 rounded-lg font-medium hover:bg-pink-50 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

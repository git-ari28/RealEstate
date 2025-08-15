import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Contact from "../components/Contact";
import { toast } from "react-toastify";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    toast.info(
      favorite ? 'Removed from favorites' : 'Added to favorites', 
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      }
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-50 via-pink-50 to-yellow-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-4 bg-gradient-to-b from-pink-50 via-pink-50 to-yellow-50">
      <h2 className="text-2xl font-bold text-rose-600 mb-4">Something went wrong!</h2>
      <p className="text-pink-800/80">We couldn't load the property details. Please try again later.</p>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto">
      {listing && !loading && !error && (
        <div className="space-y-8">
          {/* Image Gallery */}
          <div className="relative">
            <Swiper
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div 
                    className="h-[70vh] bg-cover bg-center"
                    style={{ backgroundImage: `url(${url})` }}
                  ></div>
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation Arrows */}
              <div className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-3 shadow-md cursor-pointer hover:bg-white transition">
                <FaChevronLeft className="text-pink-700" />
              </div>
              <div className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-3 shadow-md cursor-pointer hover:bg-white transition">
                <FaChevronRight className="text-pink-700" />
              </div>
            </Swiper>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={toggleFavorite}
                className="p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition"
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                {favorite ? (
                  <FaHeart className="text-rose-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-pink-700 text-xl" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition"
                aria-label="Share listing"
              >
                <FaShare className="text-pink-700 text-xl" />
              </button>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-3xl font-bold text-pink-900">{listing.name}</h1>
                <div className="flex items-center mt-2">
                  <p className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-yellow-500 bg-clip-text text-transparent">
                    {formatPrice(listing.offer ? listing.discountPrice : listing.regularPrice)}
                    {listing.type === 'rent' && <span className="text-base font-normal text-pink-800/70"> / month</span>}
                  </p>
                  {listing.offer && (
                    <div className="ml-4">
                      <span className="line-through text-pink-800/60">
                        {formatPrice(listing.regularPrice)}
                      </span>
                      <span className="ml-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        Save {formatPrice(listing.regularPrice - listing.discountPrice)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center text-pink-800/80">
                <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                <span>{listing.address}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    listing.type === 'rent'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                {listing.offer && (
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                    Special Offer
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="max-w-none">
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Description</h3>
                <p className="text-pink-800/80 leading-relaxed">{listing.description}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg border border-pink-200">
                  <FaBed className="text-pink-600 text-xl" />
                  <div>
                    <p className="font-medium text-pink-900">{listing.bedrooms}</p>
                    <p className="text-sm text-pink-800/70">{listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg border border-pink-200">
                  <FaBath className="text-pink-600 text-xl" />
                  <div>
                    <p className="font-medium text-pink-900">{listing.bathrooms}</p>
                    <p className="text-sm text-pink-800/70">{listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg border border-pink-200">
                  <FaParking className="text-pink-600 text-xl" />
                  <div>
                    <p className="font-medium text-pink-900">{listing.parking ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-pink-800/70">Parking</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-white/80 rounded-lg border border-pink-200">
                  <FaChair className="text-pink-600 text-xl" />
                  <div>
                    <p className="font-medium text-pink-900">{listing.furnished ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-pink-800/70">Furnished</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 rounded-xl border border-pink-200 shadow-[0_10px_30px_-10px_rgba(244,114,182,0.35)] p-6 sticky top-6">
                {currentUser && listing.userRef !== currentUser._id ? (
                  !contact ? (
                    <div className="space-y-4">
                      <button
                        onClick={() => setContact(true)}
                        className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-medium py-3 px-4 rounded-lg transition"
                      >
                        Contact Landlord
                      </button>
                      <button
                        onClick={toggleFavorite}
                        className="w-full flex items-center justify-center gap-2 border border-pink-200 text-pink-800 hover:bg-pink-50 font-medium py-3 px-4 rounded-lg transition"
                      >
                        {favorite ? (
                          <>
                            <FaHeart className="text-rose-500" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <FaRegHeart />
                            <span>Save Property</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <Contact listing={listing} />
                  )
                ) : (
                  <div className="text-center py-4">
                    <p className="text-pink-800/80">This is your listing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

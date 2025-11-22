"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuggestionList from "@/components/SuggestionList";
import Map from "@/components/Map";
import useRoute from "@/hooks/useRoutes";
import useGeoSearch from "@/hooks/useGeoSearch";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

export default function UserDashboard() {
  const [members, setMembers] = useState("");
  const [userLocation, setUserLocation] = useState<any>(null);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [dropLocation, setDropLocation] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [showFareScreen, setShowFareScreen] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [rideOTP, setRideOTP] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [rideOtp, setRideOtp] = useState("");
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [showArrivalBanner, setShowArrivalBanner] = useState(false);
  const [showArrivedBanner, setShowArrivedBanner] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [arrivalTimer, setArrivalTimer] = useState(null);
  const [arrivedTimer, setArrivedTimer] = useState(null);
  const [showRideCompleted, setShowRideCompleted] = useState(false);
  const [showRideSummary, setShowRideSummary] = useState(false);

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

 const [isSearching, setIsSearching] = useState(false);

  const [showDriverInfo, setShowDriverInfo] = useState(false);

  const { reverseGeocode } = useGeoSearch();
  const { getRoute } = useRoute();
  const { toast } = useToast();

  // Fare Calculation 
  const calculatedFare =
    distance && members ? distance * Number(members) * 1 : 0;

  //Authentication check
  const isUserLoggedIn = () => {
  // For now use localStorage (or cookies)
  return localStorage.getItem("accessToken") ? true : false;
};

  // Geo search
  const {
    results: pickupResults,
    searchLocation: searchPickup,
    setResults: setPickupResults,
  } = useGeoSearch();

  const {
    results: dropResults,
    searchLocation: searchDrop,
    setResults: setDropResults,
  } = useGeoSearch();

  const handleSelectPickup = (item: any) => {
    setPickup(item.display_name);
    setPickupResults([]);
    setUserLocation({ lat: item.lat, lng: item.lon });
  };

  const handleSelectDrop = async (item: any) => {
    setDrop(item.display_name);
    setDropLocation({ lat: item.lat, lng: item.lon });

    if (userLocation) {
      const route = await getRoute(userLocation, {
        lat: item.lat,
        lng: item.lon,
      });

      if (route) {
        setRouteCoords(route.coords);
        setDistance(route.distance);
      }
    }
  };

  const shareLocation = () => {
    if (!navigator.geolocation) return alert("Location unsupported");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      setUserLocation({ lat: latitude, lng: longitude });

      const niceName = await reverseGeocode(latitude, longitude);

      setPickup(niceName || `${latitude}, ${longitude}`);
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 pb-[160px]">
      {/* MAP */}
      <div className="w-full relative h-[50vh] md:h-[45vh] lg:h-[40vh]">
        <Map
          userLocation={userLocation}
          routeCoords={routeCoords}
          dropLocation={dropLocation}
        />

        {/* Back button ONLY when fare screen open */}
        {showFareScreen && (
          <Button
            onClick={() => setShowFareScreen(false)}
            className="absolute top-4 left-4 bg-white text-black text-xl px-3 py-2 rounded-full shadow z-[999]"
          >
            ←
          </Button>
        )}

        <Button
          onClick={shareLocation}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow z-[999]"
        >
          Share current location
        </Button>
      </div>

      {/* INPUT SECTION */}
      {/* HIDE EVERYTHING WHEN SEARCHING OR DRIVER INFO IS VISIBLE */}
<div className={`transition-all duration-300 
  ${isSearching || showDriverInfo ? "opacity-0 pointer-events-none" : "opacity-100"}
`}>

        <div className="mt-4 px-4 space-y-4">
          {/* PICKUP + DROP */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
            {/* PICKUP */}
            <div className="relative flex items-center h-12">
              <img src="/icons/pickup.png" className="absolute left-3 w-4 h-4" />
              <Input
                placeholder="Enter pick-up location"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  searchPickup(e.target.value);
                }}
                onBlur={() => setTimeout(() => setPickupResults([]), 150)}
                className="pl-10 border-0 shadow-none h-12 focus-visible:ring-0"
              />
            </div>

            <div className="w-full h-[1px] bg-gray-200 my-2"></div>

            {/* DROP */}
            <div className="relative flex items-center h-12">
              <img src="/icons/drop.png" className="absolute left-3 w-4 h-4" />
              <Input
                placeholder="Enter drop location"
                value={drop}
                onChange={(e) => {
                  setDrop(e.target.value);
                  searchDrop(e.target.value);
                }}
                onBlur={() => setTimeout(() => setDropResults([]), 150)}
                className="pl-10 border-0 shadow-none h-12 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Suggestions */}
          <SuggestionList
            results={pickupResults}
            onSelect={handleSelectPickup}
          />
          <SuggestionList results={dropResults} onSelect={handleSelectDrop} />

          {/* MEMBERS CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
            <div className="relative flex items-center h-12">
              <img
                src="/icons/members.png"
                className="absolute left-3 w-4 h-4"
              />
              <Input
                placeholder="Number of members"
                value={members}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numbers
                  if (!/^\d*$/.test(value)) return;

                  setMembers(value);

                  if (value !== "" && Number(value) > 15) {
                    toast({
                      title: "Limit Exceeded",
                      description: "Members cannot exceed 15.",
                      variant: "destructive",
                      duration: 2000,
                    });
                  }
                }}
                className="pl-10 border-0 shadow-none h-12 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        {/* FARE BUTTONS */}
        {members.trim() !== "" && (
          <div className="fixed inset-x-0 bottom-14 px-4 z-[900] animate-slideUp animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 flex justify-between w-full">
              <Button
                variant="outline"
                className="w-[45%] h-11 border-gray-400 rounded-full"
              >
                Back
              </Button>

              <Button
                className="w-[45%] h-11 bg-purple-600 text-white rounded-full"
                onClick={() => setShowFareScreen(true)}
              >
                Calculate fare
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* SLIDING FARE SCREEN */}
      <div
        className={`
          fixed inset-x-0 bottom-0 px-4 z-[999]
          ${showFareScreen ? "animate-slideUp" : "translate-y-full"}
        `}
      >
        <div className="bg-white rounded-t-3xl shadow-lg p-6 border border-gray-200">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Total distance</p>
            <p className="font-semibold">{distance?.toFixed(2)} KM</p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Calculated fare</p>
            <p className="font-bold text-green-600">
              ₹{calculatedFare.toFixed(2)}
            </p>
          </div>

<Button
  className="w-full bg-purple-600 text-white rounded-full h-11"
  onClick={() => {
    if (!isUserLoggedIn()) {
      window.location.href = "/login";
      return;
    }

    // User logged in → start searching
    setIsSearching(true);

    // After 5 sec show driver info screen
    setTimeout(() => {
      setIsSearching(false);
      setShowDriverInfo(true);
    }, 5000);
  }}
>
  Search ride
</Button>

        </div>
      </div>
        {/* SEARCHING SCREEN */}
{isSearching && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] animate-fadeIn">
    <div className="bg-white rounded-2xl p-6 shadow-xl w-[80%] text-center">
      <img src="/driver-search.jpg" className="w-24 mx-auto mb-3 animate-pulse" />
      <h2 className="text-xl font-semibold">Hang on!</h2>
      <p className="text-gray-500 mt-1">Searching drivers near you</p>
    </div>
  </div>
)}
{/* DRIVER FOUND SCREEN */}
{showDriverInfo && (
  <div className="
    fixed inset-x-0 bottom-0 
    bg-white 
    rounded-t-3xl 
    shadow-xl 
    p-5 
    z-[9999] 
    animate-slideUp
  ">

    {/* Small top padding + handle */}
    <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

    {/* Title */}
    <h3 className="text-lg font-semibold mb-4">Driver info</h3>

    {/* Driver Card */}
    <div className="
      bg-white 
      border 
      rounded-2xl 
      p-5 
      shadow-md
    ">

      {/* Driver Row */}
      <div className="flex items-center gap-4">
        <img src="/driver.jpg" className="w-14 h-14 rounded-full" />
        <div>
          <p className="font-semibold text-base">Leo 	Amelia</p>
          <p className="text-gray-500 text-sm pt-1">5 min away from your location</p>
        </div>
      </div>

      {/* LARGE spacing between driver + car */}
      <div className="h-6"></div>

      {/* Car Row */}
      <div className="flex items-center gap-4">
        <img src="/car.png" className="w-24" />
        <div>
          <p className="font-semibold text-base">Toyota Hiace</p>
          <p className="text-gray-500 text-sm pt-1">Type – van</p>
          <p className="font-semibold pt-1">AUS 24 TX7956</p>
        </div>
      </div>
    </div>

    {/* Small padding before button */}
    <div className="h-4"></div>

    {/* Pay button */}
<Button
  className="w-full bg-purple-600 text-white rounded-full h-12"
  onClick={() => {
    setShowPaymentPopup(true);
  }}
>
  Pay Now
</Button>





    <div className="h-2"></div>
  </div>
)}


{/* PAYMENT POPUP */}
{showPaymentPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] animate-fadeIn">
    <div className="bg-white rounded-2xl p-6 shadow-xl w-[85%] max-w-sm">

      <h2 className="text-lg font-semibold text-center mb-4">Payment</h2>

      <p className="text-center text-gray-600 mb-6">
        Confirm payment to continue.
      </p>

      <Button
        className="w-full bg-purple-600 text-white rounded-full h-11"
        onClick={() => {
          setPaymentSuccess(true);
          setShowPaymentPopup(false);

          // Later show OTP
          setTimeout(() => {
            setPaymentSuccess(false);

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setRideOTP(otp);
            setShowOTP(true);
          }, 1500);
        }}
      >
        Pay Now
      </Button>
    </div>
  </div>
)}
  {paymentSuccess && (
  <div className="fixed inset-0 flex items-center justify-center z-[999999] animate-fadeIn">
    <div className="bg-white rounded-2xl p-6 w-[75%] shadow-lg text-center">
      <img src="/success.png" className="w-14 mx-auto mb-3" />
      <h3 className="text-lg font-semibold">Payment successful</h3>
      <p className="text-gray-500 mt-1">Have a happy and safe ride!</p>
    </div>
  </div>
)}

{showArrivalBanner && (
  <div className="
    fixed top-0 left-0 w-full 
    bg-purple-600 text-white 
    text-center py-3 font-semibold 
    rounded-b-2xl shadow-lg
    z-[999999]
    animate-slideDown
  ">
    Arriving in 5 minutes
  </div>
)}

{/* RIDE OTP SLIDE-UP */}
{showOTP && (
  <div className="
    fixed inset-x-0 bottom-0 
    bg-white rounded-t-3xl 
    shadow-xl p-6 
    z-[999999] 
    animate-slideUp
  ">
    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

    <h2 className="text-center text-lg font-semibold">Ride OTP</h2>

    <p className="text-center text-gray-500 text-sm mt-1 mb-4">
      Share OTP with your driver before starting the journey.
    </p>

    <p className="text-center text-3xl font-bold tracking-widest">
      {rideOTP}
    </p>

    <div className="mt-6">
<Button
  className="w-full bg-purple-600 text-white rounded-full h-12"
onClick={() => {
  setShowOTP(false);
  setShowDriverInfo(false);
  setShowRideDetails(true);

  // 1️⃣ First notification – "Arriving in 5 minutes"
  setTimeout(() => {
    setShowArrivalBanner(true);

    setTimeout(() => {
      setShowArrivalBanner(false);

      // 2️⃣ Second notification – "Driver has arrived"
      setTimeout(() => {
        setShowArrivedBanner(true);

        setTimeout(() => {
          setShowArrivedBanner(false);

          // 3️⃣ After some time → Show Ride Completed Popup
          setTimeout(() => {
            setShowRideCompleted(true);
          }, 3000); // show popup after driver has arrived

        }, 3000); // hide arrived banner
      }, 2000); // delay before showing arrived banner

    }, 3000); // hide arrival banner

  }, 2000);
}}






>
  OK
</Button>

    </div>
  </div>
)}

{showArrivedBanner && (
  <div className="
    fixed top-0 left-0 w-full 
    bg-green-600 text-white 
    text-center py-3 font-semibold 
    rounded-b-2xl shadow-lg
    z-[999999]
    animate-slideDown
  ">
    Driver has arrived
  </div>
)}




{/* FINAL RIDE DETAILS SCREEN */}
{showRideDetails && (
  <div className="
    fixed inset-x-0 bottom-0 
    bg-white rounded-t-3xl shadow-xl 
    p-6 z-[999999] 
    animate-slideUp
  ">
    <div className="h-10"></div>

    {/* OTP DISPLAY */}
    <div className="flex justify-end mb-3">
      <div className="bg-gray-100 px-4 py-2 rounded-full shadow text-sm font-semibold">
        OTP – {rideOTP}
      </div>
    </div>

    {/* DRIVER INFO CARD */}
    <div className="bg-white border rounded-2xl p-5 shadow-md">

      {/* Driver Row */}
      <div className="flex items-center gap-4">
        <img src="/driver.jpg" className="w-14 h-14 rounded-full" />
        <div>
          <p className="font-semibold text-base">Rohit Shetty</p>
          <p className="text-gray-500 text-sm pt-1">5 min away from your location</p>
        </div>
      </div>

      <div className="h-4"></div>

      {/* Car Row */}
      <div className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
        <img src="/car.png" className="w-24 rounded-lg" />
        <div>
          <p className="font-semibold text-base">Maruti Suzuki Swift</p>
          <p className="text-gray-500 text-sm">Type – Sedan</p>
          <p className="font-semibold">AUS 24 TX7956</p>
        </div>
      </div>
    </div>

    <div className="h-4"></div>

    {/* Cancel Ride */}
<Button
  onClick={() => setShowCancelPopup(true)}
  className="w-full border border-red-500 text-red-500 bg-white h-12 rounded-full"
>
  Cancel Ride
</Button>


    <div className="h-2"></div>
  </div>
)}
  {showCancelPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999999] animate-fadeIn">
    <div className="bg-white rounded-2xl p-6 w-[85%] max-w-sm text-center shadow-xl">

      <h3 className="text-lg font-semibold mb-3">Cancel Ride?</h3>
      <p className="text-gray-600 mb-6">
        Do you really want to cancel this ride?
      </p>

      <div className="flex gap-4">
        
        {/* CANCEL BUTTON */}
        <Button
          className="w-1/2 border border-red-500 text-red-500 bg-white h-10 rounded-full"
          onClick={() => {
            // Clear timers
            if (arrivalTimer) clearTimeout(arrivalTimer);
            if (arrivedTimer) clearTimeout(arrivedTimer);

            // Close all screens
            setShowCancelPopup(false);
            setShowRideDetails(false);
            setShowArrivalBanner(false);
            setShowArrivedBanner(false);

            // Reset main UI (GO HOME)
            window.location.reload(); 
          }}
        >
          Cancel Ride
        </Button>

        {/* KEEP RIDE BUTTON */}
        <Button
          className="w-1/2 bg-purple-600 text-white h-10 rounded-full"
          onClick={() => {
            setShowCancelPopup(false);
          }}
        >
          Keep Ride
        </Button>
      </div>
    </div>
  </div>
)}
    {showRideCompleted && (
  <div className="
    fixed inset-0 
    flex items-center justify-center 
    bg-black/40 
    z-[999999] animate-fadeIn
  ">
    <div className="bg-white w-[80%] rounded-2xl p-6 text-center shadow-xl">

      <img src="/success.png" className="w-20 mx-auto mb-4" />

      <h2 className="text-xl font-semibold mb-2">
        Hooray! Ride completed.
      </h2>

      <p className="text-gray-600 text-sm">
        Hope you had a safe and comfortable journey.
      </p>

      <div className="mt-6">
<Button
  className="w-full bg-purple-600 text-white rounded-full h-11"
  onClick={() => {
    setShowRideCompleted(false);

    // Add slight delay so popup fades out nicely
    setTimeout(() => {
      setShowRideSummary(true);
    }, 300);
  }}
>
  OK
</Button>

      </div>

    </div>
  </div>
)}

{/* RIDE SUMMARY SLIDE-UP */}
{showRideSummary && (
  <div
    className="
      fixed inset-x-0 bottom-0 
      bg-white 
      rounded-t-3xl 
      shadow-xl 
      p-5 
      z-[999999] 
      animate-slideUp
      max-h-[88vh]
      overflow-y-auto
    "
  >
    {/* Header */}
    <h2 className="text-lg font-semibold mb-4">Ride Summary</h2>

    {/* Map Image */}
    <img 
      src="/ride-summary.png"     // <-- your uploaded UI image
      className="w-full rounded-2xl mb-4"
    />

    {/* Time */}
    <p className="text-gray-700 text-center mb-3">
      ⚡ Destination reached in <span className="font-semibold">30 minutes.</span>
    </p>

    {/* Locations */}
    <div className="space-y-4 mb-4">
      <div className="flex justify-between">
        <p className="text-gray-700">
          H – 890, East Area XYZ, Victoria...
        </p>
        <p className="text-gray-500">04:00 PM</p>
      </div>

      <div className="flex justify-between">
        <p className="text-gray-700">
          I – 12, West side XYZ, Victoria...
        </p>
        <p className="text-gray-500">04:30 PM</p>
      </div>
    </div>

    {/* Journey Summary Card */}
    <div className="bg-gray-100 p-4 rounded-2xl mb-4">
      <p className="font-semibold">Journey covered – 14 Km</p>
      <p className="text-gray-600 mt-1">
        Payment ID – #QUDB5638739KD
      </p>
    </div>

    {/* Driver Card */}
    <div className="bg-white border shadow p-4 rounded-2xl mb-4">
      <h3 className="text-lg font-semibold mb-2">Driver info</h3>

      <div className="flex items-center gap-4">
        <img src="/driver.jpg" className="w-14 h-14 rounded-full" />
        <div>
          <p className="font-semibold">Rohit Shetty</p>
          <p className="text-gray-500 text-sm">Maruti Suzuki Swift</p>
          <p className="text-gray-600 text-sm">AUS 24 TX7956</p>
        </div>
        <img src="/car.png" className="w-20 ml-auto" />
      </div>
    </div>

    <Button
      onClick={() => window.location.reload()}
      className="w-full bg-purple-600 text-white rounded-full h-12"
    >
      Back to Home
    </Button>

    <div className="h-20"></div>
  </div>
)}


</div>   
);        
}       
  


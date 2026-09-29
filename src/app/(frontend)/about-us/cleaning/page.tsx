"use client";
import { useState, useEffect } from "react";
import Slider from "./components/Slider";
import Toggle from "./components/Toggle";
import PriceDisplay from "./components/PriceDisplay";
import { getTotalPrice } from "./lib/pricing";

export default function CleaningPage() {
  const [sqft, setSqft] = useState(110);
  const [rooms, setRooms] = useState(5);
  const [baths, setBaths] = useState(5);

  const [addons, setAddons] = useState({
    interiorWindows: true,
    carpetCleaning: false,
  });

  const [hasPets, setHasPets] = useState(true);
  const [homeType, setHomeType] = useState("Standalone House");

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      getTotalPrice({
        sqft,
        rooms,
        baths,
        addons,
        hasPets,
        homeType,
      })
    );
  }, [sqft, rooms, baths, addons, hasPets, homeType]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Service Type</h1>

      {/* Cleaning Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select className="border p-3 rounded">
          <option>Move in/out Cleaning</option>
        </select>

        <select className="border p-3 rounded">
          <option>Monthly</option>
        </select>
      </div>

      {/* Package */}
      <div>
        <label className="font-semibold">Cleaning Package</label>
        <select className="border p-3 rounded w-full mt-2">
          <option>Basic Cleaning</option>
        </select>
      </div>

      {/* Space Size */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Space Size</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-semibold mb-1">Square Footage</p>
            <Slider value={sqft} max={5000} onChange={setSqft} />
          </div>

          <div>
            <p className="font-semibold mb-1">Room Number</p>
            <Slider value={rooms} max={10} onChange={setRooms} />
          </div>

          <div>
            <p className="font-semibold mb-1">Bathroom Number</p>
            <Slider value={baths} max={10} onChange={setBaths} />
          </div>
        </div>
      </div>

      {/* Add ons */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add-On Services (Optional)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Toggle
            label="Interior Windows"
            value={addons.interiorWindows}
            onChange={() =>
              setAddons({ ...addons, interiorWindows: !addons.interiorWindows })
            }
          />

          <Toggle
            label="Carpet Cleaning"
            value={addons.carpetCleaning}
            onChange={() =>
              setAddons({ ...addons, carpetCleaning: !addons.carpetCleaning })
            }
          />
        </div>
      </div>

      {/* Additional */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="border p-3 rounded">
            <option>During Business Hours</option>
          </select>

          <select
            className="border p-3 rounded"
            onChange={e => setHasPets(e.target.value === "Yes")}
          >
            <option>Yes</option>
            <option>No</option>
          </select>

          <select
            className="border p-3 rounded"
            value={homeType}
            onChange={e => setHomeType(e.target.value)}
          >
            <option>Standalone House</option>
            <option>Apartment</option>
          </select>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-6">
        <PriceDisplay amount={total} />

        <button className="bg-orange-500 px-8 py-3 text-white rounded-full hover:bg-orange-600">
          NEXT
        </button>
      </div>
    </div>
  );
}

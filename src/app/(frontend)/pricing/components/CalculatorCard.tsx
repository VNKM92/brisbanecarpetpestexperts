"use client";

import { useState, useEffect } from "react";
import Slider from "./Slider";
import Toggle from "./Toggle";
import Select from "./Select";
import PriceBox from "./PriceBox";
import { calculateTotal } from "../utils/pricing";

export default function CalculatorCard() {
  const [data, setData] = useState({
    square: 800,
    rooms: 1,
    bathrooms: 1,
    addons: {
      fridge: false,
      oven: false,
      windows: false,
      carpet: false,
      balcony: false,
      laundry: false,
      linen: false,
      furniture: false,
    },
    time: "During Business Hours",
    pets: "No",
    homeType: "Apartment / Condo",
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calculateTotal(data));
  }, [data]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-7xl mx-auto mt-10">

      {/* Service Title */}
      <h2 className="text-2xl font-bold mb-6">Cleaning Estimate</h2>

      {/* Sliders */}
      <div className="grid md:grid-cols-3 gap-8">
        <Slider
          label="Square Footage"
          min={300}
          max={5000}
          value={data.square}
          onChange={(v: any) => setData({ ...data, square: v })}
        />
        <Slider
          label="Room Number"
          min={1}
          max={10}
          value={data.rooms}
          onChange={(v: any) => setData({ ...data, rooms: v })}
        />
        <Slider
          label="Bathroom Number"
          min={1}
          max={10}
          value={data.bathrooms}
          onChange={(v: any) => setData({ ...data, bathrooms: v })}
        />
      </div>

      {/* Add-ons */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Add-On Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {Object.keys(data.addons).map((key) => (
          <Toggle
            key={key}
            label={key.replace(/^\w/, (c) => c.toUpperCase())}
            checked={data.addons[key as keyof typeof data.addons]}
            onChange={(c: any) =>
              setData({ ...data, addons: { ...data.addons, [key]: c } })
            }
          />
        ))}
      </div>

      {/* Additional Info */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Additional Info</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <Select
          label="Preferred Cleaning Time"
          value={data.time}
          options={["During Business Hours", "Morning", "Afternoon", "Evening"]}
          onChange={(v: any) => setData({ ...data, time: v })}
        />
        <Select
          label="Pets"
          value={data.pets}
          options={["No", "Yes"]}
          onChange={(v: any) => setData({ ...data, pets: v })}
        />
        <Select
          label="Home Type"
          value={data.homeType}
          options={["Apartment / Condo", "House", "Townhouse"]}
          onChange={(v: any) => setData({ ...data, homeType: v })}
        />
      </div>

      {/* Total Box */}
      <PriceBox total={total} />
    </div>
  );
}

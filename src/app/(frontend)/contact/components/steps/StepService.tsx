"use client";

import Select from "../Select";

export default function StepService({ next }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Service Type</h2>

      <Select
        label="Cleaning Type"
        value="Home Cleaning"
        options={["Home Cleaning", "Office Cleaning"]}
        onChange={() => {}}
      />

      <button
        onClick={next}
        className="mt-8 bg-brand.orange text-white px-6 py-3 rounded-lg font-semibold"
      >
        Continue →
      </button>
    </div>
  );
}

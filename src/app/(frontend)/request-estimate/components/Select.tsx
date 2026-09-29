"use client";

export default function Select({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mt-1"
      >
        {options.map((o: any) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

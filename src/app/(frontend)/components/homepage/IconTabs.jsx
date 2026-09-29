export default function IconTabs() {
  return (
    <div className="flex gap-10 mb-8 fade-in">
      <Tab icon="/icons/residential.png" label="Residential" />
      <Tab icon="/icons/commercial.png" label="Commercial" />
      <Tab icon="/icons/outdoor.png" label="Outdoor" active />
    </div>
  );
}

function Tab({ icon, label, active }) {
  return (
    <div
      className={`flex flex-col items-center transition transform hover:scale-110 ${
        active ? "text-blue-700" : "text-gray-600 dark:text-gray-300"
      }`}
    >
      <img src={icon} className="w-10 h-10 mb-1" alt={label} />
      <span className={`text-sm ${active ? "font-semibold" : ""}`}>
        {label}
      </span>
    </div>
  );
}

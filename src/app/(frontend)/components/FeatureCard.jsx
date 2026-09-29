export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg w-full md:w-1/5">
      <div className="text-green-500 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-center text-gray-600">{description}</p>
    </div>
  )
}

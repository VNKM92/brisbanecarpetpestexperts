export default function PriceBox({ total }: any) {
  return (
    <div className="flex flex-col md:flex-row justify-end items-center gap-4 mt-10">
      <div className="bg-green-700 text-white px-8 py-3 rounded-lg text-xl font-bold">
        ${total.toFixed(2)}
      </div>

      <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg font-semibold transition">
        NEXT
      </button>
    </div>
  );
}

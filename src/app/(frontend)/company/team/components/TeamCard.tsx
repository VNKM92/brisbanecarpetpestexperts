import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  img: string;
}

export default function TeamCard({ name, role, img }: TeamCardProps) {
  return (
    <div className="rounded-xl shadow-md bg-white overflow-hidden hover:shadow-xl transition-all">
      <Image
        src={img}
        alt={name}
        width={500}
        height={500}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
}

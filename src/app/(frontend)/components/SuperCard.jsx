import Image from 'next/image';

const SuperCard = ({ image, title, date, category, description, link }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="relative w-full h-64">
        <Image 
          src={image} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-600 font-semibold">{category}</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="text-xl font-semibold mt-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <a href={link} className="text-green-600 font-semibold mt-3 inline-block">Read More</a>
      </div>
    </div>
  );
}

export default SuperCard;

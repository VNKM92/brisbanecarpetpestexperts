import Image from 'next/image';

const TestimonialCard = ({ name, photo, children }) => {
  return (

    <>
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <p className="text-base sm:text-lg text-gray-600 mb-6 italic">"{children}"</p>
      <div className="flex items-center">
        <div className="relative w-16 h-16 mr-4">
          <Image
            src={photo}
            alt={name}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 64px, 64px"
          />
        </div>
        <span className="font-semibold text-gray-800">{name}</span>
      </div>
    </div>

    

      
     


    </>
  );
};

export default TestimonialCard;

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

const SuperCard = ({ image, title, date, category, description, link }) => {
  return (
    <article className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gray-100">
          <Image
            src={image || '/images/article1.jpg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm mt-2.5 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <Link
          href={link || '/blog'}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 group-hover:text-emerald-900 transition"
        >
          Read Full Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default SuperCard;

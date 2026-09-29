"use client";

export default function HomeAbout() {


  return (
    <div className="bg-[#f9f7f3 antialiased"> 
        {/* new changes */}

        <section className="bg-[#f9f7f3] py-16 px-4 gap-x-8 mb-[155px]">
          <div className="max-w-7xl mx-auto">

            {/* <!-- Header --> */}
            <div className="text-center mb-16">
              <p className="text-orange-500 font-semibold mb-2">About us</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Honest. Simple. Qleen.
              </h1>
              <p className="text-lg text-gray-600">
                Your satisfaction is our priority.
              </p>
            </div>

            {/* <!-- 12 Column Grid --> */}
            <div className="grid grid-cols-12 gap-12 items-start">

              {/* <!-- LEFT : 8 Columns --> */}
              <div className="col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                {/* <!-- Feature --> */}
                <div className="flex gap-4">
                  <span className="w-14 h-6 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Trust</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Trust is our paramount value. All of our employees go through work authorization check.
                    </p>
                  </div>
                </div>

                {/* <!-- Feature --> */}
                <div className="flex gap-4">
                  <span className="w-12 h-6 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quality</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Excellent performance, flat rates, no surprises. Five star rating on Google.
                    </p>
                  </div>
                </div>

                {/* <!-- Feature --> */}
                <div className="flex gap-4">
                  <span className="w-14 h-6 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Care</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Average response time is less than 10 minutes. You can call, e-mail, text or message us.
                    </p>
                  </div>
                </div>

                {/* <!-- Feature --> */}
                <div className="flex gap-4">
                  <span className="w-12 h-6 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">People</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We pay good wages, health benefits and retirement, and abide by the laws.
                    </p>
                  </div>
                </div>

              </div>

              {/* <!-- RIGHT : 4 Columns --> */}
              <div className="col-span-12 lg:col-span-6 relative bg-white rounded-3xl p-15 shadow-sm ">

                <h2 className="text-5xl font-bold text-green-600 mb-2">
                  96%
                </h2>
                <p className="text-xl font-semibold mb-6">
                  Satisfaction Rate*
                </p>

                <p className="text-sm text-gray-500">
                  *Based on 356 reviews on Google
                </p>

                {/* <!-- Image --> */}
                <img
                  src="/assets/home/image/home-about.png"
                  alt="Satisfaction"
                  className="absolute right-0 bottom-0 w-36 sm:w-44 md:w-52 object-contain"
                />
              </div>

            </div>
          </div>
        </section>


       
    </div>
  );
}

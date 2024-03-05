import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
          <div className="flex items-end justify-center w-full">
            <div className="relative w-2/4 mr-4 text-left lg:w-full xl:w-1/2 md:w-full">
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500"
                placeholder="Number, Title ..."
              />
            </div>
            <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
              Search
            </button>
          </div>

          {/* HOUBUNG LA */}
          <h2 className="py-5"> HOUBUNG LA </h2>
          <div className="flex flex-col w-5/6 ">
            <div>
              <ul className="space-y-2">
                <li className="flex items-center ">
                  <span className="mr-2 text-gray-500">1.</span>
                  <span className="font-medium">John Doe</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-gray-500">2.</span>
                  <span className="font-medium">Jane Smith</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

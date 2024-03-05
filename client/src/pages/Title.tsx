import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Title: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex items-center h-screen mx-auto ">
      <div className="w-full mx-auto text-center border-2 bg-dark-50">
        <p
          onClick={() => navigate('/lyric')} // Original navigate functionality
          className="font-bold text-center md:text-6xl 2xl:text-8xl"
        >
          1.Eisem’a Eihuhhingpau chu vahchoiyun
        </p>
        {/* Back button using Link component */}
        <Link to="/" className="block py-4 mb-4 text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
};

// src/components/Trilha/TrailCard.jsx

import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import PropTypes from 'prop-types';

const TrailCard = ({ exoplanet }) => {
  return (
    <div className="bg-[#1a1a40] text-white border-2 border-solid border-white px-14 py-16 rounded-md max-w-[800px] flex flex-col gap-7 m-auto mt-9 leading-6">
      <h1 className='text-3xl'>In Search of Earth 2.0</h1>
      <TypeAnimation
        sequence={[
          `Embark on an interstellar journey with "In Search of Earth 2.0," a meticulously crafted trail that guides explorers through a selection of exoplanets mirroring Earth's size and conditions. Traverse planets orbiting within the habitable zones of G and K-type stars, each located within 50 parsecs from our solar system. This immersive experience delves into the quest for habitable exoplanets, aligning with the primary objectives of HWO, and captivates enthusiasts passionate about extraterrestrial life and the potential for a "Second Earth."`,
          1000,
        ]}
        speed={85}
        wrapper="span"
        cursor={true}
        repeat={0}
      />
      <Link to={`/exoplanet/${exoplanet.id}`} className="border-2 border-solid border-white px-3 py-4 rounded-md cursor-pointer text-xs ml-auto">Start</Link>
    </div>
  );
};

TrailCard.propTypes = {
  exoplanet: PropTypes.object.isRequired,
};

export default TrailCard;

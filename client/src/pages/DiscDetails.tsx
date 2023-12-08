import { useNavigate, useParams } from 'react-router-dom';
import { Disc } from './DiscCatalog';
import { useEffect, useState } from 'react';
import { fetchDisc } from '../lib/fetch';
import { FaArrowLeft } from 'react-icons/fa6';

export function DiscDetails() {
  const { discId } = useParams();
  const [discData, setDiscData] = useState<Disc>();
  const navigate = useNavigate();

  function onBackClick() {
    navigate('/disc-catalog');
  }

  useEffect(() => {
    async function loadDisc(discId: number) {
      try {
        const currentDisc = await fetchDisc(discId);
        setDiscData(currentDisc);
      } catch (err) {
        console.error(err);
      }
    }
    if (discId) {
      loadDisc(+discId);
    }
  }, [discId]);

  if (!discData) return null;

  const {
    name,
    brand,
    image1Url,
    price,
    plastic,
    speed,
    glide,
    turn,
    fade,
    classification,
    stability,
  } = discData;

  const flight = `${speed} | ${glide} | ${turn} | ${fade}`;

  return (
    <>
      <div>
        <button
          onClick={() => onBackClick()}
          className="flex flex-nowrap items-center">
          <FaArrowLeft />
          back to catalog
        </button>
      </div>
      <div className="w-full flex flex-row h-screen flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <div className="imageContainer">
            <img className="w-full" src={image1Url} alt={name}></img>
          </div>
        </div>
        <div className="flex justify-center w-full md:w-1/2">
          <div className="w-full">
            <h5>Mold: {name}</h5>
            <p>Brand: {brand}</p>
            <p>Plastic: {plastic}</p>
            <p>Flight Numbers: {flight}</p>
            <p>Type: {classification}</p>
            <p>Stability: {stability}</p>
            <p>Price: {price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

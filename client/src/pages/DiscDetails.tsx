import { useParams } from 'react-router-dom';
import { Disc } from './DiscCatalog';
import { useEffect, useState } from 'react';
import { fetchDisc } from '../lib/fetch';
import { FaArrowLeft } from 'react-icons/fa6';

export function DiscDetails() {
  const { discId } = useParams();
  const [discData, setDiscData] = useState<Disc>();

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
        <button>
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
            <h5>{name}</h5>
            <p>{brand}</p>
            <p>{plastic}</p>
            <p>{flight}</p>
            <p>{classification}</p>
            <p>{stability}</p>
            <p>{price}</p>
          </div>
          {/* <button>Bag It!</button>
        <button>Buy It!</button> */}
        </div>
      </div>
    </>
  );
}

import { useParams } from 'react-router-dom';
import { Disc } from './DiscCatalog';
import { useEffect, useState } from 'react';
import { fetchDisc } from '../lib/fetchDiscs';

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
    <div>
      <p>DISC DETAILS PAGE</p>
      <div>
        <h5>{name}</h5>
        <p>{brand}</p>
        <p>{plastic}</p>
        <p>{flight}</p>
        <p>{classification}</p>
        <p>{stability}</p>
        <p>{price}</p>
        <button>Bag It!</button>
        <button>Buy It!</button>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import './DiscCatalog.css';
import { fetchDiscs } from '../lib/fetchDiscs';
import { Link } from 'react-router-dom';

export type Disc = {
  discId: number;
  price: number;
  name: string;
  brand: string;
  classification: string;
  plastic: string;
  stability: string;
  weight: number;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
};
export type DiscArray = Disc[];

export function DiscCatalog() {
  const [discsData, setDiscsData] = useState<DiscArray>([]);

  useEffect(() => {
    async function readDiscsData() {
      try {
        const data: DiscArray = await fetchDiscs();

        console.log('Data from server:', data);

        setDiscsData(data);
      } catch (error) {
        throw new Error('an error occured loading products');
      }
    }
    readDiscsData();
  }, []);

  return (
    <div className="catalogContainer">
      <div className="filterColumn">
        <h5>filter & sort</h5>
        <p>by brand</p>
        <p>by stability</p>
        <p>by flight</p>
        <p>by type</p>
      </div>
      <div className="catalogColumn">
        <div className="row">
          {discsData?.map((disc) => (
            <div key={disc.discId} className="card">
              <DiscCard disc={disc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type DiscsCardProps = {
  disc: Disc;
};

function DiscCard({ disc }: DiscsCardProps) {
  const {
    discId,
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
  } = disc;
  const flight = `${speed} | ${glide} | ${turn} | ${fade}`;

  return (
    <Link to={`/disc-details/${discId}`}>
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
    </Link>
  );
}

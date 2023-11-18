import { useEffect, useState } from 'react';
import './DiscCatalog.css';

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
  const [discData, setDiscData] = useState<DiscArray>([]);

  useEffect(() => {
    async function readServerData() {
      try {
        const resp = await fetch('/api/discs');
        const data: DiscArray = await resp.json();

        console.log('Data from server:', data);

        setDiscData(data);
      } catch (error) {
        throw new Error('an error occured loading products');
      }
    }
    readServerData();
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
          {discData?.map((disc) => (
            <div key={disc.discId} className="card">
              <DiscCard disc={disc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type DiscCardProps = {
  disc: Disc;
};

function DiscCard({ disc }: DiscCardProps) {
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
  } = disc;
  const flight = `${speed} | ${glide} | ${turn} | ${fade}`;

  return (
    <>
      <h5>{name}</h5>
      <p>{brand}</p>
      <p>{plastic}</p>
      <p>{flight}</p>
      <p>{classification}</p>
      <p>{stability}</p>
      <p>{price}</p>
    </>
  );
}

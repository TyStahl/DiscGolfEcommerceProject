import { useContext } from 'react';
import { Disc } from './DiscCatalog';
import { FaRegTrashCan } from 'react-icons/fa6';
import { AppContext } from '../components/AppContext';
import { ScatterChart } from '../components/ScatterChart';

export type CartArray = (Disc & { quantity: number })[];

export function Bag() {
  const { bagData } = useContext(AppContext);

  return (
    <div className="flex flex-wrap">
      <div className="w-1/4">
        {bagData?.map((disc) => (
          <div key={disc.discId} className="border rounded">
            <BagCard disc={disc} />
          </div>
        ))}
      </div>
      <div className="sm: w-3/4 md:w-1/2">
        <ScatterChart />
      </div>
    </div>
  );
}
type CartCardProps = { disc: Disc };

function BagCard({ disc }: CartCardProps) {
  const { handleRemoveFromBag } = useContext(AppContext);

  const { discId, name, image1Url, speed, glide, turn, fade } = disc;
  const flight = `${speed} | ${glide} | ${turn} | ${fade}`;

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-1/4">
          <img className="w-full" src={image1Url} alt={name}></img>
        </div>
        <div className="w-3/4">
          <h5>{name}</h5>
          <p>{flight}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <FaRegTrashCan onClick={() => handleRemoveFromBag(discId)} /> remove
      </div>
    </>
  );
}

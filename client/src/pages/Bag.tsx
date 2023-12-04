import { useContext, useEffect } from 'react';
import { fetchUsersBag } from '../lib/fetch';
import { Disc, DiscArray } from './DiscCatalog';
import { FaRegTrashCan } from 'react-icons/fa6';
import { AppContext } from '../components/AppContext';

export type CartArray = (Disc & { quantity: number })[];

export function Bag() {
  const { bagData, setBagData } = useContext(AppContext);

  useEffect(() => {
    async function readBagData() {
      try {
        const data: DiscArray = await fetchUsersBag();

        console.log('bag data from server:', data);

        setBagData(data);
      } catch (error) {
        throw new Error('an error occured loading products');
      }
    }
    readBagData();
  }, [setBagData]);

  return (
    <div>
      <p>Bag Page</p>
      <div>
        {bagData?.map((disc) => (
          <div key={disc.discId} className="card">
            <BagCard disc={disc} />
          </div>
        ))}
      </div>
    </div>
  );
}
type CartCardProps = { disc: Disc };

function BagCard({ disc }: CartCardProps) {
  const { handleRemoveFromBag } = useContext(AppContext);

  const {
    discId,
    name,
    brand,
    // price,
    image1Url,
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
    // <Link to={`/disc-details/${discId}`}>
    <>
      <div className="w-1/4">
        <img className="w-full" src={image1Url} alt={name}></img>
      </div>
      <div>
        <h5>{name}</h5>
        <p>{brand}</p>
        <p>{plastic}</p>
        <p>{flight}</p>
        <p>{classification}</p>
        <p>{stability}</p>
        {/* <p>{price}</p> */}
        {/* <Link to={'/cart'}>
        <button>Bag It!</button>
        </Link>
        <Link to={'/cart'}>
        <button>Buy It!</button>
        </Link> */}
      </div>
      <div className="flex items-center">
        <FaRegTrashCan
          onClick={() => handleRemoveFromBag(discId)}
          className="text-4xl"
        />{' '}
        remove
      </div>
    </>
    // </Link>
  );
}

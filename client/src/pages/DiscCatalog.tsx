import { useContext, useEffect, useState } from 'react';
import './DiscCatalog.css';
import { fetchDiscs, toDollars } from '../lib/fetch';
import { Link } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { FaCheck } from 'react-icons/fa6';

export type Disc = {
  discId: number;
  price: number;
  image1Url: string;
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

export type CartDisc = Disc & { quantity: number };

export type DiscArray = Disc[];

export function DiscCatalog() {
  const [discsData, setDiscsData] = useState<DiscArray>([]);
  useEffect(() => {
    async function readDiscsData() {
      try {
        const data: DiscArray = await fetchDiscs();
        console.log('disc Data from server:', data);
        setDiscsData(data);
      } catch (error) {
        throw new Error('an error occured loading products');
      }
    }
    readDiscsData();
  }, []);

  return (
    <div className="flex">
      <div className="w-full flex justify-center">
        <div className="container row flex flex-wrap justify-around gap-4 mt-4 ">
          {discsData?.map((disc) => (
            <div
              key={disc.discId}
              className="shadow-xl border border-red-50 rounded sm:w-full md:w-2/5 lg:w-1/5">
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
  const { bagData, cartData, handleAddToBag, handleAddToCart, IsLoggedIn } =
    useContext(AppContext);

  function onCartClick(discId: number) {
    if (!IsLoggedIn) {
      alert('Log in to add to your cart');
    }
    handleAddToCart(discId);
  }

  function onBagClick(discId: number) {
    if (!IsLoggedIn) {
      alert('Log in to add to your cart');
    }
    handleAddToBag(discId);
  }
  const {
    image1Url,
    discId,
    name,
    brand,
    price,
    plastic,
    speed,
    glide,
    turn,
    fade,
  } = disc;

  const flight = `${speed} | ${glide} | ${turn} | ${fade}`;

  let isInCart = false;
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].discId === disc.discId) {
      isInCart = true;
    }
  }
  let isInBag = false;
  for (let i = 0; i < bagData.length; i++) {
    if (bagData[i].discId === disc.discId) {
      isInBag = true;
    }
  }

  if (!IsLoggedIn) {
    isInBag = false;
    isInCart = false;
  }

  return (
    <>
      <Link to={`/disc-details/${discId}`}>
        <div className="container">
          <img className="w-full" src={image1Url} alt={name}></img>
        </div>
        <div>
          <h5 className="text-center">
            {brand} | {plastic}
          </h5>
          <h5 className="text-center">{name}</h5>
          <p className="text-center">{flight}</p>
          <p className="text-center">{toDollars(price)}</p>
        </div>
      </Link>
      <div className="flex flex-nowrap">
        {isInBag ? (
          <button
            disabled
            className="w-1/2 border-2 flex flex-nowrap justify-center">
            <FaCheck />
            <p>in bag!</p>
          </button>
        ) : (
          <button
            className="w-1/2 border-2 flex flex-nowrap justify-center"
            onClick={() => onBagClick(discId)}>
            <p>Bag it!</p>
          </button>
        )}
        {isInCart ? (
          <button
            disabled
            className="w-1/2 border-2 flex flex-nowrap justify-center">
            <FaCheck />
            <p>in Bag!</p>
          </button>
        ) : (
          <button
            className="w-1/2 border-2 flex flex-nowrap justify-center"
            onClick={() => onCartClick(discId)}>
            <p>Buy It!</p>
          </button>
        )}
      </div>
    </>
  );
}

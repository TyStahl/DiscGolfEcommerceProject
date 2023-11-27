import { useEffect, useState } from 'react';
import './DiscCatalog.css';
import {
  fetchDiscs,
  fetchToBag,
  fetchToCart,
  fetchUsersBag,
  fetchUsersCart,
} from '../lib/fetch';
import { Link } from 'react-router-dom';
import { CartArray } from './Cart';

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
export type DiscArray = Disc[];

export function DiscCatalog() {
  const [discsData, setDiscsData] = useState<DiscArray>([]);
  const [cartData, setCartData] = useState<CartArray>([]);
  const [bagData, setBagData] = useState<DiscArray>([]);
  // const [isInCart, setIsInCart] = useState<boolean>();
  // const [isBagged, setIsBagged] = useState<boolean>(false);

  useEffect(() => {
    async function readDiscsData() {
      try {
        const data: DiscArray = await fetchDiscs();

        const cartData: CartArray = await fetchUsersCart();
        setCartData(cartData);
        const bagData: DiscArray = await fetchUsersBag();
        setBagData(bagData);

        console.log('disc Data from server:', data);
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
              <DiscCard disc={disc} cartData={cartData} bagData={bagData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type DiscsCardProps = {
  disc: Disc;
  cartData: CartArray;
  bagData: DiscArray;
};

function DiscCard({ disc, cartData, bagData }: DiscsCardProps) {
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

  async function handleAddToCart() {
    try {
      const data = await fetchToCart(discId);
      isInCart = true;
      console.log('added to cart: ', data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddToBag() {
    try {
      const data = await fetchToBag(discId);
      isInBag = true;
      console.log('added to bag: ', data);
    } catch (err) {
      console.error(err);
    }
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
    classification,
    stability,
  } = disc;
  const flight = `${speed} | ${glide} | ${turn} | ${fade}`;

  return (
    <div>
      <Link to={`/disc-details/${discId}`}>
        <div className="imageContainer">
          <img src={image1Url} alt={name}></img>
        </div>
        <div>
          <h5>{name}</h5>
          <p>{brand}</p>
          <p>{plastic}</p>
          <p>{flight}</p>
          <p>{classification}</p>
          <p>{stability}</p>
          <p>{price}</p>
        </div>
      </Link>
      <div>
        {!isInBag && <button onClick={handleAddToBag}>Bag It!</button>}
        {!isInCart && <button onClick={handleAddToCart}>Buy It!</button>}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { fetchUsersCart } from '../lib/fetch';
import { Disc } from './DiscCatalog';

export type CartArray = (Disc & { quantity: number })[];

export function Cart() {
  const [cartData, setCartData] = useState<CartArray>();

  useEffect(() => {
    async function readCartData() {
      try {
        const data: CartArray = await fetchUsersCart();

        console.log('cart data from server:', data);

        setCartData(data);
      } catch (error) {
        throw new Error('an error occured loading products');
      }
    }
    readCartData();
  }, []);

  return (
    <div>
      <p>Cart Page</p>
      <div>
        {cartData?.map((disc) => (
          <div key={disc.discId} className="card">
            <CartCard disc={disc} />
          </div>
        ))}
      </div>
    </div>
  );
}

type CartCardProps = { disc: Disc & { quantity: number } };

function CartCard({ disc }: CartCardProps) {
  const {
    // discId,
    name,
    brand,
    price,
    image1Url,
    plastic,
    speed,
    glide,
    turn,
    fade,
    classification,
    stability,
    quantity,
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
        <p>{price}</p>
        <p>{`Quantity:${quantity}`}</p>
        {/* <Link to={'/cart'}>
        <button>Bag It!</button>
        </Link>
        <Link to={'/cart'}>
        <button>Buy It!</button>
        </Link> */}
      </div>
    </>
    // </Link>
  );
}

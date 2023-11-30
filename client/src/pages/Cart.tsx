import { useContext } from 'react';
// import { fetchUsersCart } from '../lib/fetch';
import { Disc } from './DiscCatalog';
import { FaAngleDown, FaAngleUp, FaRegTrashCan } from 'react-icons/fa6';
import { AppContext } from '../components/AppContext';

export type CartArray = (Disc & { quantity: number })[];

export function Cart() {
  const { cartData } = useContext(AppContext);

  return (
    <div>
      <div>
        {cartData?.map((disc) => (
          <div key={disc.discId}>
            <CartCard disc={disc} />
          </div>
        ))}
      </div>
    </div>
  );
}

type CartCardProps = { disc: Disc & { quantity: number } };

function CartCard({ disc }: CartCardProps) {
  const { handleUpdateDiscQuantity, handleRemoveFromCart } =
    useContext(AppContext);
  const {
    discId,
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
    <div className="border-2 rounded flex flex-wrap">
      <div className="w-1/6">
        <img className="w-full" src={image1Url} alt={name}></img>
      </div>
      <div className="mx-10">
        <h5>Mold: {name}</h5>
        <p>Brand: {brand}</p>
        <p>Plastic: {plastic}</p>
        <p>Flight Numbers: {flight}</p>
        <p>Type: {classification}</p>
        <p>Stability: {stability}</p>
        <p>Price: {price}</p>
        <div className="flex justify-end flex-wrap">
          <FaAngleUp
            onClick={() => handleUpdateDiscQuantity(discId, quantity + 1)}
            className="border rounded"
          />
          <div className="w-full flex justify-between">
            <p>Quantity: </p>
            <span className="text-center">{quantity}</span>
          </div>
          <FaAngleDown
            onClick={() => handleUpdateDiscQuantity(discId, quantity - 1)}
            className="border rounded"
          />
        </div>
      </div>
      <div className="flex items-center">
        <FaRegTrashCan
          onClick={() => handleRemoveFromCart(discId)}
          className="text-4xl"
        />{' '}
        remove
      </div>
    </div>
    // </Link>
  );
}

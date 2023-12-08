import { useContext } from 'react';
import { Disc } from './DiscCatalog';
import { FaAngleDown, FaAngleUp, FaRegTrashCan } from 'react-icons/fa6';
import { AppContext } from '../components/AppContext';
import { fetchRemoveAllFromCart, toDollars } from '../lib/fetch';
import { useNavigate } from 'react-router-dom';

export type CartArray = (Disc & { quantity: number })[];

export function Cart() {
  const { cartData, setCartData } = useContext(AppContext);
  const navigate = useNavigate();

  function sumCart(cartData: CartArray) {
    let sum = 0;
    cartData.forEach((disc: Disc & { quantity: number }) => {
      sum += disc.price * disc.quantity;
    });
    return sum;
  }

  function onPurchase() {
    handleRemoveAllFromCart();
    navigate('/disc-catalog');
    alert('your purchase was successful');
  }

  async function handleRemoveAllFromCart() {
    try {
      await fetchRemoveAllFromCart();
      setCartData([]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="relative w-full flex flex-wrap items-start">
      <div className="w-1/2">
        {cartData?.map((disc) => (
          <div key={disc.discId}>
            <CartCard disc={disc} />
          </div>
        ))}
      </div>
      {cartData.length > 0 ? (
        <aside className="sticky top-0 border-2 rounded w-1/2">
          <h1 className="text-2xl text-center">YOUR CART</h1>
          <div className="border-y-2 h-44">
            <p>sub-total{toDollars(sumCart(cartData))}</p>
            <p>Taxes & Fees{toDollars(sumCart(cartData) * 0.09)}</p>
            <p>total{toDollars(sumCart(cartData) * 1.09)}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onPurchase()}
              className="border-2 p-2 border-black rounded bg-red-50">
              <p>check out</p>
            </button>
          </div>
        </aside>
      ) : (
        <div className="w-full text-center">You have no items in your cart</div>
      )}
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
  );
}

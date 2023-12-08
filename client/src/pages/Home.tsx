import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  function onClickStart() {
    navigate('/disc-catalog');
  }

  return (
    <div className="row text-4xl flex justify-center flex-wrap">
      <h1>Welcome to Disc Golf Depot</h1>
      <h2>Shop for new discs and build your perfect bag!</h2>
      <div
        onClick={() => onClickStart()}
        className="border-2 bg-red-200 rounded m-2">
        <h1>GET STARTED</h1>
      </div>
    </div>
  );
}

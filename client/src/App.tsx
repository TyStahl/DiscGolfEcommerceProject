import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { DiscCard, DiscArray } from './DiscCard';

export default function App() {
  const [discData, setDiscData] = useState<DiscArray>([]);

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch('/api/discs');
      const data: DiscArray = await resp.json();

      console.log('Data from server:', data);

      setDiscData(data);
    }

    readServerData();
  }, []);

  return (
    <>
      <Header />
      <DiscCard discData={discData} />
    </>
  );
}

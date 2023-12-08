import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useContext } from 'react';
import { AppContext } from './AppContext';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  aspectRatio: 2 / 3,
  // layout: {
  //   autoPadding: false,
  // },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 14,
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      beginAtzero: true,
      min: -6,
      max: 6,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

export function ScatterChart() {
  const { bagData } = useContext(AppContext);

  const graphData = {
    labels: bagData.map((disc) => disc.name),
    datasets: [
      {
        label: 'Discs',
        data: bagData.map((disc) => ({
          x: disc.fade + disc.turn,
          y: disc.speed,
          Tooltip: disc.name,
        })),
        radius: 10,
        backgroundColor: 'red',
      },
    ],
  };
  return <Scatter options={options} data={graphData} />;
}

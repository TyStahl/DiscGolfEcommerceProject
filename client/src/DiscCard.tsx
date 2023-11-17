export type Disc = {
  discId: number;
  price: number;
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

type DiscCardProps = {
  discData: DiscArray;
};

export function DiscCard({ discData }: DiscCardProps) {
  const cards = discData.map((disc) => (
    <button key={disc.discId}>{disc.name}</button>
  ));
  return <div>{cards}</div>;
}

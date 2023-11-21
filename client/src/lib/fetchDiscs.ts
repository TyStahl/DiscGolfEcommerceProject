import { Disc, DiscArray } from '../pages/DiscCatalog';

export async function fetchDisc(discId: number): Promise<Disc> {
  const res = await fetch(`/api/discs/${discId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchDiscs(): Promise<DiscArray> {
  const res = await fetch('/api/discs');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

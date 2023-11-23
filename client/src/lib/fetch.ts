import { CartArray } from '../pages/Cart';
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

export async function fetchUsersCart(): Promise<CartArray> {
  const req = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZGVmYXVsdCIsImlhdCI6MTcwMDY3NDQyMH0.d8gGkQGtTQdQ3vgFpHADT3J7gtyfoIgujTdetfBqi38',
    },
  };
  const res = await fetch(`/api/cart`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchUsersBag(): Promise<DiscArray> {
  const req = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZGVmYXVsdCIsImlhdCI6MTcwMDY3NDQyMH0.d8gGkQGtTQdQ3vgFpHADT3J7gtyfoIgujTdetfBqi38',
    },
  };
  const res = await fetch(`/api/bag`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchToCart(discId: number): Promise<Disc> {
  const itemToCart = { discId };
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZGVmYXVsdCIsImlhdCI6MTcwMDY3NDQyMH0.d8gGkQGtTQdQ3vgFpHADT3J7gtyfoIgujTdetfBqi38',
    },
    body: JSON.stringify(itemToCart),
  };
  const res = await fetch(`/api/cart`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchToBag(discId: number): Promise<Disc> {
  const itemToBag = { discId };
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZGVmYXVsdCIsImlhdCI6MTcwMDY3NDQyMH0.d8gGkQGtTQdQ3vgFpHADT3J7gtyfoIgujTdetfBqi38',
    },
    body: JSON.stringify(itemToBag),
  };
  const res = await fetch(`/api/bag`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// export async function addToBag() {
//   const req = {method: 'POST', headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZGVmYXVsdCIsImlhdCI6MTcwMDY3NDQyMH0.d8gGkQGtTQdQ3vgFpHADT3J7gtyfoIgujTdetfBqi38'},}
//   const res = await fetch(`/api/cart`, req);
//   if (!res.ok) throw new Error(`fetch Error ${res.status}`)
//   return await res.json();
// }

import { CartArray } from '../pages/Cart';
import { CartDisc, Disc, DiscArray } from '../pages/DiscCatalog';

export function toDollars(value: number): string {
  return '$' + value.toFixed(2);
}

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
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/cart`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchUsersBag(): Promise<DiscArray> {
  const req = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/bag`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchToCart(discId: number): Promise<CartDisc> {
  const itemToCart = { discId };
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(itemToCart),
  };
  const res = await fetch(`/api/cart`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchUpdateDiscQuantity(
  discId: number,
  quantity: number
): Promise<Disc & { quantity: number }> {
  const itemToUpdate = { discId, quantity };
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(itemToUpdate),
  };
  const res = await fetch('/api/cart', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchRemoveDiscFromCart(
  discId: number
): Promise<DiscArray> {
  const itemToRemove = { discId };
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(itemToRemove),
  };
  const res = await fetch('/api/cart', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchRemoveAllFromCart(): Promise<DiscArray> {
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/cart/all', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchToBag(discId: number): Promise<Disc> {
  const itemToBag = { discId };
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(itemToBag),
  };
  const res = await fetch(`/api/bag`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchRemoveDiscFromBag(discId: number): Promise<Disc> {
  const itemToRemove = { discId };
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(itemToRemove),
  };
  const res = await fetch('/api/bag', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchSignIn(username: string, password: string) {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch('/api/auth/sign-in', req);
  if (!res.ok) {
    throw new Error(`fetch Error ${res.status}`);
  }
  return await res.json();
}

export async function fetchSignUp(username: string, password: string) {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch('/api/auth/sign-up', req);
  if (!res.ok) {
    throw new Error(`fetch Error ${res.status}`);
  }
  return await res.json();
}

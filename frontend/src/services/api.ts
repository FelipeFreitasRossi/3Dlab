import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  return fetchJson<Product[]>("/api/products", signal);
}

export async function fetchProductById(
  id: string,
  signal?: AbortSignal,
): Promise<Product> {
  return fetchJson<Product>(`/api/products/${id}`, signal);
}
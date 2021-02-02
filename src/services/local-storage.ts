export function setItem(key: string, item: any): void {
  const value = JSON.stringify(item);
  localStorage.setItem(key, value);
}

export function getItem<T>(key: string): T {
  const value = localStorage.getItem(key);
  if (!value) {
    throw new Error(`Value for key ${key} does not exists`);
  }
  const item = JSON.parse(value) as T;
  return item;
}

/**
 * Generic LocalStorage utility
 * Stores any entity type in its own collection (key)
 */
export function saveItem<T>(key: string, item: T): void {
  const existing = loadItems<T>(key)
  existing.push(item)
  localStorage.setItem(key, JSON.stringify(existing))
}

export function loadItems<T>(key: string): T[] {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) as T[] : []
}

export function updateItem<T extends { id: string }>(key: string, updatedItem: T): void {
  const items = loadItems<T>(key)
  const index = items.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    items[index] = updatedItem
    localStorage.setItem(key, JSON.stringify(items))
  }
}

export function deleteItem<T extends { id: string }>(key: string, id: string): void {
  const items = loadItems<T>(key).filter(item => item.id !== id)
  localStorage.setItem(key, JSON.stringify(items))
}

export function clearItems(key: string): void {
  localStorage.removeItem(key)
}

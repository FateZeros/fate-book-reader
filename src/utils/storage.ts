export function setLocalStorage(key: string, value: any): void {
  const str = JSON.stringify(value)
  localStorage.setItem(key, str)
}

export function getLocalStorage(key: string): any {
  let json: string | null
  json = localStorage.getItem(key)
  if (json) json = JSON.parse(json)
  return json
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key)
}

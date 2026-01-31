const STORAGE_KEY = "overwatch-games";

export function loadGames() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveGames(games) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

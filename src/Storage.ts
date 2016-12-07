const local = chrome.storage.local;
const sync = chrome.storage.sync;

export enum LocalStorageKey{
  tweetLinkUiState
}

export function getOptions(callback: (options: Options) => void): void {
  sync.get(callback)
}

export function setOptions(options: Options, callback: () => void): void {
  sync.set(options, callback)
}

export function getItem(key: LocalStorageKey, callback: (value: {}) => void): void {
  let storageKey = getStorageKey(key);
  local.get(storageKey, x => {
    callback(x[storageKey])
  });
}

export function setItem(key: LocalStorageKey, data: {}): void {
  local.set({[getStorageKey(key)]: data});
}

function getStorageKey(key: LocalStorageKey): string {
  return key.toString();
}
import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import Store from 'electron-store';
import { StoreKey } from './StoreKey';

export default class CustomElectronStoreIpc {
  constructor() {
    const store = new Store();

    ipcMain.handle('get-store-value', (event, key) => {
      return store.get(key);
    });

    ipcMain.handle('set-store-value', (event, key, value) => {
      store.set(key, value);
    });
  }
}

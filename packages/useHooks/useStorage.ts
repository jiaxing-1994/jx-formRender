import Stroage from "./storage";

let StroageInstance: any = null;

export function registStorage(namespace: string) {
  if (!StroageInstance) {
    StroageInstance = new Stroage(namespace);
  }
}

export function setLocal(key: string, value: any) {
  return StroageInstance.setItem(key, value);
}

export function setSession(key: string, value: any) {
  return StroageInstance.setSessionItem(key, value);
}

export function getLocal<T>(key: string): T {
  return StroageInstance.getItem(key);
}

export function getSession(key: string) {
  return StroageInstance.getSessionItem(key);
}

export function removeLocal(key: string): any {
  return StroageInstance.removeItem(key);
}

export function removeSession(key: string): any {
  return StroageInstance.removeSessionItem(key);
}

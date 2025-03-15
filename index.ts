export type GmodCallback = (callback: (...args: SafeTypes[]) => void) => void;

/**
 * Safe types allowed to be used between JS and Lua
 *
 * To use other types, I suggest you deserialize objects in JSON and serialize at the point of use.
 */
type SafeTypes = string | number | boolean;

declare global {
  const lua: {
    call: (name: string, ...args: [...SafeTypes[], GmodCallback]) => void;
  };
}

/**
 * Calls a function while waiting for its execution to complete and returns its result
 * @param name Name of the function to be called
 * @param args Arguments to be passed when calling the function
 */
export function call<T extends SafeTypes>(name: string, ...args: SafeTypes[]): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      lua.call(name, ...args, (...callbackArgs) => {
        if (callbackArgs.length === 1) {
          resolve(callbackArgs[0] as unknown as T);
        } else {
          resolve(callbackArgs as unknown as T);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Calls a Lua function but with a timeout to prevent infinite waits
 * @param name Name of the function to be called
 * @param timeout Time in seconds to wait before rejecting the promise
 * @param args Arguments to be passed when calling the function
 */
export function callWithTimeout<T extends SafeTypes>(name: string, timeout: number = 3, ...args: SafeTypes[]): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Call to '${name}' timed out`)), timeout * 1000);

    try {
      lua.call(name, ...args, (...callbackArgs) => {
        clearTimeout(timer);
        if (callbackArgs.length === 1) {
          resolve(callbackArgs[0] as unknown as T);
        } else {
          resolve(callbackArgs as unknown as T);
        }
      });
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });
};

type ListenerCallback = (e: Event) => void;

/**
 * Adds a event listener
 * @param event Name of the event
 * @param callback Calls when an event has occurred
 */
export function listen<T extends Object>(event: string, callback: (body: T) => void): [string, ListenerCallback] {
  const listener = (e: Event) => callback((e as CustomEvent).detail);

  window.addEventListener(event, listener);

  return [event, listener];
};

/**
 * Removes a event listener
 *
 * # Example
 * ```ts
 * import { listen, unlisten } from "@autumngmod/cream-api"
 *
 * const closer = listen("close", console.log)
 *
 * unlisten(closer);
 * ```
 * @param event Name of the event
 * @param callback Calls when an event has occurred
 */
export function unlisten([event, callback]: [string, ListenerCallback]) {
  window.removeEventListener(event, callback);
};
export const useAsyncDebounce = (
  fn: (value: string) => void,
  delay: number,
) => {
  let timeoutId: NodeJS.Timeout;

  return async (value: string) => {
    clearTimeout(timeoutId);

    return new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => {
        fn(value);
        resolve();
      }, delay);
    });
  };
};

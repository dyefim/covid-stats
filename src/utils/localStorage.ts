const getLocalState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveToLocalState = (key: string, value: unknown): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // ignore
  }
};

export { getLocalState, saveToLocalState };

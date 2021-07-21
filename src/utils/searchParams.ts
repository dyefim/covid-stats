const setQueryWithoutReload = (value: string) => {
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    value;

  window.history.pushState({ path: newUrl }, '', newUrl);
};

const setQueryStringValue = (
  key: string,
  value: any,
  queryString = window.location.search
) => {
  const searchParams = new URLSearchParams(queryString);

  searchParams.set(key, value);

  const newValue = searchParams.toString();
  setQueryWithoutReload(`?${newValue}`);
};

export { setQueryWithoutReload, setQueryStringValue };

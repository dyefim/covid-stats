interface RequestOptions {
  method: 'GET' | 'POST';
  redirect: 'follow' | 'manual' | 'error';
}

const requestOptions: RequestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const makeRequest = (url: string) =>
  fetch(url, requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    // .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => console.log('error', error));

export default makeRequest;

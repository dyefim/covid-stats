interface RequestOptions {
  method: 'GET' | 'POST';
  redirect: 'follow' | 'manual' | 'error';
}

const requestOptions: RequestOptions = {
  method: 'GET',
  redirect: 'follow',
};

const makeRequest = async (url: string) => {
  try {
    const response = await fetch(url, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default makeRequest;

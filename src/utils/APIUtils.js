import axios from 'axios';

const headerKeys = (skipContentType) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  return headers;
};

const apiHost = () => {
  return 'http://localhost:5050/';
};

export const doGet = (url, skipContentType = false) => {
  return axios.get(apiHost() + url, {
    headers: headerKeys(skipContentType)
  }).then((response) => {
    return response;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

export const doPost = (url, data, skipContentType = false) => {
  return axios.post(apiHost() + url, data, {
    headers: headerKeys(skipContentType),
    transformRequest: (obj) => {
      const str = [];
      for (let p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
      return str.join('&');
    }
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

export const doPut = (url, data, skipContentType = false) => {
  return axios.put(apiHost() + url, data, {
    headers: headerKeys(skipContentType),
    transformRequest: (obj) => {
      const str = [];
      for (let p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
      return str.join('&');
    }
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

export const doPatch = (url, data, skipContentType = false) => {
  return axios.patch(apiHost() + url, data, {
    headers: headerKeys(skipContentType),
    transformRequest: (obj) => {
      const str = [];
      for (let p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
      return str.join('&');
    }
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

// https://github.com/axios/axios/issues/736
export const doDelete = (url, data, skipContentType = false) => {
  return axios.delete(apiHost() + url, {
    data: data,
    headers: headerKeys(skipContentType),
    transformRequest: (obj) => {
      const str = [];
      for (let p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
      return str.join('&');
    }
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

export const doUpload = (url, data, skipContentType = false) => {
  return axios.post(apiHost() + url, data, {
    headers: headerKeys(skipContentType)
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

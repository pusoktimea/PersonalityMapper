import axios from 'axios';
import cookie from 'js-cookie';

const headerKeys = (skipContentType) => {
  const headers = {
    'X-API-KEY': '2f13efa6-d80e-4187-b804-2c7a43e9d87b',
    'X-SESSION-ID': cookie.get('x_session_id') || ''
  };

  if (!skipContentType) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return headers;
};

const apiHost = () => {
  const productionHost = 'app.activatems.com';
  const devHosts = ['localhost', 'int.activatems.com'];
  if (window.location.hostname === productionHost) {
    return 'https://api.activatems.com/';
  } else if (devHosts.includes(window.location.hostname)) {
    return 'https://int-api.activatems.com/';
  } else {
    alert('Unrecognized host');
  }
};

export const doGet = (url, skipContentType = false) => {
  return axios({
    method: 'get',
    baseURL: apiHost(),
    url: url,
    headers: headerKeys(skipContentType)
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('API error: ', error); // eslint-disable-line no-console
  });
};

export const doPost = (url, data, skipContentType = false) => {
  return axios({
    method: 'post',
    baseURL: apiHost(),
    url: url,
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

export const doPatch = (url, data, skipContentType = false) => {
  return axios({
    method: 'patch',
    baseURL: apiHost(),
    url: url,
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

export const doDelete = (url, data, skipContentType = false) => {
  return axios({
    method: 'delete',
    baseURL: apiHost(),
    url: url,
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

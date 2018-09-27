export const server = process.env.REACT_APP_CONTACTS_API_URL || 'http://103.7.41.176:4444/';

const headers = {
  token: ''
};

export function updateToken(token) {
  headers.token = token;
}

export const upload = payload =>
  fetch(`${server}image/create`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: payload,

  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });


export const savePurchase = payload =>
  fetch(`${server}purchase/create`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),

  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });

export const updatePurchase = (payload, id) =>
  fetch(`${server}purchase/${id}/update`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),

  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });

export const getPurchaseDetail = id =>
  fetch(`${server}purchase/${id}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },

  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });


export const getAllPurchase = () =>
  fetch(`${server}purchase`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },

  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });

export const getAllPurchaseFilterByDate = date =>
  fetch(`${server}user/work/filter`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(date),
  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });


export const getSaleRemindByDate = date =>
  fetch(`${server}user/sale/remind`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(date),
  }).then(res => res.json())
    .catch((error) => {
      console.log('This is error');
      return error;
    });

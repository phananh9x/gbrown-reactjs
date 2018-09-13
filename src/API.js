export const server = process.env.REACT_APP_CONTACTS_API_URL || 'http://103.7.41.176:3000/';

const headers = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjViOGQzOGI0OTI0M2YyMDc1ZTk3YzU1OCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJjcmVhdGVkIjoiMjAxOC0wOS0wM1QxMzozNTo0OC45MjRaIiwiaGFzaF9wYXNzd29yZCI6IiQyYSQxMCRldUw1akxmbXdVdkl3ZnBDOXRlcjJPQUUyUW5idWNGdG1hRWtSTk4zOWVyREZaWnZHbGpwUyIsIl9fdiI6MH0sImlhdCI6MTUzNjExODc1OX0.NZPh3ybHwIc5tCshz3-1Lyoa6IDTeBtLkEEYnqnQ1g8'
};

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

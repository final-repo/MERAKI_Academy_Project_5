import axios from "axios";

export const GetOrders = async (limit, offset, status) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};
  let url = ``;
  if (limit === 0 && offset === 0 && status === 0) {
    url = `http://3.134.111.211:5000/orders`;
  } else if (limit !== 0 && offset !== 0 && status === 0) {
    url = `http://3.134.111.211:5000/orders?limit=${limit}&offset=${offset}`;
  } else if (limit !== 0 && offset !== 0 && status !== 0) {
    url = `http://3.134.111.211:5000/orders?limit=${limit}&offset=${offset}&stauts=${status}`;
  }
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result.data?.error) {
      return result.data;
    }
  } catch (err) {
    throw err;
  }
};

export const GetOrdersByUserId = async (limit, offset, status) => {
  const token = JSON.parse(localStorage.getItem("token")) ?? {};

  let url = `http://3.134.111.211:5000/orders/customer/${token?.id}?limit=${limit}&offset=${offset}`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });

    if (!result.data?.error) {
      return result?.data?.orders;
    }
  } catch (err) {
    throw err;
  }
};

import api from './axios';

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions/');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions/', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const response = await api.patch(`/transactions/${transactionId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await api.delete(`/transactions/${transactionId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
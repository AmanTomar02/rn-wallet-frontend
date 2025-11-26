import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // *************** Fetch Transactions *************** 
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);


  // *************** Fetch Summary *************** 
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/transactions/summary/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch summary");

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  // *************** Load Data (parallel fetch) *************** 
  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  // Delete Transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");

      await loadData(); // Refresh data after deletion
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};

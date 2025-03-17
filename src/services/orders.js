// src/services/orders.js
import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const validStatuses = ["pending", "processing", "completed", "cancelled"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(
        `Invalid status: ${newStatus}. Valid statuses: ${validStatuses.join(
          ", "
        )}`
      );
    }

    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });

    console.log("Order status updated successfully:", orderId);
    return true;
  } catch (error) {
    console.error(`Order update failed (${orderId}):`, error);
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        }));

        setOrders(ordersData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { orders, loading, error };
};

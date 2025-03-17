// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = collection(db, "products");

    // Build query dynamically
    if (filters.category) {
      q = query(q, where("category", "==", filters.category));
    }
    if (filters.minPrice) {
      q = query(q, where("price", ">=", filters.minPrice * 100));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [filters]); // Re-run when filters change

  return { products, loading };
};

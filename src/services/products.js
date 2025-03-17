import { db } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addProduct = async (productData) => {
  try {
    const productsCollectionRef = collection(db, "products");
    const docRef = await addDoc(productsCollectionRef, productData);
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(`Failed to add product: ${error.message}`);
  }
};

export const updateProduct = async (id, updates) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updates);
    console.log("Product updated:", id);
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(`Failed to update product ${id}: ${error.message}`);
  }
};

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    console.log("Product deleted:", id);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(`Failed to delete product ${id}: ${error.message}`);
  }
};

export const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error(`Failed to fetch product ${id}: ${error.message}`);
  }
};

export const getAllProducts = async () => {
  try {
    const productsCollectionRef = collection(db, "products");
    const productSnapshot = await getDocs(productsCollectionRef);
    const products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(
      `Failed to fetch products by category ${category}: ${error.message}`
    );
  }
};

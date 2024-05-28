import { db } from "@/lib/firebase";
import { Product } from "@/types/productType";
import { sendResponse } from "@/utils/common";
import { v4 as uuidv4 } from "uuid";
import { findCategoryByName } from "@/utils/getCollectionByName";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore/lite";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const snapshot = await getDocs(collection(db, "Product"));
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sendResponse(200, { data: products });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { name, description, category, price, stock, weight, imageUrl } =
      reqBody;
    console.log(reqBody);
    const snapshot = addDoc(collection(db, "Product"), {
      name,
      description,
      categoryId: category,
      imageUrl,
      price,

      stock,
      weight,
    });
    return sendResponse(200, { message: "Product has been created" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const {
      payload: {
        id,
        name,
        category,
        description,
        price,
        stock,
        weight,
        imageUrl,
      },
    } = reqBody;

    console.log(reqBody);
    console.log(id);

    // Reference the document using the provided document ID
    const productRef = doc(db, "Product", id);

    // Update the document
    await updateDoc(productRef, {
      name,
      description,
      categoryId: category,
      price,
      imageUrl,
      stock,
      weight,
    });

    return sendResponse(200, { message: "Product has been updated" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;

    console.log(reqBody);
    console.log(id);

    // Reference the document using the provided document ID
    const docRef = doc(db, "Product", id);

    // Delete the document
    await deleteDoc(docRef);

    return sendResponse(200, { message: "Product has been deleted" });
  } catch (error: any) {
    return sendResponse(500, { message: error.message });
  }
};

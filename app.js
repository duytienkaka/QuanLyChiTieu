// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb7-l9-vyLmsVzHa65lYwZA7Qa5YwRjLI",
  authDomain: "quanlychitieu-9c0a8.firebaseapp.com",
  projectId: "quanlychitieu-9c0a8",
  storageBucket: "quanlychitieu-9c0a8.firebasestorage.app",
  messagingSenderId: "637176993381",
  appId: "1:637176993381:web:f42d17aa9807081aeb588c",
  measurementId: "G-8BGMQDLB6X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ví dụ thêm chi tiêu
async function addExpense(name, amount) {
  await addDoc(collection(db, "expenses"), {
    name: name,
    amount: amount,
    date: new Date()
  });
}

// Ví dụ hiển thị chi tiêu
async function showExpenses() {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// Test
addExpense("Cà phê", 50000);
showExpenses();

// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Thay config này bằng config của bạn trong Firebase
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx"
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

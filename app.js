// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Khởi tạo Firebase
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

const appDiv = document.getElementById('app');

// Thêm chi tiêu
function addExpense(expense) {
  return db.collection('expenses').add(expense);
}

// Lấy danh sách chi tiêu
function getExpenses() {
  return db.collection('expenses').get();
}

// Cập nhật chi tiêu
function updateExpense(id, updatedExpense) {
  return db.collection('expenses').doc(id).update(updatedExpense);
}

// Xóa chi tiêu
function deleteExpense(id) {
  return db.collection('expenses').doc(id).delete();
}

// Hiển thị danh sách chi tiêu
function renderExpenses() {
  getExpenses().then(snapshot => {
    let html = `
      <form id="expenseForm">
        <input type="text" id="name" placeholder="Tên chi tiêu" required />
        <input type="number" id="amount" placeholder="Số tiền" required />
        <button type="submit">Thêm</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Tên chi tiêu</th>
            <th>Số tiền (VND)</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
    `;
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `
        <tr>
          <td>${data.name}</td>
          <td>${data.amount}</td>
          <td>
            <button onclick="editExpense('${doc.id}')">Sửa</button>
            <button onclick="removeExpense('${doc.id}')">Xóa</button>
          </td>
        </tr>
      `;
    });
    html += '</tbody></table>';
    appDiv.innerHTML = html;

    // Gắn lại sự kiện cho form
    document.getElementById('expenseForm').onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const amount = parseInt(document.getElementById('amount').value);
      addExpense({ name, amount }).then(renderExpenses);
      this.reset();
    };
  });
}

// Sửa chi tiêu
window.editExpense = function(id) {
  const newName = prompt('Tên mới:');
  const newAmount = prompt('Số tiền mới:');
  if (newName && newAmount) {
    updateExpense(id, { name: newName, amount: parseInt(newAmount) }).then(renderExpenses);
  }
};

// Xóa chi tiêu
window.removeExpense = function(id) {
  if (confirm('Bạn có chắc muốn xóa?')) {
    deleteExpense(id).then(renderExpenses);
  }
};

// Hiển thị danh sách khi load trang
renderExpenses();

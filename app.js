// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
  return addDoc(collection(db, "expenses"), expense);
}

// Lấy danh sách chi tiêu
function getExpenses() {
  return getDocs(collection(db, "expenses"));
}

// Cập nhật chi tiêu
function updateExpense(id, updatedExpense) {
  return updateDoc(doc(db, "expenses", id), updatedExpense);
}

// Xóa chi tiêu
function deleteExpense(id) {
  return deleteDoc(doc(db, "expenses", id));
}

// Hiển thị thông báo
function showNotify(msg) {
  let notify = document.getElementById('notify');
  if (!notify) {
    notify = document.createElement('div');
    notify.id = 'notify';
    notify.className = 'notify';
    appDiv.prepend(notify);
  }
  notify.innerText = msg;
  notify.style.display = 'block';
  setTimeout(() => { notify.style.display = 'none'; }, 1800);
}

// Hiển thị danh sách chi tiêu
function renderExpenses() {
  getExpenses().then(snapshot => {
    let html = `
      <div id="notify" class="notify"></div>
      <form id="expenseForm">
        <input type="text" id="name" placeholder="Tên chi tiêu" required />
        <input type="number" id="amount" placeholder="Số tiền" required min="0" />
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
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      html += `
        <tr>
          <td>${data.name}</td>
          <td>${Number(data.amount).toLocaleString()}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editExpense('${docSnap.id}')">Sửa</button>
            <button class="action-btn delete-btn" onclick="removeExpense('${docSnap.id}')">Xóa</button>
          </td>
        </tr>
      `;
    });
    html += '</tbody></table>';
    appDiv.innerHTML = html;

    document.getElementById('expenseForm').onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const amount = parseInt(document.getElementById('amount').value);
      if (!name || isNaN(amount) || amount < 0) {
        showNotify('Vui lòng nhập hợp lệ!');
        return;
      }
      addExpense({ name, amount }).then(() => {
        showNotify('Đã thêm chi tiêu!');
        renderExpenses();
      });
      this.reset();
    };
  });
}

// Sửa chi tiêu
window.editExpense = function(id) {
  const newName = prompt('Tên mới:');
  const newAmount = prompt('Số tiền mới:');
  if (newName && newAmount && !isNaN(parseInt(newAmount)) && parseInt(newAmount) >= 0) {
    updateExpense(id, { name: newName, amount: parseInt(newAmount) }).then(() => {
      showNotify('Đã cập nhật!');
      renderExpenses();
    });
  } else {
    showNotify('Dữ liệu không hợp lệ!');
  }
};

// Xóa chi tiêu
window.removeExpense = function(id) {
  if (confirm('Bạn có chắc muốn xóa?')) {
    deleteExpense(id).then(() => {
      showNotify('Đã xóa!');
      renderExpenses();
    });
  }
};

// Hiển thị danh sách khi load trang
renderExpenses();

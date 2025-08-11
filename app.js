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

function renderExpenses() {
  getExpenses().then(snapshot => {
    let html = `
      <div id="notify" class="notify"></div>
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
          <td>${data.amount.toLocaleString()}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editExpense('${doc.id}')">Sửa</button>
            <button class="action-btn delete-btn" onclick="removeExpense('${doc.id}')">Xóa</button>
          </td>
        </tr>
      `;
    });
    html += '</tbody></table>';
    appDiv.innerHTML = html;

    document.getElementById('expenseForm').onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const amount = parseInt(document.getElementById('amount').value);
      addExpense({ name, amount }).then(() => {
        showNotify('Đã thêm chi tiêu!');
        renderExpenses();
      });
      this.reset();
    };
  });
}

window.editExpense = function(id) {
  const newName = prompt('Tên mới:');
  const newAmount = prompt('Số tiền mới:');
  if (newName && newAmount) {
    updateExpense(id, { name: newName, amount: parseInt(newAmount) }).then(() => {
      showNotify('Đã cập nhật!');
      renderExpenses();
    });
  }
};

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

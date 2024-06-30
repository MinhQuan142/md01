// Khi DOMContentLoaded được kích hoạt, thực hiện render danh sách người dùng
document.addEventListener("DOMContentLoaded", () => {
  renderUsers();

  // Thêm sự kiện submit cho form user
  document
    .getElementById("userForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn form submit mặc định
      if (validateForm()) {
        // Nếu validate form thành công thì thêm người dùng mới
        addUser();
      }
    });
});

// Hàm kiểm tra đầu vào của form
function validateForm() {
  let isValid = true;

  const name = document.getElementById("name").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const japaneseLevel = document.getElementById("japaneseLevel").value;
  const score = document.getElementById("score").value;

  // Xóa các thông báo lỗi cũ
  document.getElementById("nameError").innerText = "";
  document.getElementById("genderError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("japaneseLevelError").innerText = "";
  document.getElementById("scoreError").innerText = "";

  // Kiểm tra các giá trị nhập vào
  if (name.trim() === "") {
    document.getElementById("nameError").innerText = "「氏名」を入力して。";
    isValid = false;
  }
  if (!gender) {
    document.getElementById("genderError").innerText = "「性別」を選択して。";
    isValid = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerText =
      "「メール」を正しいに入力して。";
    isValid = false;
  }
  const phoneRegex = /^\d{2}(?:-\d{4}-\d{4}|\d{8}|\d-\d{3,4}-\d{4})$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById("phoneError").innerText =
      "「電話番号」を正しいに入力して。";
    isValid = false;
  }
  if (japaneseLevel === "") {
    document.getElementById("japaneseLevelError").innerText =
      "「日本語能力」を選択して。";
    isValid = false;
  }
  if (score <= 0 || score >= 180) {
    document.getElementById("scoreError").innerText =
      "0 ～ 180 の「点数」を入力して。";
    isValid = false;
  }

  return isValid;
}

// Hàm thêm người dùng mới vào danh sách
function addUser() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const newUser = {
    id: Date.now(),
    name: document.getElementById("name").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    japaneseLevel: document.getElementById("japaneseLevel").value,
    score: document.getElementById("score").value,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users)); // Lưu danh sách người dùng vào localStorage
  renderUsers(); // Hiển thị danh sách người dùng
  document.getElementById("userForm").reset(); // Reset form
}

// Hàm hiển thị danh sách người dùng
function renderUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user, index) => {
    userList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.gender}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.japaneseLevel}</td>
                <td>${user.score}</td>
                <td><button onclick="deleteUser(${user.id})">削除</button></td>
            </tr>
        `;
  });
}

// Hàm xóa người dùng
function deleteUser(userId) {
  if (confirm("削除しますか。")) {
    // Hiển thị confirm trước khi xóa
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Cập nhật danh sách người dùng trong localStorage
    renderUsers(); // Hiển thị lại danh sách người dùng
  }
}

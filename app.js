// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEa2VLP6OIxsLmLvMsvZIGlXGFCN5zbNU",
  authDomain: "curd-e4735.firebaseapp.com",
  databaseURL: "https://curd-e4735-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "curd-e4735",
  storageBucket: "curd-e4735.firebasestorage.app",
  messagingSenderId: "58986595988",
  appId: "1:58986595988:web:35d531107a58e64f3e9681"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to write data
window.writeData = function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (username === "" || email === "") {
    alert("Please enter both username and email!");
    return;
  }

  set(ref(database, 'users/' + username), {
    username: username,
    email: email
  })
  .then(() => {
    alert("Data added successfully!");
    displayAllUsers();
  })
  .catch((error) => {
    alert("Error adding data: " + error.message);
  });
};

// Function to read data
window.readData = function () {
  const username = document.getElementById("read-username").value;

  if (username === "") {
    alert("Please enter a username to fetch data!");
    return;
  }

  const userRef = ref(database, 'users/' + username);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      alert(`Username: ${data.username}, Email: ${data.email}`);
    } else {
      alert("No data found for this username!");
    }
  });
};

// Function to display all users
function displayAllUsers() {
  const userListRef = ref(database, 'users/');
  const userList = document.getElementById("user-list");
  userList.innerHTML = ""; // Clear the list before adding new items

  onValue(userListRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.keys(data).forEach((key) => {
        const user = data[key];
        const listItem = document.createElement("li");
        listItem.textContent = `Username: ${user.username}, Email: ${user.email}`;
        userList.appendChild(listItem);
      });
    } else {
      userList.innerHTML = "<li>No users found!</li>";
    }
  });
}

// Load all users on page load
window.onload = displayAllUsers;

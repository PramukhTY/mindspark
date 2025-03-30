// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithPopup, GitHubAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVDCfHhkUZYoIu_DZUjBFprYb_fQt8q3A",
  authDomain: "studentdatabase",
  projectId: "student-database-24796",
  storageBucket: "studentdatabase.appspot.com",
  messagingSenderId: "280311663130",
  appId: "1:280311663130:web:783b068c459d0a3940dfa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// GitHub sign-in function
const provider = new GitHubAuthProvider();

function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Get the GitHub user information
      const user = result.user;
      console.log("GitHub User Info: ", user);
      alert("You are logged in as: " + user.displayName);
    })
    .catch((error) => {
      console.error("Error during sign-in: ", error);
      alert("Error: " + error.message);
    });
}

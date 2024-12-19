import { ref, set } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const nameInput = document.getElementById("name");
const adviseInput = document.getElementById("advise");
const submitButton = document.getElementById("submit");
const form = document.getElementById("form");

// Clear fields when the page loads
window.onload = () => {
    nameInput.value = "";
    adviseInput.value = "";
};

// Button hover effect for invalid inputs
submitButton.addEventListener("mouseover", (button) => {
    const name = nameInput.value.trim();
    const advise = adviseInput.value.trim();
    const isValid = /[a-zA-Z]/.test(name) && /[a-zA-Z]/.test(advise);

    if (!isValid) {
        button.target.classList.toggle("move");
    }
});

// Form submission event
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const advise = adviseInput.value.trim();

    if (name && advise) {
        try {
            // Reference to the Firebase Realtime Database
            const database = window.firebaseDatabase;
            const userId = Date.now(); // Use timestamp as unique ID
            const userRef = ref(database, `users/${userId}`);

            // Save user data to Firebase
            await set(userRef, { name, advise });
            
            // Show confirmation and clear the fields
            alert("मैं आपके प्यार और आशीर्वाद का आभारी हूं ,मैं इन बातों को हमेशा अपने दिल में रखूंगा।");
            nameInput.value = "";
            adviseInput.value = "";
        } catch (error) {
            console.error("Error saving data to Firebase:", error);
            alert("There was an error submitting your form. Please try again.");
        }
    } else {
        alert("Please fill out both fields before submitting.");
    }
});

// API URL
const API_URL = 'http://localhost:8080/students';

// Get form element
const addStudentForm = document.getElementById('addStudentForm');
const messageDiv = document.getElementById('message');

// Add event listener to form
addStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value
    };
    
    try {
        // Send POST request
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('Student added successfully!', 'success');
            addStudentForm.reset();
            
            // Redirect to view students after 2 seconds
            setTimeout(() => {
                window.location.href = 'view-students.html';
            }, 2000);
        } else {
            showMessage('Error adding student. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server. Please check if the backend is running.', 'error');
    }
});

// Function to show messages
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

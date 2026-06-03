// API URL
const API_URL = 'http://localhost:8080/students';

// Get form and message elements
const editStudentForm = document.getElementById('editStudentForm');
const messageDiv = document.getElementById('message');

// Get student ID from URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Load student data when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (studentId) {
        loadStudentData(studentId);
    } else {
        showMessage('No student ID provided', 'error');
    }
});

// Load student data
async function loadStudentData(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (response.ok) {
            const student = await response.json();
            
            // Fill form with student data
            document.getElementById('studentId').value = student.id;
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('course').value = student.course;
        } else {
            showMessage('Error loading student data', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
}

// Handle form submission
editStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('studentId').value;
    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value
    };
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (response.ok) {
            showMessage('Student updated successfully!', 'success');
            
            // Redirect to view students after 2 seconds
            setTimeout(() => {
                window.location.href = 'view-students.html';
            }, 2000);
        } else {
            showMessage('Error updating student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
});

// Show message function
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

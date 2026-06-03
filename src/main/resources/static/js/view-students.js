// API URL
const API_URL = 'http://localhost:8080/students';

// Get elements
const studentsTableBody = document.getElementById('studentsTableBody');
const messageDiv = document.getElementById('message');
const editModal = document.getElementById('editModal');
const closeBtn = document.querySelector('.close');
const editStudentForm = document.getElementById('editStudentForm');

// Load students when page loads
document.addEventListener('DOMContentLoaded', loadStudents);

// Load all students
async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        
        if (response.ok) {
            const students = await response.json();
            displayStudents(students);
        } else {
            studentsTableBody.innerHTML = '<tr><td colspan="5" class="loading">Error loading students</td></tr>';
        }
    } catch (error) {
        console.error('Error:', error);
        studentsTableBody.innerHTML = '<tr><td colspan="5" class="loading">Error connecting to server</td></tr>';
    }
}

// Display students in table
function displayStudents(students) {
    if (students.length === 0) {
        studentsTableBody.innerHTML = '<tr><td colspan="5" class="loading">No students found</td></tr>';
        return;
    }
    
    studentsTableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}

// Edit student
async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (response.ok) {
            const student = await response.json();
            
            // Fill form with student data
            document.getElementById('editId').value = student.id;
            document.getElementById('editName').value = student.name;
            document.getElementById('editEmail').value = student.email;
            document.getElementById('editCourse').value = student.course;
            
            // Show modal
            editModal.style.display = 'block';
        } else {
            showMessage('Error loading student data', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
}

// Update student form submit
editStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const studentData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        course: document.getElementById('editCourse').value
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
            closeModal();
            loadStudents(); // Reload the table
        } else {
            showMessage('Error updating student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
});

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Student deleted successfully!', 'success');
            loadStudents(); // Reload the table
        } else {
            showMessage('Error deleting student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server', 'error');
    }
}

// Close modal
function closeModal() {
    editModal.style.display = 'none';
}

// Close modal when clicking X
closeBtn.onclick = closeModal;

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == editModal) {
        closeModal();
    }
}

// Show message function
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ==================== DATA STORAGE ====================
let booksData = [];
let usersData = [];
let transactionsData = [];
let nextBookId = 1;
let nextUserId = 1;
let nextTransactionId = 1;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
    addSampleData();
    renderAllData();
});

// ==================== EVENT LISTENERS ====================
function addEventListeners() {
    // Book Form
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addBook();
    });

    // User Form
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        registerUser();
    });

    // Issue Form
    document.getElementById('issueForm').addEventListener('submit', function(e) {
        e.preventDefault();
        issueBook();
    });

    // Return Form
    document.getElementById('returnForm').addEventListener('submit', function(e) {
        e.preventDefault();
        returnBook();
    });

    // Edit Form
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveChanges();
    });

    // Search Books
    document.getElementById('searchBooks').addEventListener('keyup', function() {
        filterBooks();
    });

    // Search Users
    document.getElementById('searchUsers').addEventListener('keyup', function() {
        filterUsers();
    });

    // Modal Close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        let modal = document.getElementById('editModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ==================== BOOK OPERATIONS ====================

/**
 * Add a new book to the system
 */
function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookISBN').value.trim();
    const quantity = parseInt(document.getElementById('bookQuantity').value);

    // Validation
    if (!title || !author || !isbn || !quantity) {
        showAlert('Error', 'All fields are required!');
        return;
    }

    // Check for duplicate ISBN
    if (booksData.some(book => book.isbn.toLowerCase() === isbn.toLowerCase())) {
        showAlert('Error', 'Book with this ISBN already exists!');
        return;
    }

    // Create book object
    const newBook = {
        id: nextBookId++,
        title: title,
        author: author,
        isbn: isbn,
        quantity: quantity,
        available: quantity,
        dateAdded: new Date().toLocaleDateString()
    };

    booksData.push(newBook);
    showAlert('Success', 'Book added successfully!');
    document.getElementById('bookForm').reset();
    renderBooks();
    updateSelects();
    updateDashboard();
}

/**
 * Render all books in the table
 */
function renderBooks() {
    const tbody = document.getElementById('booksTableBody');
    
    if (booksData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No books added yet</td></tr>';
        return;
    }

    tbody.innerHTML = booksData.map(book => `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><span class="badge badge-success">${book.available}</span></td>
            <td>${book.quantity}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Filter books based on search query
 */
function filterBooks() {
    const query = document.getElementById('searchBooks').value.toLowerCase();
    const tbody = document.getElementById('booksTableBody');

    const filtered = booksData.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No books found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(book => `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><span class="badge badge-success">${book.available}</span></td>
            <td>${book.quantity}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editBook(${book.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Edit book details
 */
function editBook(id) {
    const book = booksData.find(b => b.id === id);
    if (!book) return;

    document.getElementById('editId').value = id;
    document.getElementById('editType').value = 'book';
    document.getElementById('modalTitle').textContent = `Edit Book: ${book.title}`;
    
    const editFields = document.getElementById('editFields');
    editFields.innerHTML = `
        <input type="text" id="editTitle" value="${book.title}" placeholder="Title" required>
        <input type="text" id="editAuthor" value="${book.author}" placeholder="Author" required>
        <input type="text" id="editISBN" value="${book.isbn}" placeholder="ISBN" required>
        <input type="number" id="editQuantity" value="${book.quantity}" placeholder="Quantity" required>
    `;

    openModal();
}

/**
 * Delete a book
 */
function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        booksData = booksData.filter(b => b.id !== id);
        showAlert('Success', 'Book deleted successfully!');
        renderBooks();
        updateSelects();
        updateDashboard();
    }
}

// ==================== USER OPERATIONS ====================

/**
 * Register a new user
 */
function registerUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();

    // Validation
    if (!name || !email || !phone) {
        showAlert('Error', 'All fields are required!');
        return;
    }

    // Email validation
    if (!validateEmail(email)) {
        showAlert('Error', 'Please enter a valid email address!');
        return;
    }

    // Check for duplicate email
    if (usersData.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        showAlert('Error', 'Email already registered!');
        return;
    }

    // Create user object
    const newUser = {
        id: nextUserId++,
        name: name,
        email: email,
        phone: phone,
        booksIssued: 0,
        joinDate: new Date().toLocaleDateString()
    };

    usersData.push(newUser);
    showAlert('Success', 'Member registered successfully!');
    document.getElementById('userForm').reset();
    renderUsers();
    updateSelects();
    updateDashboard();
}

/**
 * Render all users in the table
 */
function renderUsers() {
    const tbody = document.getElementById('usersTableBody');

    if (usersData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No members registered yet</td></tr>';
        return;
    }

    tbody.innerHTML = usersData.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><span class="badge badge-warning">${user.booksIssued}</span></td>
            <td>${user.joinDate}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Filter users based on search query
 */
function filterUsers() {
    const query = document.getElementById('searchUsers').value.toLowerCase();
    const tbody = document.getElementById('usersTableBody');

    const filtered = usersData.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No members found</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><span class="badge badge-warning">${user.booksIssued}</span></td>
            <td>${user.joinDate}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Edit user details
 */
function editUser(id) {
    const user = usersData.find(u => u.id === id);
    if (!user) return;

    document.getElementById('editId').value = id;
    document.getElementById('editType').value = 'user';
    document.getElementById('modalTitle').textContent = `Edit Member: ${user.name}`;
    
    const editFields = document.getElementById('editFields');
    editFields.innerHTML = `
        <input type="text" id="editName" value="${user.name}" placeholder="Name" required>
        <input type="email" id="editEmail" value="${user.email}" placeholder="Email" required>
        <input type="tel" id="editPhone" value="${user.phone}" placeholder="Phone" required>
    `;

    openModal();
}

/**
 * Delete a user
 */
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        usersData = usersData.filter(u => u.id !== id);
        showAlert('Success', 'Member deleted successfully!');
        renderUsers();
        updateSelects();
        updateDashboard();
    }
}

// ==================== TRANSACTION OPERATIONS ====================

/**
 * Issue a book to a user
 */
function issueBook() {
    const userId = parseInt(document.getElementById('issueUserId').value);
    const bookId = parseInt(document.getElementById('issueBookId').value);
    const quantity = parseInt(document.getElementById('issueQuantity').value);

    // Validation
    if (!userId || !bookId || !quantity) {
        showAlert('Error', 'Please select book and member!');
        return;
    }

    const user = usersData.find(u => u.id === userId);
    const book = booksData.find(b => b.id === bookId);

    if (!user || !book) {
        showAlert('Error', 'User or Book not found!');
        return;
    }

    if (book.available < quantity) {
        showAlert('Error', 'Not enough books available!');
        return;
    }

    // Create transaction
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks

    const transaction = {
        id: nextTransactionId++,
        userId: userId,
        userName: user.name,
        bookId: bookId,
        bookTitle: book.title,
        type: 'Issue',
        quantity: quantity,
        issueDate: new Date().toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString(),
        fine: 0,
        status: 'Active'
    };

    // Update book availability
    book.available -= quantity;

    // Update user books issued count
    user.booksIssued += quantity;

    transactionsData.push(transaction);
    showAlert('Success', `${quantity} book(s) issued successfully!`);
    
    document.getElementById('issueForm').reset();
    renderTransactions();
    renderBooks();
    renderUsers();
    updateDashboard();
}

/**
 * Return a book from a user
 */
function returnBook() {
    const userId = parseInt(document.getElementById('returnUserId').value);
    const bookId = parseInt(document.getElementById('returnBookId').value);
    const quantity = parseInt(document.getElementById('returnQuantity').value);
    const fine = parseFloat(document.getElementById('fine').value) || 0;

    // Validation
    if (!userId || !bookId || !quantity) {
        showAlert('Error', 'Please select book and member!');
        return;
    }

    const user = usersData.find(u => u.id === userId);
    const book = booksData.find(b => b.id === bookId);

    if (!user || !book) {
        showAlert('Error', 'User or Book not found!');
        return;
    }

    // Create transaction
    const transaction = {
        id: nextTransactionId++,
        userId: userId,
        userName: user.name,
        bookId: bookId,
        bookTitle: book.title,
        type: 'Return',
        quantity: quantity,
        returnDate: new Date().toLocaleDateString(),
        fine: fine,
        status: 'Completed'
    };

    // Update book availability
    book.available += quantity;

    // Update user books issued count
    user.booksIssued = Math.max(0, user.booksIssued - quantity);

    transactionsData.push(transaction);
    showAlert('Success', `${quantity} book(s) returned successfully! Fine: Rs. ${fine}`);
    
    document.getElementById('returnForm').reset();
    renderTransactions();
    renderBooks();
    renderUsers();
    updateDashboard();
}

/**
 * Render all transactions
 */
function renderTransactions() {
    const tbody = document.getElementById('transactionsTableBody');

    if (transactionsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">No transactions yet</td></tr>';
        return;
    }

    tbody.innerHTML = transactionsData.map(transaction => `
        <tr>
            <td>${transaction.id}</td>
            <td>${transaction.userName}</td>
            <td>${transaction.bookTitle}</td>
            <td><span class="badge ${transaction.type === 'Issue' ? 'badge-warning' : 'badge-success'}">${transaction.type}</span></td>
            <td>${transaction.quantity}</td>
            <td>${transaction.issueDate || transaction.returnDate}</td>
            <td>${transaction.dueDate || '-'}</td>
            <td>${transaction.fine > 0 ? 'Rs. ' + transaction.fine : '-'}</td>
            <td><span class="badge badge-success">${transaction.status}</span></td>
        </tr>
    `).join('');
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Update select dropdowns with current data
 */
function updateSelects() {
    // Update user selects
    const userSelects = document.querySelectorAll('#issueUserId, #returnUserId');
    userSelects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select Member</option>';
        usersData.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            select.appendChild(option);
        });
        select.value = currentValue;
    });

    // Update book selects
    const bookSelects = document.querySelectorAll('#issueBookId, #returnBookId');
    bookSelects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select Book</option>';
        booksData.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = `${book.title} (Available: ${book.available})`;
            select.appendChild(option);
        });
        select.value = currentValue;
    });
}

/**
 * Update dashboard statistics
 */
function updateDashboard() {
    const totalBooks = booksData.reduce((sum, book) => sum + book.quantity, 0);
    const availableBooks = booksData.reduce((sum, book) => sum + book.available, 0);
    const totalMembers = usersData.length;
    const booksIssued = transactionsData.filter(t => t.type === 'Issue').length;

    document.getElementById('totalBooks').textContent = totalBooks;
    document.getElementById('availableBooks').textContent = availableBooks;
    document.getElementById('totalMembers').textContent = totalMembers;
    document.getElementById('booksIssued').textContent = booksIssued;
}

/**
 * Render all data
 */
function renderAllData() {
    renderBooks();
    renderUsers();
    renderTransactions();
    updateSelects();
    updateDashboard();
}

/**
 * Save changes from edit modal
 */
function saveChanges() {
    const editType = document.getElementById('editType').value;
    const editId = parseInt(document.getElementById('editId').value);

    if (editType === 'book') {
        const book = booksData.find(b => b.id === editId);
        if (book) {
            book.title = document.getElementById('editTitle').value;
            book.author = document.getElementById('editAuthor').value;
            book.isbn = document.getElementById('editISBN').value;
            book.quantity = parseInt(document.getElementById('editQuantity').value);
            renderBooks();
            showAlert('Success', 'Book updated successfully!');
        }
    } else if (editType === 'user') {
        const user = usersData.find(u => u.id === editId);
        if (user) {
            user.name = document.getElementById('editName').value;
            user.email = document.getElementById('editEmail').value;
            user.phone = document.getElementById('editPhone').value;
            renderUsers();
            showAlert('Success', 'Member updated successfully!');
        }
    }

    closeModal();
    updateSelects();
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== MODAL FUNCTIONS ====================

/**
 * Open edit modal
 */
function openModal() {
    document.getElementById('editModal').style.display = 'block';
}

/**
 * Close edit modal
 */
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

/**
 * Show alert modal
 */
function showAlert(title, message) {
    document.getElementById('alertTitle').textContent = title;
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('alertModal').style.display = 'block';
}

/**
 * Close alert modal
 */
function closeAlert() {
    document.getElementById('alertModal').style.display = 'none';
}

// ==================== SAMPLE DATA ====================

/**
 * Add sample data for demonstration
 */
function addSampleData() {
    // Sample Books
    booksData = [
        { id: nextBookId++, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', quantity: 5, available: 3, dateAdded: '2026-01-15' },
        { id: nextBookId++, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', quantity: 4, available: 2, dateAdded: '2026-01-16' },
        { id: nextBookId++, title: '1984', author: 'George Orwell', isbn: '978-0451524935', quantity: 6, available: 4, dateAdded: '2026-01-17' },
        { id: nextBookId++, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', quantity: 3, available: 1, dateAdded: '2026-01-18' }
    ];

    // Sample Users
    usersData = [
        { id: nextUserId++, name: 'Alice Johnson', email: 'alice@example.com', phone: '9876543210', booksIssued: 2, joinDate: '2026-01-01' },
        { id: nextUserId++, name: 'Bob Smith', email: 'bob@example.com', phone: '9876543211', booksIssued: 1, joinDate: '2026-01-05' },
        { id: nextUserId++, name: 'Charlie Brown', email: 'charlie@example.com', phone: '9876543212', booksIssued: 0, joinDate: '2026-01-10' }
    ];

    // Sample Transactions
    transactionsData = [
        { id: nextTransactionId++, userId: 1, userName: 'Alice Johnson', bookId: 1, bookTitle: 'The Great Gatsby', type: 'Issue', quantity: 1, issueDate: '2026-03-15', dueDate: '2026-03-29', fine: 0, status: 'Active' },
        { id: nextTransactionId++, userId: 2, userName: 'Bob Smith', bookId: 2, bookTitle: 'To Kill a Mockingbird', type: 'Issue', quantity: 1, issueDate: '2026-03-18', dueDate: '2026-04-01', fine: 0, status: 'Active' }
    ];
}

// ==================== SCROLL TO SECTION ====================

/**
 * Scroll to specific section
 */
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

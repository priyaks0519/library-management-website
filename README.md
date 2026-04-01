# 📚 Library Management System

A complete, professional Library Management Website built with **HTML, CSS, and JavaScript**. No backend required - everything runs in your browser!

## Features

### 📖 Book Management
- ✅ Add new books with title, author, ISBN, quantity
- ✅ Edit existing book details
- ✅ Delete books from library
- ✅ Search books by title, author, or ISBN
- ✅ View available and total quantities

### Member Management
- ✅ Register new library members
- ✅ Edit member information
- ✅ Delete members
- ✅ Search members by name or email
- ✅ Track books issued per member

### 📤 Issue & Return Books
- ✅ Issue books to members with due dates
- ✅ Return books with fine calculation
- ✅ Mark overdue books
- ✅ Track transaction history
- ✅ View complete transaction details

### Dashboard
- ✅ Total books in library
- ✅ Available books count
- ✅ Total members registered
- ✅ Books issued statistics

###  Professional UI
- ✅ Responsive design (works on all devices)
- ✅ Modern dark theme
- ✅ Smooth animations
- ✅ Modal dialogs for editing
- ✅ Color-coded badges and status indicators
- ✅ Beautiful tables with hover effects
- ✅ Navigation bar with smooth scrolling

##  Getting Started

### Option 1: Online (No Installation)
1. Click the green **"Code"** button
2. Select **"Download ZIP"**
3. Extract the files
4. Double-click **`index.html`** to open in browser

### Option 2: Using Live Server (VS Code)
1. Clone the repository
2. Open folder in VS Code
3. Right-click **`index.html`**
4. Select **"Open with Live Server"**

## 📝 How to Use

### Adding a Book
1. Scroll to **Books Management** section
2. Fill in the book details
3. Click **"Add Book"**
4. Book appears in the table below

### Registering a Member
1. Scroll to **Members Management** section
2. Enter member details
3. Click **"Register Member"**
4. Member is added to the list

### Issuing Books
1. Scroll to **Issue & Return Books** section
2. Select member from dropdown
3. Select book from dropdown
4. Enter quantity
5. Click **"Issue Book"**
6. Transaction is recorded with due date (14 days)

### Returning Books
1. Go to **Return Book** form
2. Select member and book
3. Enter quantity
4. Optional: Mark as overdue and add fine
5. Click **"Return Book"**
6. Book availability is updated

### Searching
- Use search bars in Books/Members sections
- Real-time filtering as you type
- Search by title, author, name, or email

### Editing
- Click **"Edit"** button next to any entry
- Modal opens with current details
- Update and save changes
- Data updates immediately

### Deleting
- Click **"Delete"** button
- Confirm deletion
- Entry is removed from system

## 📊 Dashboard Features

Real-time statistics showing:
- **Total Books**: Sum of all book quantities
- **Available Books**: Books not issued
- **Total Members**: Registered library members
- **Books Issued**: Count of active issues

Updates automatically as you add/remove/issue books!

## 💾 Data Storage

All data is stored **in browser memory** using JavaScript arrays. Data persists during the session but clears on page refresh.

**Note**: For persistent storage, integrate with a backend database.

## Sample Data Included

The system comes pre-loaded with:
- **4 Sample Books**
  - The Great Gatsby
  - To Kill a Mockingbird
  - 1984
  - Pride and Prejudice

- **3 Sample Members**
  - Alice Johnson
  - Bob Smith
  - Charlie Brown

- **2 Sample Transactions**

You can delete these and add your own!

## 🎯Key Functions

| Function | Purpose |
|----------|---------|
| `addBook()` | Add new book to library |
| `registerUser()` | Register new member |
| `issueBook()` | Issue book to member |
| `returnBook()` | Return book from member |
| `editBook()` / `editUser()` | Edit existing records |
| `deleteBook()` / `deleteUser()` | Delete records |
| `filterBooks()` / `filterUsers()` | Search/filter functionality |
| `updateDashboard()` | Update statistics |
| `validateEmail()` | Email format validation |

## 📱 Responsive Design

- ✅ Works on Desktop (1200px+)
- ✅ Tablets (768px - 1200px)
- ✅ Mobile (< 768px)
- ✅ Smooth navigation on all devices
- ✅ Touch-friendly buttons and forms

## Color Scheme

- **Primary**: #2c3e50 (Dark Blue-Gray)
- **Secondary**: #3498db (Sky Blue)
- **Success**: #27ae60 (Green)
- **Danger**: #e74c3c (Red)
- **Warning**: #f39c12 (Orange)

## Future Enhancements

- [ ] Backend integration (Node.js/Express)
- [ ] Database (MongoDB/MySQL)
- [ ] User authentication
- [ ] Email notifications
- [ ] Fine payment system
- [ ] Book recommendations
- [ ] Member reports
- [ ] Bulk import/export
- [ ] Advanced analytics
- [ ] Mobile app version

## Files Structure

```
library-management-website/
├── index.html          # Main HTML structure
├── style.css           # Complete styling (900+ lines)
├── script.js           # All JavaScript logic (500+ lines)
└── README.md           # Documentation
```

## 💡 Technical Details

- **Pure JavaScript**: No external frameworks
- **Responsive CSS**: Mobile-first design
- **Clean Code**: Well-commented and organized
- **Professional UI**: Modern design patterns
- **Form Validation**: All inputs validated
- **Error Handling**: User-friendly error messages
- **Dynamic DOM**: Elements created/updated via JavaScript
- **Event Listeners**: Comprehensive event handling

##  Troubleshooting

### Data not appearing?
- Refresh the page
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

### Dropdowns empty?
- Add at least one book or member first
- Dropdowns populate automatically

### Modal not closing?
- Click outside the modal or X button
- Should close properly

## 📧 Contact & Support

For issues or suggestions, create a GitHub issue or reach out!

## 📄 License

Open source - Free to use and modify!

---

**Built with ❤️ using HTML, CSS, and JavaScript**

**Start managing your library today! 📚✨**

# Taskify - Ứng dụng Quản lý Công việc

Taskify là một ứng dụng quản lý công việc (Task Management) được xây dựng với MERN stack (MongoDB, Express, React, Node.js). Ứng dụng cung cấp giao diện Kanban board trực quan để theo dõi tiến độ công việc với 3 trạng thái: Chưa bắt đầu, Đang thực hiện và Hoàn thành.

## Tính năng chính

### Xác thực người dùng
- Đăng ký tài khoản mới
- Đăng nhập/Đăng xuất
- Xác thực JWT với cookie-based sessions
- Bảo mật mật khẩu với bcrypt

### Quản lý công việc
- Tạo công việc mới với tiêu đề, mô tả và mức độ ưu tiên
- Chỉnh sửa thông tin công việc
- Xóa công việc
- Phân loại công việc theo trạng thái:
  - **Chưa bắt đầu**: Công việc mới tạo
  - **Đang thực hiện**: Công việc đang được thực hiện
  - **Hoàn thành**: Công việc đã hoàn thành
- Phân loại mức độ ưu tiên: Thấp, Trung bình, Cao
- Giao diện Kanban board với 3 cột trạng thái

### Giao diện người dùng
- Thiết kế responsive với Tailwind CSS
- Giao diện hiện đại, thân thiện
- Icons từ Lucide React và React Icons
- Trải nghiệm người dùng mượt mà

## Công nghệ sử dụng

### Frontend
- **React 19** - Thư viện UI
- **Vite** - Build tool và dev server
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS 4** - Styling framework
- **Lucide React** - Icon library
- **Biome** - Linter và formatter

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM cho MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling
- **Nodemon** - Development auto-reload

## Cấu trúc dự án

```
taskify-yt/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── Dashboard/ # Dashboard components
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    │   ├── task.js
    │   └── user.js
    ├── models/           # Mongoose models
    │   ├── task.js
    │   └── user.js
    ├── services/         # Business logic
    │   ├── task.js
    │   └── user.js
    ├── app.js           # Express app setup
    ├── connection.js    # MongoDB connection
    ├── middleware.js    # Authentication middleware
    └── package.json
```

## Cài đặt và Chạy ứng dụng

### Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- MongoDB (local hoặc MongoDB Atlas)
- npm hoặc yarn

### 1. Clone repository

```bash
git clone <repository-url>
cd taskify-yt
```

### 2. Cài đặt Backend

```bash
cd server
npm install
```

Tạo file `.env` trong thư mục `server/`:

```env
PORT=1000
MONGODB_URI=mongodb://localhost:27017/taskify
JWT_SECRET=your_jwt_secret_key_here
```

Chạy server:

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:1000`

### 3. Cài đặt Frontend

Mở terminal mới:

```bash
cd client
npm install
```

Chạy ứng dụng React:

```bash
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

## API Endpoints

### User Routes (`/api/v1/users`)
- `POST /register` - Đăng ký người dùng mới
- `POST /login` - Đăng nhập
- `POST /logout` - Đăng xuất
- `GET /user-details` - Lấy thông tin người dùng (cần authentication)

### Task Routes (`/api/v1/tasks`)
- `GET /` - Lấy tất cả công việc của user (cần authentication)
- `POST /add-task` - Tạo công việc mới (cần authentication)
- `GET /get-task/:id` - Lấy thông tin một công việc (cần authentication)
- `PUT /edit-task/:id` - Chỉnh sửa công việc (cần authentication)
- `DELETE /delete-task/:id` - Xóa công việc (cần authentication)

## Database Schema

### User Model
```javascript
{
  username: String (required),
  email: String (required),
  password: String (required, hashed),
  tasks: [ObjectId] (ref: Task)
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String (required),
  priority: String (enum: ["thấp", "trung bình", "cao"], default: "thấp"),
  status: String (enum: ["chưa bắt đầu", "đang thực hiện", "hoàn thành"], default: "chưa bắt đầu"),
  timestamps: true
}
```

## Scripts

### Frontend (client/)
```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run preview  # Preview production build
npm run lint     # Chạy ESLint
npm run format   # Format code với Biome
npm run check    # Check và fix với Biome
```

### Backend (server/)
```bash
npm run dev      # Chạy server với nodemon
npm run format   # Format code với Biome
npm run lint     # Lint code với Biome
npm run check    # Check và fix với Biome
```

## Tính năng bảo mật

- Mật khẩu được hash với bcryptjs
- JWT tokens được lưu trong HTTP-only cookies
- CORS được cấu hình để chấp nhận credentials
- Middleware authentication bảo vệ các routes quan trọng
- Validation dữ liệu đầu vào

## Hướng phát triển

- [ ] Thêm tính năng kéo thả (drag & drop) cho Kanban board
- [ ] Thêm deadline cho công việc
- [ ] Thêm tags/labels cho công việc
- [ ] Thêm tính năng tìm kiếm và lọc
- [ ] Thêm notifications
- [ ] Thêm dark mode
- [ ] Thêm tính năng chia sẻ công việc với người khác
- [ ] Export/Import dữ liệu
- [ ] Dashboard analytics và statistics

## Tác giả

Trần Anh Tuấn

## License

ISC

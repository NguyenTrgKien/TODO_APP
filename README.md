## Todo App - Trang quản lý Công việc Cá Nhân

## Cài đặt và chạy local

### Yêu cầu

- Node.js >= 18.0.0
- npm >= 9.0.0

### Các bước cài đặt

## 1. Clone respository

git clone https://github.com/NguyenTrgKien/TODO_APP.git

## 2. Di chuyển vào thư mục dự án

cd TEST_INTERN_REACT

## 3. Cài đặt dependencies

npm install

## 4. Chạy ứng dụng

npm run dev

## 5. Mở trình duyệt tại

http://localhost:5173

---

## 🛠 Quyết định kỹ thuật

### 1. Quản lý state với Context API

Dùng Context API để quản lý state toàn cục vì ứng dụng có quy mô nhỏ,
không cần boilerplate phức tạp. Context API đủ đáp ứng yêu cầu chia sẻ state
giữa các component.

### 2. Lưu dữ liệu với localStorage

Dữ liệu task được lưu vào localStorage để không bị mất khi tắt trình duyệt.
Mỗi khi state thay đổi, dữ liệu được sync xuống localStorage thông qua useEffect.

### 3. Xử lý "Quá hạn" theo hướng tính toán động

Task "quá hạn" được tính động dựa trên trường deadline (timestamp) so với
thời điểm hiện tại, thay vì lưu thành một status riêng. Lý do:

- Tránh conflict dữ liệu (task vừa DONE vừa EXPIRED)
- Không cần phải cập nhật expired định kì
- Status chỉ phản ánh tiến độ công việc (TODO, IN_PROGRESS, DONE)

### 4. Cảnh báo deadline

- "Sắp tới hạn": còn <= 2 ngày
- "Đã quá hạn": deadline đã qua
- Không hiển thị cảnh báo nếu task đã DONE

### 6. Responsive

- StatBar: grid 1 → 2 → 4 cột theo breakpoint
- BoardView: grid 1 → 2 → 3 cột theo breakpoint
- ListView: scroll ngang trên mobile

### 7. Dark mode

Hỗ trợ dark mode thông qua Tailwind CSS dark: variant, toggle lưu vào
localStorage để giữ theme khi reload trang.

---

## Những điểm cải thiện nếu có thêm thời gian

- **Phân trang**: thêm pagination hoặc infinite scroll khi có nhiều task
- **Hỗ trợ đa ngôn ngữ**: thêm ngôn ngữ tiếng anh để có thể chuyển đổi giữa hai ngôn ngữ

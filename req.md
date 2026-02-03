Tạo file /src/routes/auth.route.js:

POST /api/auth/register - Đăng ký user mới với email và password, trả về thông tin user và access token (JWT)

POST /api/auth/login - Đăng nhập với email/password, trả về thông tin user và access token (JWT)

Tạo file /src/routes/conversations.route.js:

POST /api/conversations - Tạo cuộc trò chuyện mới, nhận name, type ("group" hoặc "direct"), participant_ids array

GET /api/conversations - Lấy danh sách tất cả conversations của user hiện tại

POST /api/conversations/:id/participants - Thêm user vào conversation (chỉ group chat), nhận user_id trong body

POST /api/conversations/:id/messages - Gửi tin nhắn mới, nhận content trong body, lưu sender_id từ user đang login hiện tại

GET /api/conversations/:id/messages - Lấy tất cả messages trong conversation, sắp xếp theo thời gian tạo, kèm thông tin sender

Tạo file /src/routes/users.route.js:

GET /api/users/search?q=email - Tìm kiếm user theo email để thêm vào conversation

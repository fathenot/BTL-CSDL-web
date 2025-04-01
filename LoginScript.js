document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login-form form");

    // Lắng nghe sự kiện submit từ form đăng nhập
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn chặn reload trang khi submit form

        const email = document.querySelector("#login-email").value; // email là duy nhất nên không cần phải chỉnh thành username
        const password = document.querySelector("#login-password").value;

        // Kiểm tra nếu email hoặc password trống
        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        try {
            // Gọi API để thực hiện đăng nhập
            const data = await callAPI("login", "POST", { email, password });

            // Kiểm tra kết quả trả về từ API
            if (data && data.token) {
                alert("Đăng nhập thành công!");
                localStorage.setItem("token", data.token); // Lưu token vào localStorage
                if(data.role === 'admin'){
                    window.location.href = "AdminPage.html"; // chuyển sang trang của quản trị viên
                }
                else{
                    window.location.href = "HomePage.html"; // Chuyển sang trang khách hàng aka trang chủ của website 
                }
            } else {
                alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    });

    // Hàm để lấy thông tin người dùng từ API khi đã đăng nhập
    async function getUserProfile() {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage

        if (!token) {
            alert("Bạn chưa đăng nhập!");
            return;
        }

        try {
            const userData = await callAPI("profile", "GET", null, token);
            console.log("Thông tin người dùng:", userData);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            alert("Không thể lấy thông tin người dùng. Vui lòng thử lại sau.");
        }
    }
});

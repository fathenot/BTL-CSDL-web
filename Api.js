// Định nghĩa URL API (sau này chỉ cần sửa chỗ này)
const API_BASE_URL = "https://yourapi.com/api"; 

// Hàm gửi request API chung
async function callAPI(endpoint, method = "GET", data = null) {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };
        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Có lỗi xảy ra");
        }

        return result; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi API:", error);
        alert(error.message);
        return null;
    }
}

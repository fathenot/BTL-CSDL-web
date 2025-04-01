document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("#register-form form");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn chặn reload trang

        // thông tin tài khoản
        const FirstName = document.querySelector("#register-firstname").value;
        const LastName = document.querySelector("register-lastname").value;
        const UserName = document.querySelector("register-username").value;
        const UserEmail = document.querySelector("#register-email").value;
        const UserPassword = document.querySelector("#register-password").value;
        const role = document.querySelector("#account-type")

        // kiểm tra đăng kí
        var data = undefined;
        if (role === 'admin'){
            data = await callAPI("register", "POST", {FirstName, LastName, UserName, UserEmail, UserPassword, role: "admin"})
        }
        else {
            const address = document.querySelector("#register-address").value;
            data = await callAPI("register", "POST", {FirstName, LastName, UserName, UserEmail, UserPassword, address, role: "customer"})
        }

        if (data) {
            alert("Đăng ký thành công! Hãy đăng nhập.");
            window.location.href = "LoginPage.html";
        }
    });
});

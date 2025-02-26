document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");

    loginBtn.addEventListener("click", async () => {
        const username = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value.trim();
        const errorText = document.getElementById("login-error");

        if (!username || !password) {
            errorText.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
            errorText.style.display = "block";
            return;
        }

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                window.location.href = "admin-dashboard.html";
            } else {
                errorText.textContent = data.message;
                errorText.style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
            errorText.textContent = "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
            errorText.style.display = "block";
        }
    });
});

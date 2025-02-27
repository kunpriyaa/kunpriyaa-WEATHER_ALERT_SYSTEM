document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("save-btn").addEventListener("click", async () => {
        const location = document.getElementById("location").value.trim();
        const temperature = document.getElementById("temperature").value.trim();
        const rainfall = document.getElementById("rainfall").value.trim();
        const token = localStorage.getItem("adminToken");

        if (!token) {
            alert("กรุณาเข้าสู่ระบบก่อน");
            window.location.href = "/admin-login.html";
            return;
        }

        if (!location || temperature === "" || rainfall === "") {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }

        const weatherData = {
            location,
            temperature: parseFloat(temperature),
            rainfall: parseFloat(rainfall),
        };

        try {
            const response = await fetch("http://localhost:5000/api/weather", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(weatherData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("บันทึกข้อมูลสำเร็จ!");
                document.getElementById("location").value = "";
                document.getElementById("temperature").value = "";
                document.getElementById("rainfall").value = "";
            } else {
                alert(`เกิดข้อผิดพลาด: ${result.message || "ไม่สามารถบันทึกข้อมูลได้"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        }
    });
});

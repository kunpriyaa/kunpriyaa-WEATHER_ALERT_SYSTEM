document.getElementById('save-btn').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    const temperature = document.getElementById('temperature').value;
    const rainfall = document.getElementById('rainfall').value;
    
    const token = localStorage.getItem('adminToken');

    const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ location, temperature, rainfall })
    });

    if (response.ok) {
        alert('บันทึกข้อมูลสำเร็จ!');
    } else {
        alert('เกิดข้อผิดพลาด');
    }
});

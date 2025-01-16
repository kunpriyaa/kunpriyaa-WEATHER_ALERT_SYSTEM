export function handleSettings() {
  const settingsForm = document.getElementById('settings-form');
  
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const temperatureUnit = document.querySelector('input[name="temperature-unit"]:checked').value;
    const notificationEnabled = document.getElementById('notifications').checked;

    console.log(`ตั้งค่าหน่วยอุณหภูมิ: ${temperatureUnit}`);
    console.log(`การแจ้งเตือน: ${notificationEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`);

    alert('การตั้งค่าถูกบันทึกเรียบร้อย');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('/user/profile')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById('profileName').textContent = data.username;
      } else {
        document.getElementById('profileName').textContent = 'Login required';
      }
    })
    .catch(error => {
      document.getElementById('profileName').textContent = 'Error loading profile';
      console.error('Error:', error);
    });
});
// Dashboard details

document.addEventListener("DOMContentLoaded", async () => {
  // Nairobi time
  setInterval(() => {
    const now = new Date().toLocaleTimeString("en-KE", { timeZone: "Africa/Nairobi" });
    document.getElementById('time').textContent = now;
  }, 1000);

  // Battery
  if (navigator.getBattery) {
    navigator.getBattery().then(b => {
      function updateBattery() {
        document.getElementById('battery').textContent = Math.round(b.level * 100);
      }
      b.addEventListener("levelchange", updateBattery);
      updateBattery();
    });
  }

  // IP address
  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
      document.getElementById('ip').textContent = data.ip;
    });

  // Profile
  fetch('/user/profile')
    .then(res => res.json())
    .then(user => {
      document.getElementById('profile').innerHTML = `
        <p>Username: ${user.username}</p>
        <p>Joined: ${new Date(user.created_at).toLocaleString()}</p>
      `;
    });

  // Viewers (fake counter, replace with socket if needed)
  const viewers = Math.floor(Math.random() * 10) + 1;
  document.getElementById('viewers').textContent = viewers;
});
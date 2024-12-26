const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3000');

// Koneksi ke WebSocket Server
ws.on('open', () => {
  console.log('Terhubung ke WebSocket server');

  // Kirim pesan dengan keyword "alert"
  ws.send('Halo Server! Keyword: alert');

  // Minta data logs
  ws.send('get_logs');
});

// Terima pesan dari server
ws.on('message', (data) => {
  const response = JSON.parse(data);

  // Tangani respons dari server
  if (response.logs) {
    console.log('Data logs dari server:', response.logs);
  } else if (response.notification) {
    console.log('Notifikasi dari server:', response.notification);
  } else {
    console.log('Pesan lain dari server:', response);
  }
});

// Tangani error
ws.on('error', (err) => {
  console.error('Error WebSocket:', err);
});

// Tangani koneksi ditutup
ws.on('close', () => {
  console.log('Koneksi WebSocket ditutup');
});

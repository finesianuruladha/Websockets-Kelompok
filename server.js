
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Kirim pesan ke klien setiap 3 detik
  setInterval(() => {
    ws.send(JSON.stringify({ 
      message: 'Data dari server', 
      timestamp: new Date() 
    }));
  }, 3000);

  // Terima pesan dari klien
  ws.on('message', (message) => {
    console.log(`Pesan dari client: ${message}`);

    // Deteksi keyword "alert"
    if (message.includes('alert')) {
      ws.send(JSON.stringify({ notification: 'Keyword "alert" terdeteksi!' }));
    }
  });

  // Ketika klien terputus
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server berjalan di ws://localhost:3000');

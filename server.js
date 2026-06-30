const express = require('express');
const path = require('path');
const UAParser = require('ua-parser-js');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Frontend path
app.get('/instadrive', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Analytics tracking endpoint
app.post('/log-data', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const rawUserAgent = req.headers['user-agent'];
    const hardware = req.body;

    // User-Agent dynamic processing engine
    const parser = new UAParser();
    parser.setUA(rawUserAgent);
    const result = parser.getResult();

    console.log(`\n================ DIAGNOSTIC REPORT ================`);
    console.log(`[+] Network IP      : ${userIP}`);
    console.log(`[+] OS Context      : ${result.os.name || 'Unknown'} ${result.os.version || ''}`);
    console.log(`[+] Browser Info    : ${result.browser.name || 'Unknown'} (v${result.browser.version || '?'})`);
    
    // Hardware Diagnostics (Android & Desktop Compatible)
    console.log(`[+] Device Brand    : ${result.device.vendor || 'Generic / Desktop'}`);
    console.log(`[+] Device Model    : ${result.device.model || 'Unknown Model'}`);
    
    // UI Metadata
    console.log(`[+] Resolution Profiler: ${hardware.screenWidth}x${hardware.screenHeight}`);
    console.log(`==================================================\n`);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Analytics server running locally on port ${PORT}`);
});

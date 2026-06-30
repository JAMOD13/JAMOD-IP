const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/test-link', (req, res) => {
    let clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let userAgent = req.headers['user-agent'];

    console.log("\n--- [ Nayi Request ] ---");
    console.log("IP Address: " + clientIP);
    console.log("Device: " + userAgent);
    console.log("------------------------\n");

    res.send("<h1>Server Active</h1><p>Aapka test link sahi se kaam kar raha hai!</p>");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});


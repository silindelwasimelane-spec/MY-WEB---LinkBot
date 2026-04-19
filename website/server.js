require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Store pairing requests
const pairingRequestsFile = path.join(__dirname, 'pairing-requests.json');

// Initialize pairing requests file if it doesn't exist
if (!fs.existsSync(pairingRequestsFile)) {
    fs.writeFileSync(pairingRequestsFile, JSON.stringify([], null, 2));
}

// Get all pairing requests
function getPairingRequests() {
    try {
        const data = fs.readFileSync(pairingRequestsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading pairing requests:', error);
        return [];
    }
}

// Save pairing request
function savePairingRequest(request) {
    try {
        const requests = getPairingRequests();
        requests.push({
            ...request,
            id: Date.now(),
            status: 'pending'
        });
        fs.writeFileSync(pairingRequestsFile, JSON.stringify(requests, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving pairing request:', error);
        return false;
    }
}

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to handle pairing requests
app.post('/api/pair', (req, res) => {
    try {
        const { userName, userNumber, userEmail, message } = req.body;

        // Validate required fields
        if (!userName || !userNumber) {
            return res.status(400).json({
                success: false,
                message: 'Name and WhatsApp number are required'
            });
        }

        // Validate phone number format
        if (!/^\d{10,}$/.test(userNumber.replace(/\D/g, ''))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format'
            });
        }

        // Create pairing request
        const pairingRequest = {
            userName,
            userNumber,
            userEmail: userEmail || 'Not provided',
            message: message || 'No message',
            timestamp: new Date().toISOString(),
            ownerName: process.env.BOT_OWNER_NAME || 'SiyamThanda',
            ownerNumber: process.env.BOT_OWNER_NUMBER || '+27765160521'
        };

        // Save to file
        const saved = savePairingRequest(pairingRequest);

        if (saved) {
            console.log('Pairing request received:', pairingRequest);
            
            // In a real scenario, you would send an email or WhatsApp notification here
            // For now, just log it
            
            res.json({
                success: true,
                message: 'Pairing request received successfully',
                data: {
                    ownerNumber: pairingRequest.ownerNumber,
                    ownerName: pairingRequest.ownerName
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to save pairing request'
            });
        }
    } catch (error) {
        console.error('Error handling pairing request:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
});

// Get pairing requests (admin endpoint - should be protected in production)
app.get('/api/pairing-requests', (req, res) => {
    try {
        const requests = getPairingRequests();
        res.json({
            success: true,
            count: requests.length,
            requests: requests
        });
    } catch (error) {
        console.error('Error retrieving pairing requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving pairing requests'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        botOwner: process.env.BOT_OWNER_NAME || 'SiyamThanda',
        botName: 'MY WEB - LinkBot'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🤖 MY WEB - LinkBot Pairing Website`);
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
    console.log(`botOwner: ${process.env.BOT_OWNER_NAME || 'SiyamThanda'}`);
    console.log(`📊 Pairing requests stored in: ${pairingRequestsFile}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down...');
    process.exit(0);
});

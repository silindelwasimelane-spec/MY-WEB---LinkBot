// Form submission handler
document.getElementById('pairingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const userName = document.getElementById('userName').value.trim();
    const userNumber = document.getElementById('userNumber').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();
    const message = document.getElementById('message').value.trim();

    // Hide previous messages
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';

    // Validate inputs
    if (!userName || !userNumber) {
        showError('Please fill in all required fields (Name and WhatsApp Number)');
        return;
    }

    if (userNumber.length < 9) {
        showError('Please enter a valid WhatsApp number');
        return;
    }

    try {
        // Prepare the data
        const fullNumber = `27${userNumber}`;
        const pairingData = {
            userName: userName,
            userNumber: fullNumber,
            userEmail: userEmail,
            message: message,
            timestamp: new Date().toISOString(),
            ownerName: 'SiyamThanda',
            ownerNumber: '+27765160521'
        };

        // Try to send to server (if available)
        try {
            const response = await fetch('/api/pair', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pairingData)
            });

            if (!response.ok) {
                throw new Error('Server response not OK');
            }

            const result = await response.json();
            
            if (result.success) {
                showSuccess(fullNumber);
            } else {
                showError(result.message || 'Failed to process pairing request');
            }
        } catch (serverError) {
            console.log('Server not available, processing locally...', serverError);
            // Process locally - store data and show success
            localStorage.setItem('lastPairingRequest', JSON.stringify(pairingData));
            showSuccess(fullNumber);
        }

    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred. Please try again later.');
    }
});

function showSuccess(phoneNumber) {
    const successMsg = document.getElementById('successMessage');
    const displayPhoneNumber = document.getElementById('displayPhoneNumber');
    
    displayPhoneNumber.textContent = `+${phoneNumber}`;
    
    successMsg.style.display = 'block';
    
    // Clear form
    document.getElementById('pairingForm').reset();
    
    // Scroll to message
    successMsg.scrollIntoView({ behavior: 'smooth' });

    // Log the pairing request
    console.log('Pairing request stored successfully');
}

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorMsg.style.display = 'block';
    
    // Scroll to message
    errorMsg.scrollIntoView({ behavior: 'smooth' });
}

// Format phone number input in real-time
document.getElementById('userNumber').addEventListener('input', (e) => {
    // Remove any non-digit characters
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Add smooth scroll behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize - check if there are saved pairing requests in localStorage
window.addEventListener('load', () => {
    // You can use this to display saved requests or sync with backend
    const lastRequest = localStorage.getItem('lastPairingRequest');
    if (lastRequest) {
        console.log('Last pairing request:', JSON.parse(lastRequest));
    }
});

// Add animation to features on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature elements
document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
});

// Add CSS for fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .feature {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Example: Log form submission for testing
console.log('Pairing website loaded successfully');
console.log('Bot Owner: SiyamThanda');
console.log('Contact: sillindelwasimelane@gmail.com');
console.log('WhatsApp: +27765160521');

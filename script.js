// Global Variables
let currentSlide = 0;
let currentTestimonial = 0;

// Brand-specific Solar System Pricing Data
function getBrandPricing() {
    const defaultBrandPricing = {
        tata: {
            1: { generation: 120, savings: 14400, price: 60000, subsidy: 18000 },
            2: { generation: 240, savings: 144000, price: 125000, subsidy: 37500 },
            3: { generation: 360, savings: 43200, price: 180000, subsidy: 78000 },
            4: { generation: 480, savings: 57600, price: 240000, subsidy: 72000 },
            5: { generation: 600, savings: 72000, price: 300000, subsidy: 90000 },
            6: { generation: 720, savings: 86400, price: 350000, subsidy: 105000 },
            7: { generation: 840, savings: 100800, price: 385000, subsidy: 115500 },
            8: { generation: 960, savings: 115200, price: 400000, subsidy: 120000 },
            9: { generation: 1080, savings: 129600, price: 415000, subsidy: 124500 },
            10: { generation: 1200, savings: 144000, price: 425000, subsidy: 127500 }
        },
        adani: {
            1: { generation: 125, savings: 15000, price: 65000, subsidy: 19500 },
            2: { generation: 250, savings: 150000, price: 135000, subsidy: 40500 },
            3: { generation: 375, savings: 45000, price: 195000, subsidy: 85000 },
            4: { generation: 500, savings: 60000, price: 260000, subsidy: 78000 },
            5: { generation: 625, savings: 75000, price: 325000, subsidy: 97500 },
            6: { generation: 750, savings: 90000, price: 380000, subsidy: 114000 },
            7: { generation: 875, savings: 105000, price: 420000, subsidy: 126000 },
            8: { generation: 1000, savings: 120000, price: 435000, subsidy: 130500 },
            9: { generation: 1125, savings: 135000, price: 450000, subsidy: 135000 },
            10: { generation: 1250, savings: 150000, price: 465000, subsidy: 139500 }
        },
        luminous: {
            1: { generation: 115, savings: 13800, price: 55000, subsidy: 16500 },
            2: { generation: 230, savings: 138000, price: 115000, subsidy: 34500 },
            3: { generation: 345, savings: 41400, price: 165000, subsidy: 72000 },
            4: { generation: 460, savings: 55200, price: 220000, subsidy: 66000 },
            5: { generation: 575, savings: 69000, price: 275000, subsidy: 82500 },
            6: { generation: 690, savings: 82800, price: 320000, subsidy: 96000 },
            7: { generation: 805, savings: 96600, price: 355000, subsidy: 106500 },
            8: { generation: 920, savings: 110400, price: 370000, subsidy: 111000 },
            9: { generation: 1035, savings: 124200, price: 385000, subsidy: 115500 },
            10: { generation: 1150, savings: 138000, price: 395000, subsidy: 118500 }
        },
        exide: {
            1: { generation: 110, savings: 13200, price: 58000, subsidy: 17400 },
            2: { generation: 220, savings: 132000, price: 128000, subsidy: 38400 },
            3: { generation: 330, savings: 39600, price: 185000, subsidy: 80000 },
            4: { generation: 440, savings: 52800, price: 245000, subsidy: 73500 },
            5: { generation: 550, savings: 66000, price: 305000, subsidy: 91500 },
            6: { generation: 660, savings: 79200, price: 360000, subsidy: 108000 },
            7: { generation: 770, savings: 92400, price: 375000, subsidy: 112500 },
            8: { generation: 880, savings: 105600, price: 390000, subsidy: 117000 },
            9: { generation: 990, savings: 118800, price: 405000, subsidy: 121500 },
            10: { generation: 1100, savings: 132000, price: 415000, subsidy: 124500 }
        },
        waaree: {
            1: { generation: 130, savings: 15600, price: 62000, subsidy: 18600 },
            2: { generation: 260, savings: 156000, price: 130000, subsidy: 39000 },
            3: { generation: 390, savings: 46800, price: 190000, subsidy: 83000 },
            4: { generation: 520, savings: 62400, price: 250000, subsidy: 75000 },
            5: { generation: 650, savings: 78000, price: 315000, subsidy: 94500 },
            6: { generation: 780, savings: 93600, price: 370000, subsidy: 111000 },
            7: { generation: 910, savings: 109200, price: 395000, subsidy: 118500 },
            8: { generation: 1040, savings: 124800, price: 410000, subsidy: 123000 },
            9: { generation: 1170, savings: 140400, price: 425000, subsidy: 127500 },
            10: { generation: 1300, savings: 156000, price: 440000, subsidy: 132000 }
        }
    };
    
    const savedBrandPricing = localStorage.getItem('brandPricingData');
    return savedBrandPricing ? JSON.parse(savedBrandPricing) : defaultBrandPricing;
}

// Legacy function for backward compatibility
function getOnGridPricing() {
    const brandPricing = getBrandPricing();
    return brandPricing; // Return all brand data
}

let onGridPricing = getBrandPricing();
let currentBrand = 'tata'; // Default brand
let currentSelectedKW = null; // Track selected KW

// Select brand by logo click
function selectBrand(brand) {
    currentBrand = brand;
    
    // Update active logo
    document.querySelectorAll('.brand-logo').forEach(logo => {
        logo.classList.remove('active');
    });
    document.querySelector(`[data-brand="${brand}"]`).classList.add('active');
    
    // Update pricing data and KW cards
    onGridPricing = getBrandPricing();
    updateKWCardPrices();
}

// Legacy function for dropdown (if needed)
function updateBrandPricing() {
    const selectElement = document.getElementById('brandSelect');
    if (selectElement) {
        currentBrand = selectElement.value;
        onGridPricing = getBrandPricing();
        updateKWCardPrices();
    }
}

// Update KW card prices from current brand data
function updateKWCardPrices() {
    // Refresh pricing data from localStorage
    onGridPricing = getBrandPricing();
    const currentBrandData = onGridPricing[currentBrand] || onGridPricing.tata;
    
    // Update each KW card price
    for (let kw = 1; kw <= 10; kw++) {
        const priceElement = document.getElementById(`kw-price-${kw}`);
        if (priceElement && currentBrandData[kw]) {
            priceElement.textContent = '₹' + currentBrandData[kw].price.toLocaleString();
        }
    }
}

// Open price modal
function openPriceModal() {
    const modal = document.getElementById('priceModal');
    const priceResult = document.getElementById('priceResult');
    currentSelectedKW = null; // Reset selected KW
    
    // Initialize with current brand pricing
    updateKWCardPrices();
    
    // Reset form
    document.querySelectorAll('.kw-card').forEach(card => {
        card.classList.remove('selected');
    });
    priceResult.style.display = 'none';
    
    // Update KW card prices from admin data
    updateKWCardPrices();
    
    modal.style.display = 'block';
}

// Open price calculator modal with specific brand
function openPriceModalWithBrand(brand) {
    currentBrand = brand;
    onGridPricing = getBrandPricing();
    currentSelectedKW = null; // Reset selected KW
    
    const modal = document.getElementById('priceModal');
    const priceResult = document.getElementById('priceResult');
    
    // Reset form
    document.querySelectorAll('.kw-card').forEach(card => {
        card.classList.remove('selected');
    });
    priceResult.style.display = 'none';
    
    // Update KW card prices with selected brand data
    updateKWCardPrices();
    
    modal.style.display = 'block';
    
    // Track price modal view
    trackEvent('price_calculator_opened');
}

// Select KW option
function selectKW(kw) {
    // Remove selection from all cards
    document.querySelectorAll('.kw-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    document.querySelector(`[data-kw="${kw}"]`).classList.add('selected');
    
    // Update current selected KW for tracking
    currentSelectedKW = kw;
    
    // Calculate and show price
    calculatePrice(kw);
    
    // Automatically switch to details view
    showDetailsView();
}

// Calculate and display price for selected KW
function calculatePrice(selectedKW) {
    // Get current brand pricing
    const brandPricing = getBrandPricing();
    const currentBrandData = brandPricing[currentBrand] || brandPricing.tata;
    const systemData = currentBrandData[selectedKW];
    if (!systemData) return;

    const priceResult = document.getElementById('priceResult');
    
    // Check if there are any saved custom values for this KW selection
    const savedContent = localStorage.getItem('editableContent');
    let hasCustomValues = false;
    if (savedContent) {
        const allSavedContent = JSON.parse(savedContent);
        // Check if any KW-specific values exist for this selection
        Object.keys(allSavedContent).forEach(key => {
            if (key.includes(`kw-${selectedKW}`)) {
                hasCustomValues = true;
            }
        });
    }
    
    // Only update if no custom values exist, otherwise preserve current content
    if (!hasCustomValues) {
        document.getElementById('capacityDisplay').textContent = selectedKW + ' KW';
        document.getElementById('generationDisplay').textContent = systemData.generation + ' units';
        document.getElementById('savingsDisplay').textContent = '₹' + systemData.savings.toLocaleString();
        
        // Use subsidy amount from current brand data directly as gov subsidy
        let subsidyAmount = systemData.subsidy || 0;
        
        document.getElementById('totalPrice').textContent = '₹' + systemData.price.toLocaleString();
        document.getElementById('subsidyPrice').textContent = '₹' + subsidyAmount.toLocaleString();
    } else {
        // Load saved custom values
        if (savedContent) {
            const allSavedContent = JSON.parse(savedContent);
            const capacityKey = `[data-editable="price-calculator-capacity-kw-${selectedKW}"]_0`;
            const generationKey = `[data-editable="price-calculator-generation-kw-${selectedKW}"]_0`;
            const savingsKey = `[data-editable="price-calculator-savings-kw-${selectedKW}"]_0`;
            const totalKey = `[data-editable="price-calculator-total-kw-${selectedKW}"]_0`;
            const subsidyKey = `[data-editable="price-calculator-subsidy-kw-${selectedKW}"]_0`;
            
            if (allSavedContent[capacityKey]) document.getElementById('capacityDisplay').textContent = allSavedContent[capacityKey];
            if (allSavedContent[generationKey]) document.getElementById('generationDisplay').textContent = allSavedContent[generationKey];
            if (allSavedContent[savingsKey]) document.getElementById('savingsDisplay').textContent = allSavedContent[savingsKey];
            if (allSavedContent[totalKey]) document.getElementById('totalPrice').textContent = allSavedContent[totalKey];
            if (allSavedContent[subsidyKey]) {
                document.getElementById('subsidyPrice').textContent = allSavedContent[subsidyKey];
            } else {
                // Use subsidy amount directly from current brand data if no custom subsidy saved
                let subsidyAmount = systemData.subsidy || 0;
                document.getElementById('subsidyPrice').textContent = '₹' + subsidyAmount.toLocaleString();
            }
        }
    }
    
    // Show result with animation
    priceResult.style.display = 'block';
    priceResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Refresh admin editing if in edit mode
    if (isEditMode) {
        setTimeout(() => {
            refreshPriceCalculatorEditing();
        }, 100);
    }
    
    // Track calculation
    trackEvent('price_calculated', { kw: selectedKW, price: systemData.price });
}

// Close price modal
function closePriceModal() {
    document.getElementById('priceModal').style.display = 'none';
}

// Toggle between capacity and details view
function showCapacityView() {
    // Update button states
    document.getElementById('capacityBtn').classList.add('active');
    document.getElementById('detailsBtn').classList.remove('active');
    
    // Show capacity selector, hide details
    document.querySelector('.kw-selector-container').style.display = 'block';
    document.getElementById('priceResult').style.display = 'none';
}

function showDetailsView() {
    // Check if a KW is selected
    if (!currentSelectedKW) {
        alert('Please select a system capacity first!');
        return;
    }
    
    // Update button states
    document.getElementById('detailsBtn').classList.add('active');
    document.getElementById('capacityBtn').classList.remove('active');
    
    // Hide capacity selector, show details
    document.querySelector('.kw-selector-container').style.display = 'none';
    document.getElementById('priceResult').style.display = 'block';
    
    // Ensure the details are calculated and displayed
    calculatePrice(currentSelectedKW);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set sun/moon based on time
    setCelestialBody();
    
    // Hide loading screen after page loads
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 4500);

    // Initialize all functionality
    initNavigation();
    initSliders();
    initScrollEffects();
    initVisitorTracking();
    initTestimonialCarousel();
    initAdminSystem(); // Add admin system initialization
    
    // Update KW card prices on page load
    updateKWCardPrices();
});

// Set sun or moon based on current time
function setCelestialBody() {
    const currentHour = new Date().getHours();
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    const heroSun = document.getElementById('hero-sun');
    const heroMoon = document.getElementById('hero-moon');
    
    // Show sun during day (6 AM to 6 PM), moon during night
    if (currentHour >= 6 && currentHour < 18) {
        if (sun) sun.style.display = 'block';
        if (moon) moon.style.display = 'none';
        if (heroSun) heroSun.style.display = 'block';
        if (heroMoon) heroMoon.style.display = 'none';
    } else {
        if (sun) sun.style.display = 'none';
        if (moon) moon.style.display = 'block';
        if (heroSun) heroSun.style.display = 'none';
        if (heroMoon) heroMoon.style.display = 'block';
    }
}

// Navigation Functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(255, 124, 0, 0.1)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Slider Functions
function initSliders() {
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        // Auto-advance slides
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add('active');
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 0) {
        setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 4000);
    }
}

// Scroll Effects
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.highlight-card, .service-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Quote Modal Functions
function openQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Reset form
    document.getElementById('quote-form').reset();
}

// Open quote modal with selected KW
function openQuoteModalWithKW() {
    // Check if KW is selected
    if (!currentSelectedKW) {
        alert('Please select a KW capacity first!');
        return;
    }
    
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    document.getElementById('quote-form').reset();
    
    // Auto-fill the capacity field with selected KW
    const capacityInput = document.getElementById('quote-capacity');
    capacityInput.value = currentSelectedKW + ' kW';
}

// Redirect to WhatsApp with predefined message for selected system
function redirectToWhatsAppWithDetails() {
    // Check if KW is selected
    if (!currentSelectedKW) {
        alert('Please select a system capacity first!');
        return;
    }
    
    // Get current brand pricing data
    const brandPricing = getBrandPricing();
    const currentBrandData = brandPricing[currentBrand] || brandPricing.tata;
    const systemData = currentBrandData[currentSelectedKW];
    
    if (!systemData) {
        alert('System data not available. Please try again.');
        return;
    }
    
    // Calculate net price after subsidy
    const totalPrice = systemData.price;
    const subsidyAmount = systemData.subsidy || 0;
    const netPrice = totalPrice - subsidyAmount;
    
    // Create predefined message with system details
    const brandName = currentBrand.charAt(0).toUpperCase() + currentBrand.slice(1);
    const message = `Hi DhanunJay Solar Solutions! 🌞

I'm interested in the ${brandName} ${currentSelectedKW}KW Solar System with the following details:

📋 *System Details:*
• Capacity: ${currentSelectedKW} KW
• Monthly Generation: ${systemData.generation} units
• Annual Savings: ₹${systemData.savings.toLocaleString()}
• Total System Price: ₹${totalPrice.toLocaleString()}
• Government Subsidy: ₹${subsidyAmount.toLocaleString()}
• *Net Price After Subsidy: ₹${netPrice.toLocaleString()}*

Please provide more information about installation, warranty, and next steps.

Thank you! 🙏`;
    
    // WhatsApp number (from memory: 9346476607)
    const whatsappNumber = '919346476607';
    
    // Create WhatsApp URL with encoded message
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Track the WhatsApp redirect
    trackEvent('whatsapp_redirect_from_price_calculator', {
        brand: currentBrand,
        kw: currentSelectedKW,
        totalPrice: totalPrice,
        netPrice: netPrice
    });
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const quoteModal = document.getElementById('quote-modal');
    const successModal = document.getElementById('success-modal');
    const priceModal = document.getElementById('priceModal');
    
    if (e.target === quoteModal) {
        closeQuoteModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
    if (e.target === priceModal) {
        closePriceModal();
    }
});

// Form Submission
document.getElementById('quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('quote-name').value,
        email: document.getElementById('quote-email').value,
        mobile: document.getElementById('quote-mobile').value,
        location: document.getElementById('quote-location').value,
        capacity: document.getElementById('quote-capacity').value,
        timestamp: new Date().toISOString(),
        status: 'Pending'
    };
    
    // Store quote data (In real implementation, send to backend)
    storeQuoteData(formData);
    
    // Close quote modal and show success modal
    closeQuoteModal();
    document.getElementById('success-modal').style.display = 'block';
    
    // Refresh admin editing if in edit mode
    if (isEditMode) {
        setTimeout(() => {
            refreshPriceCalculatorEditing();
        }, 100);
    }
    
    // Track conversion
    trackEvent('quote_requested', {
        email: formData.email,
        mobile: formData.mobile,
        location: formData.location,
        capacity: formData.capacity
    });
});

// Data Storage Functions
function storeQuoteData(data) {
    // Get existing quotes from localStorage
    let quotes = JSON.parse(localStorage.getItem('solarBookings') || '[]');
    
    // Add new quote
    data.id = Date.now().toString();
    quotes.push(data);
    
    // Store back to localStorage
    localStorage.setItem('solarBookings', JSON.stringify(quotes));
    
    // Also send to cloud storage for cross-device access
    sendToCloudStorage(data);
    
    // Send email notification to admin
    sendEmailNotification(data);
    
    console.log('Quote request stored:', data);
}

// Send data to cloud storage using a shared database approach
async function sendToCloudStorage(data) {
    try {
        // First, get existing data from the shared bin
        let existingQuotes = [];
        try {
            const getResponse = await fetch('https://api.jsonbin.io/v3/b/66cb5f5ce41b4d34e4217a8f/latest', {
                method: 'GET',
                headers: {
                    'X-Master-Key': '$2a$10$8K9vN2mF5qL3pR7sT1wX4eY6hG8jD9kA2bC5fE3gH1iJ4kL6mN0oP'
                }
            });
            
            if (getResponse.ok) {
                const existingData = await getResponse.json();
                existingQuotes = existingData.record?.quotes || [];
            }
        } catch (error) {
            console.log('No existing data found, creating new database');
        }
        
        // Add new quote to existing data
        existingQuotes.push(data);
        
        // Update the shared bin with all quotes
        const response = await fetch('https://api.jsonbin.io/v3/b/66cb5f5ce41b4d34e4217a8f', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$8K9vN2mF5qL3pR7sT1wX4eY6hG8jD9kA2bC5fE3gH1iJ4kL6mN0oP'
            },
            body: JSON.stringify({
                quotes: existingQuotes,
                lastUpdated: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            console.log('Quote sent to cloud storage successfully');
        }
    } catch (error) {
        console.log('Cloud storage failed, data saved locally only:', error);
    }
}

// Send email notification to admin
async function sendEmailNotification(data) {
    try {
        const emailData = {
            to: 'admin@dhanunjaysolar.com',
            subject: `New Solar Quote Request - ${data.capacity}`,
            html: `
                <h2>New Solar Quote Request</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Mobile:</strong> ${data.mobile}</p>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Capacity:</strong> ${data.capacity}</p>
                <p><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            `
        };
        
        // Using EmailJS for free email service
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: 'service_solar',
                template_id: 'template_quote',
                user_id: 'user_dhanunjay',
                template_params: emailData
            })
        });
        
        if (response.ok) {
            console.log('Email notification sent successfully');
        }
    } catch (error) {
        console.log('Email notification failed:', error);
    }
}

// Visitor Tracking
function initVisitorTracking() {
    // Get visitor info
    const visitorData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct',
        page: window.location.pathname,
        sessionId: getSessionId()
    };
    
    // Get IP and location (using a free IP API)
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            visitorData.ip = data.ip;
            visitorData.city = data.city;
            visitorData.country = data.country_name;
            
            storeVisitorData(visitorData);
        })
        .catch(error => {
            console.log('IP detection failed:', error);
            storeVisitorData(visitorData);
        });
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('solarSessionId');
    if (!sessionId) {
        sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('solarSessionId', sessionId);
    }
    return sessionId;
}

function storeVisitorData(data) {
    // Get existing visitors from localStorage
    let visitors = JSON.parse(localStorage.getItem('solarVisitors') || '[]');
    
    // Add new visitor
    data.id = Date.now().toString();
    visitors.push(data);
    
    // Keep only last 1000 visitors to prevent storage overflow
    if (visitors.length > 1000) {
        visitors = visitors.slice(-1000);
    }
    
    // Store back to localStorage
    localStorage.setItem('solarVisitors', JSON.stringify(visitors));
    
    console.log('Visitor tracked:', data);
}

// Event Tracking
function trackEvent(eventName, eventData = {}) {
    const event = {
        event: eventName,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        data: eventData
    };
    
    // Get existing events from localStorage
    let events = JSON.parse(localStorage.getItem('solarEvents') || '[]');
    
    // Add new event
    events.push(event);
    
    // Keep only last 500 events
    if (events.length > 500) {
        events = events.slice(-500);
    }
    
    // Store back to localStorage
    localStorage.setItem('solarEvents', JSON.stringify(events));
    
    console.log('Event tracked:', event);
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track WhatsApp clicks
    if (target.closest('a[href*="wa.me"]')) {
        trackEvent('whatsapp_click', {
            source: target.closest('.floating-whatsapp') ? 'floating_button' : 'hero_button'
        });
    }
    
    // Track call button clicks
    if (target.closest('a[href^="tel:"]')) {
        trackEvent('call_click');
    }
    
    // Track location button clicks
    if (target.closest('a[href*="maps.google"]')) {
        trackEvent('location_click');
    }
    
    // Track social media clicks
    if (target.closest('a[href*="instagram"]')) {
        trackEvent('instagram_click');
    }
    
    if (target.closest('a[href*="facebook"]')) {
        trackEvent('facebook_click');
    }
    
    if (target.closest('a[href*="linkedin"]')) {
        trackEvent('linkedin_click');
    }
});

// Scroll tracking
let scrollTracked = false;
window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Track 50% scroll
    if (scrollPercent > 50 && !scrollTracked) {
        trackEvent('scroll_50_percent');
        scrollTracked = true;
    }
});

// Page visibility tracking
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        trackEvent('page_hidden', {
            timeOnPage: Date.now() - (window.pageLoadTime || Date.now())
        });
    } else {
        trackEvent('page_visible');
    }
});

// Page load time tracking
window.pageLoadTime = Date.now();
window.addEventListener('load', function() {
    const loadTime = Date.now() - window.pageLoadTime;
    trackEvent('page_loaded', {
        loadTime: loadTime
    });
});

// Utility Functions
function formatPhoneNumber(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as Indian mobile number
    if (cleaned.length === 10) {
        return `+91${cleaned}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+${cleaned}`;
    }
    
    return phone;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMobile(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile.replace(/\D/g, ''));
}

// Add input validation
document.getElementById('quote-mobile').addEventListener('input', function(e) {
    const mobile = e.target.value.replace(/\D/g, '');
    if (mobile.length <= 10) {
        e.target.value = mobile;
    }
});

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, var(--solar-orange), var(--solar-blue));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(10px)';
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'solar-installation.jpg',
        'project1.jpg',
        'project2.jpg',
        'project3.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeQuoteModal();
        closeSuccessModal();
    }
    
    // Navigate slides with arrow keys
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Add focus management for modals
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Apply focus trapping when modals open
const originalOpenQuoteModal = openQuoteModal;
openQuoteModal = function() {
    originalOpenQuoteModal();
    setTimeout(() => {
        trapFocus(document.getElementById('quote-modal'));
    }, 100);
};

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                
                trackEvent('performance_metrics', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
                });
            }, 1000);
        });
    }
}

monitorPerformance();

// Admin Edit System
let isEditMode = false;
let isAdminLoggedIn = false;
let originalContent = {};
const ADMIN_PASSWORD = 'solar2024admin'; // Change this to a secure password

// Check for admin access on page load
function checkAdminAccess() {
    // Check if admin is accessing via special URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        document.getElementById('admin-toggle').style.display = 'block';
    }
    
    // Check if admin was previously logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isAdminLoggedIn = true;
        document.getElementById('admin-toggle').style.display = 'block';
    }
}

// Toggle edit mode
function toggleEditMode() {
    if (!isAdminLoggedIn) {
        document.getElementById('admin-login-modal').style.display = 'block';
        return;
    }
    
    if (!isEditMode) {
        enterEditMode();
    } else {
        exitEditMode();
    }
}

// Enter edit mode
function enterEditMode() {
    isEditMode = true;
    document.body.classList.add('edit-mode');
    document.getElementById('edit-controls').style.display = 'block';
    
    // Store original content
    storeOriginalContent();
    
    // Make content editable
    makeContentEditable();
    
    // Update toggle button
    const toggleBtn = document.querySelector('.edit-toggle-btn');
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i> View Mode';
    toggleBtn.style.background = 'linear-gradient(45deg, #28a745, #17a2b8)';
    
    trackEvent('admin_edit_mode_entered');
}

// Exit edit mode
function exitEditMode() {
    isEditMode = false;
    document.body.classList.remove('edit-mode');
    document.getElementById('edit-controls').style.display = 'none';
    
    // Remove editable attributes
    removeEditableAttributes();
    
    // Update toggle button
    const toggleBtn = document.querySelector('.edit-toggle-btn');
    toggleBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Mode';
    toggleBtn.style.background = 'linear-gradient(45deg, var(--solar-orange), var(--solar-blue))';
    
    trackEvent('admin_edit_mode_exited');
}

// Store original content
function storeOriginalContent() {
    const editableElements = [
        '.hero-title',
        '.hero-subtitle', 
        '.section-title',
        '.section-subtitle',
        '.about-text p',
        '.highlight-card h3',
        '.highlight-card p',
        '.service-card h3',
        '.service-card p',
        '.contact-item h4',
        '.contact-item p',
        '.footer-slogan',
        '[data-editable="price-calculator-capacity"]',
        '[data-editable="price-calculator-generation"]',
        '[data-editable="price-calculator-savings"]',
        '[data-editable="price-calculator-total"]',
        '[data-editable="price-calculator-subsidy"]'
    ];
    
    editableElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            const key = `${selector}_${index}`;
            originalContent[key] = element.innerHTML;
        });
    });
}

// Make content editable
function makeContentEditable() {
    const editableSelectors = [
        '.hero-title',
        '.hero-subtitle',
        '.section-title', 
        '.section-subtitle',
        '.about-text p',
        '.highlight-card h3',
        '.highlight-card p',
        '.service-card h3',
        '.service-card p',
        '.contact-item h4',
        '.contact-item p',
        '.footer-slogan',
        '[data-editable="price-calculator-capacity"]',
        '[data-editable="price-calculator-generation"]',
        '[data-editable="price-calculator-savings"]',
        '[data-editable="price-calculator-total"]',
        '[data-editable="price-calculator-subsidy"]'
    ];
    
    editableSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('editable');
            element.contentEditable = true;
            element.setAttribute('data-original', element.innerHTML);
            
            // Add edit indicator
            const indicator = document.createElement('div');
            indicator.className = 'edit-indicator';
            indicator.innerHTML = '✎';
            element.style.position = 'relative';
            element.appendChild(indicator);
            
            // Add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'edit-tooltip';
            tooltip.textContent = 'Click to edit this content';
            element.appendChild(tooltip);
        });
    });
}

// Refresh price calculator editing when values are populated
function refreshPriceCalculatorEditing() {
    const priceCalculatorSelectors = [
        '[data-editable="price-calculator-capacity"]',
        '[data-editable="price-calculator-generation"]',
        '[data-editable="price-calculator-savings"]',
        '[data-editable="price-calculator-total"]',
        '[data-editable="price-calculator-subsidy"]'
    ];
    
    priceCalculatorSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!element.classList.contains('editable')) {
                element.classList.add('editable');
                element.contentEditable = true;
                element.setAttribute('data-original', element.innerHTML);
                
                // Add edit indicator
                const indicator = document.createElement('div');
                indicator.className = 'edit-indicator';
                indicator.innerHTML = '✎';
                element.style.position = 'relative';
                element.appendChild(indicator);
                
                // Add tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'edit-tooltip';
                tooltip.textContent = 'Click to edit this value';
                element.appendChild(tooltip);
            }
        });
    });
}

// Remove editable attributes
function removeEditableAttributes() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.classList.remove('editable');
        element.contentEditable = false;
        element.style.position = '';
        
        // Remove indicators and tooltips
        const indicator = element.querySelector('.edit-indicator');
        const tooltip = element.querySelector('.edit-tooltip');
        if (indicator) indicator.remove();
        if (tooltip) tooltip.remove();
    });
}

// Save changes
function saveChanges() {
    const editableElements = document.querySelectorAll('.editable');
    const changes = {};
    
    editableElements.forEach((element, index) => {
        const selector = getElementSelector(element);
        const key = `${selector}_${index}`;
        changes[key] = element.innerHTML.replace(/<div class="edit-indicator">.*?<\/div>/g, '').replace(/<div class="edit-tooltip">.*?<\/div>/g, '');
    });
    
    // Save to localStorage
    localStorage.setItem('solarWebsiteContent', JSON.stringify(changes));
    
    // Show success message
    alert('✅ Changes saved successfully!');
    
    trackEvent('admin_content_saved', { changesCount: Object.keys(changes).length });
}

// Reset changes
function resetChanges() {
    if (confirm('Are you sure you want to reset all changes?')) {
        Object.keys(originalContent).forEach(key => {
            const [selector, index] = key.split('_');
            const elements = document.querySelectorAll(selector);
            if (elements[parseInt(index)]) {
                elements[parseInt(index)].innerHTML = originalContent[key];
            }
        });
        
        // Re-add edit indicators
        removeEditableAttributes();
        makeContentEditable();
        
        alert('🔄 Changes reset successfully!');
        trackEvent('admin_content_reset');
    }
}

// Load saved content
function loadSavedContent() {
    const savedContent = localStorage.getItem('solarWebsiteContent');
    if (savedContent) {
        const changes = JSON.parse(savedContent);
        
        Object.keys(changes).forEach(key => {
            const [selector, index] = key.split('_');
            const elements = document.querySelectorAll(selector);
            if (elements[parseInt(index)]) {
                elements[parseInt(index)].innerHTML = changes[key];
            }
        });
    }
}

// Removed duplicate declaration - already declared at top

// Get element selector
function getElementSelector(element) {
    // Check for price calculator data-editable attributes first
    const editableAttr = element.getAttribute('data-editable');
    if (editableAttr && element.getAttribute('data-kw-specific') === 'true') {
        return `[data-editable="${editableAttr}-kw-${currentSelectedKW}"]`;
    } else if (editableAttr) {
        return `[data-editable="${editableAttr}"]`;
    }
    
    // Regular content selectors
    if (element.classList.contains('hero-title')) return '.hero-title';
    if (element.classList.contains('hero-subtitle')) return '.hero-subtitle';
    if (element.classList.contains('section-title')) return '.section-title';
    if (element.classList.contains('section-subtitle')) return '.section-subtitle';
    if (element.closest('.about-text') && element.tagName === 'P') return '.about-text p';
    if (element.closest('.highlight-card') && element.tagName === 'H3') return '.highlight-card h3';
    if (element.closest('.highlight-card') && element.tagName === 'P') return '.highlight-card p';
    if (element.closest('.service-card') && element.tagName === 'H3') return '.service-card h3';
    if (element.closest('.service-card') && element.tagName === 'P') return '.service-card p';
    if (element.closest('.contact-item') && element.tagName === 'H4') return '.contact-item h4';
    if (element.closest('.contact-item') && element.tagName === 'P') return '.contact-item p';
    if (element.classList.contains('footer-slogan')) return '.footer-slogan';
    return '';
}

// Admin login form handler
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        closeAdminModal();
        enterEditMode();
        trackEvent('admin_login_success');
    } else {
        alert('❌ Incorrect password!');
        trackEvent('admin_login_failed');
    }
});

// Show admin login modal
function showAdminLogin() {
    document.getElementById('admin-login-modal').style.display = 'block';
}

// Close admin modal
function closeAdminModal() {
    document.getElementById('admin-login-modal').style.display = 'none';
}

// Initialize admin system
function initAdminSystem() {
    checkAdminAccess();
    loadSavedContent();
    
    // Add keyboard shortcut for admin access (Ctrl+Shift+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            document.getElementById('admin-toggle').style.display = 'block';
        }
    });
}

// Call initAdminSystem when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAdminSystem();
});


console.log('DhanunJay Solar Solutions - Website with Direct Edit Loaded Successfully! 🌞⚡✏️');

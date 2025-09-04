// Global Variables
let currentSlide = 0;
let currentTestimonial = 0;

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Brand-specific Solar System Pricing Data
function getBrandPricing() {
    // Use the SOLAR_PRICING_DATA from pricing-data.js
    if (typeof SOLAR_PRICING_DATA !== 'undefined') {
        console.log('✅ Using pricing data from pricing-data.js');
        return SOLAR_PRICING_DATA;
    }
    
    console.log('⚠️ SOLAR_PRICING_DATA not found, using fallback data');
    
    // Define default pricing structure
    const defaultBrandPricing = {
        tata: {
            1: { generation: 120, savings: 14400, price: 60000, subsidy: 18000 },
            2: { generation: 240, savings: 144000, price: 125000, subsidy: 37500 },
            3: { generation: 360, savings: 43200, price: 180000, subsidy: 78000 },
            4: { generation: 480, savings: 57600, price: 240000, subsidy: 72000 },
            5: { generation: 600, savings: 72000, price: 300000, subsidy: 90000 },
            6: { generation: 720, savings: 86400, price: 350000, subsidy: 105000 },
            7: { generation: 840, savings: 100800, price: 380000, subsidy: 114000 },
            8: { generation: 960, savings: 115200, price: 400000, subsidy: 120000 },
            9: { generation: 1080, savings: 129600, price: 420000, subsidy: 126000 },
            10: { generation: 1200, savings: 144000, price: 450000, subsidy: 135000 }
        },
        exide: {
            1: { generation: 110, savings: 13200, price: 58000, subsidy: 17400 },
            2: { generation: 220, savings: 132000, price: 128000, subsidy: 38400 },
            3: { generation: 330, savings: 39600, price: 185000, subsidy: 80000 },
            4: { generation: 440, savings: 52800, price: 245000, subsidy: 73500 },
            5: { generation: 550, savings: 66000, price: 305000, subsidy: 91500 },
            6: { generation: 660, savings: 79200, price: 360000, subsidy: 108000 },
            7: { generation: 770, savings: 92400, price: 395000, subsidy: 118500 },
            8: { generation: 880, savings: 105600, price: 410000, subsidy: 123000 },
            9: { generation: 990, savings: 118800, price: 425000, subsidy: 127500 },
            10: { generation: 1100, savings: 132000, price: 440000, subsidy: 132000 }
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
        waaree: {
            1: { generation: 128, savings: 15360, price: 64000, subsidy: 19200 },
            2: { generation: 256, savings: 30720, price: 132000, subsidy: 39600 },
            3: { generation: 384, savings: 46080, price: 187000, subsidy: 56100 },
            4: { generation: 512, savings: 61440, price: 247000, subsidy: 74100 },
            5: { generation: 640, savings: 76800, price: 307000, subsidy: 92100 },
            6: { generation: 768, savings: 92160, price: 357000, subsidy: 107100 },
            7: { generation: 896, savings: 107520, price: 387000, subsidy: 116100 },
            8: { generation: 1024, savings: 122880, price: 407000, subsidy: 122100 },
            9: { generation: 1152, savings: 138240, price: 427000, subsidy: 128100 },
            10: { generation: 1280, savings: 153600, price: 447000, subsidy: 134100 }
        }
    };
    
    console.log('📋 Using fallback pricing data');
    return defaultBrandPricing;
}

// Legacy function for backward compatibility
function getOnGridPricing() {
    const brandPricing = getBrandPricing();
    return brandPricing; // Return all brand data
}

let onGridPricing = null;
let currentBrand = 'tata'; // Default brand
let currentSelectedKW = null; // Track selected KW
let isEditMode = false;
let originalValues = {};
let editedData = {};

// Force refresh pricing data on page load and when needed
function refreshPricingData() {
    onGridPricing = getBrandPricing();
    console.log('🔄 Pricing data refreshed:', onGridPricing);
    return onGridPricing;
}

// Initialize pricing data
document.addEventListener('DOMContentLoaded', function() {
    refreshPricingData();
    updateKWCardPrices();
});

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
    // Force refresh pricing data from localStorage before updating
    onGridPricing = getBrandPricing();
    console.log('🔄 Refreshing KW card prices for brand:', currentBrand);
    
    const brandData = onGridPricing[currentBrand];
    if (!brandData) {
        console.warn('❌ No brand data found for:', currentBrand);
        return;
    }
    
    console.log('📊 Brand data for', currentBrand, ':', brandData);
    
    for (let kw = 1; kw <= 10; kw++) {
        const card = document.querySelector(`[data-kw="${kw}"]`);
        if (card && brandData[kw]) {
            const priceElement = card.querySelector('.kw-price');
            if (priceElement) {
                priceElement.textContent = `₹${brandData[kw].price.toLocaleString()}`;
                console.log(`💰 Updated ${kw}KW price to:`, brandData[kw].price);
            }
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
    try {
        console.log('Opening price modal for brand:', brand);
        
        // Validate brand parameter
        if (!brand || typeof brand !== 'string') {
            console.error('Invalid brand parameter:', brand);
            alert('Unable to open price calculator. Please try again.');
            return;
        }
        
        // Force refresh pricing data to get latest admin changes
        refreshPricingData();
        const brandPricing = onGridPricing;
        console.log('🔄 Forced refresh of pricing data for brand modal:', brand);
        
        const normalizedBrand = brand.toLowerCase();
        
        const availableBrands = Object.keys(brandPricing).map(k => k.toLowerCase());
        if (availableBrands.includes(normalizedBrand)) {
            currentBrand = normalizedBrand;
        } else {
            currentBrand = 'tata';
        }
        
        currentSelectedKW = null;
        // Show modal and update prices
        let modal = document.getElementById('priceModal');
        if (!modal) { alert('Unable to open price calculator.'); return; }
        let priceResult = document.getElementById('priceResult');
        if (!priceResult) { priceResult = document.querySelector('.price-result'); }
        document.querySelectorAll('.kw-card').forEach(card => card.classList.remove('selected'));
        priceResult.style.display = 'none';
        if (!priceResult) {
            priceResult = document.querySelector('[id="priceResult"]') || 
                         document.querySelector('.price-result');
        }
        
        // Reset form state
        try {
            const kwCards = document.querySelectorAll('.kw-card');
            kwCards.forEach(card => {
                if (card && card.classList) {
                    card.classList.remove('selected');
                }
            });
        } catch (e) {
            console.warn('Error resetting KW cards:', e);
        }
        
        // Hide price result initially
        if (priceResult && priceResult.style) {
            priceResult.style.display = 'none';
        }
        
        // Force show System Capacity tab and hide System Details tab
        showCapacityView();
        
        // Update KW card prices with selected brand data
        try {
            updateKWCardPrices();
        } catch (e) {
            console.warn('Error updating KW card prices:', e);
        }
        
        // Show modal with enhanced browser compatibility
        const showModal = () => {
            try {
                if (modal && modal.style) {
                    modal.style.display = 'block';
                    modal.style.visibility = 'visible';
                    modal.style.opacity = '1';
                    
                    // Prevent body scroll with enhanced GitHub Pages compatibility
                    if (document.body && document.body.style) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.overflowX = 'hidden';
                        document.body.style.overflowY = 'hidden';
                        document.body.classList.add('modal-open');
                        
                        // Also apply to html element for better browser compatibility
                        const html = document.documentElement;
                        if (html) {
                            html.style.overflow = 'hidden';
                        }
                    }
                    
                    // Focus management for accessibility
                    if (modal.focus) {
                        modal.focus();
                    }
                    
                    console.log('Price modal opened successfully for brand:', brand);
                }
            } catch (e) {
                console.error('Error showing modal:', e);
                alert('Unable to open price calculator. Please try again.');
            }
        };
        
        // Use requestAnimationFrame for better browser compatibility
        if (window.requestAnimationFrame) {
            requestAnimationFrame(showModal);
        } else {
            // Fallback for older browsers
            setTimeout(showModal, 16);
        }
        // Track price modal view (with error handling)
        try {
            if (typeof trackEvent === 'function') {
                trackEvent('price_calculator_opened', { brand: brand });
            }
            updateKWCardPrices();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error in openPriceModalWithBrand:', error);
            alert('Unable to open price calculator. Please try again.');
        }
    } catch (error) {
        console.error('Error opening price modal:', error);
        alert('Unable to open price calculator. Please try again.');
    }
}

// Universal KW Selection with Cross-Browser Compatibility
function selectKW(kw) {
    try {
        console.log('selectKW called with:', kw);
        currentSelectedKW = kw;
        
        // Force refresh pricing data to get latest admin changes
        refreshPricingData();
        
        // Enhanced card selection with multiple fallback methods
        const removeSelectionFromAllCards = () => {
            const selectors = ['.kw-card', '[data-kw]', '.kw-option', '.capacity-card'];
            
            for (const selector of selectors) {
                const cards = document.querySelectorAll(selector);
                cards.forEach(card => {
                    if (card.classList) {
                        card.classList.remove('selected', 'active', 'chosen');
                    }
                });
            }
        };
        
        const selectCurrentCard = (kw) => {
            const selectors = [
                `[data-kw="${kw}"]`,
                `.kw-card[data-kw="${kw}"]`,
                `.kw-option[data-value="${kw}"]`,
                `.capacity-${kw}kw`,
                `#kw-${kw}`
            ];
            
            for (const selector of selectors) {
                const card = document.querySelector(selector);
                if (card) {
                    if (card.classList) {
                        card.classList.add('selected');
                    }
                    console.log(`✓ Selected card using selector: ${selector}`);
                    return true;
                }
            }
            return false;
        };
        
        // Remove selection from all cards
        removeSelectionFromAllCards();
        
        // Add selection to clicked card
        const selectionSuccess = selectCurrentCard(kw);
        if (!selectionSuccess) {
            console.warn('Could not find card to select for KW:', kw);
        }
        
        // Update current selected KW for tracking
        currentSelectedKW = kw;
        console.log('Current selected KW updated to:', currentSelectedKW);
        
        // Calculate and show price with delay for better compatibility
        setTimeout(() => {
            calculatePrice(kw);
        }, 50);
        
        // Automatically switch to details view with delay
        setTimeout(() => {
            showDetailsView();
        }, 100);
        
    } catch (error) {
        console.error('Error in selectKW function:', error);
        // Fallback: still try to calculate price
        currentSelectedKW = kw;
        try {
            calculatePrice(kw);
            showDetailsView();
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    }
}

// Universal Browser Compatible Price Calculator with Brave Browser Fix
function calculatePrice(selectedKW) {
    try {
        console.log('=== CALCULATE PRICE DEBUG START ===');
        console.log('calculatePrice called with KW:', selectedKW, 'Brand:', currentBrand);
        console.log('Current URL:', window.location.href);
        console.log('User Agent:', navigator.userAgent);
        
        // GitHub Pages specific check
        const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('githubusercontent.com');
        console.log('GitHub Pages detected:', isGitHubPages);
        
        // Detect Brave browser
        const isBrave = navigator.brave && navigator.brave.isBrave || false;
        console.log('Brave browser detected:', isBrave);
        
        // GitHub Pages fix: Ensure global variables are properly set
        if (isGitHubPages) {
            if (!window.currentBrand) {
                window.currentBrand = currentBrand || 'tata';
            }
            if (!window.onGridPricing) {
                window.onGridPricing = getBrandPricing();
            }
            console.log('GitHub Pages variables fixed:', {
                currentBrand: window.currentBrand,
                hasOnGridPricing: !!window.onGridPricing
            });
        }
        
        // Get current brand pricing with enhanced error handling
        const brandPricing = getBrandPricing();
        if (!brandPricing) {
            console.error('Brand pricing data not available');
            return;
        }
        
        // Force refresh pricing data from localStorage  
        onGridPricing = getBrandPricing();
        console.log('🔄 Refreshed pricing data in calculatePrice');
        
        console.log('Available brands in pricing data:', Object.keys(brandPricing));
        console.log('Looking for brand:', currentBrand);
        
        // Enhanced brand data retrieval with case-insensitive matching
        let currentBrandData = null;
        
        // Try exact match first
        if (brandPricing[currentBrand]) {
            currentBrandData = brandPricing[currentBrand];
            console.log(`✓ Found exact brand match: ${currentBrand}`);
        } else {
            console.warn(`✗ Exact match failed for: ${currentBrand}`);
            // Try case-insensitive matching
            const brandKeys = Object.keys(brandPricing);
            console.log('Trying case-insensitive matching against:', brandKeys);
            const matchingKey = brandKeys.find(key => key.toLowerCase() === currentBrand.toLowerCase());
            if (matchingKey) {
                currentBrandData = brandPricing[matchingKey];
                console.log(`✓ Found brand data using case-insensitive match: ${matchingKey}`);
            } else {
                console.warn('No case-insensitive match found, using fallback');
                // Fallback to tata if brand not found
                currentBrandData = brandPricing.tata || brandPricing.Tata || Object.values(brandPricing)[0];
                const fallbackBrand = Object.keys(brandPricing)[0];
                console.warn(`Brand '${currentBrand}' not found, using fallback: ${fallbackBrand}`);
            }
        }
        
        if (!currentBrandData) {
            console.error('No brand data available at all. Available brands:', Object.keys(brandPricing));
            return;
        }
        
        console.log('Using brand data for:', currentBrand, currentBrandData);
        
        const systemData = currentBrandData[selectedKW];
        if (!systemData) {
            console.error('System data not available for KW:', selectedKW);
            return;
        }
        
        console.log('System data found:', systemData);

        // Enhanced DOM element finder with GitHub Pages and Brave browser specific fixes
        const findElement = (id, fallbackSelectors = []) => {
            let element = null;
            
            // GitHub Pages specific element finding
            if (isGitHubPages) {
                // Method 1: Direct getElementById with GitHub Pages compatibility
                try {
                    element = document.getElementById(id);
                    if (element) {
                        console.log(`GitHub Pages: Found element ${id} via getElementById`);
                        return element;
                    }
                } catch (e) {
                    console.warn(`GitHub Pages getElementById failed for ${id}:`, e);
                }
                
                // Method 2: Wait and retry for GitHub Pages
                for (let i = 0; i < 3; i++) {
                    try {
                        element = document.getElementById(id);
                        if (element) {
                            console.log(`GitHub Pages: Found element ${id} on retry ${i + 1}`);
                            return element;
                        }
                    } catch (e) {
                        console.warn(`GitHub Pages retry ${i + 1} failed for ${id}:`, e);
                    }
                }
            }
            
            // Method 1: Standard getElementById with Brave compatibility
            try {
                element = document.getElementById(id);
                if (element) {
                    console.log(`Found element ${id} via getElementById`);
                    return element;
                }
            } catch (e) {
                console.warn(`getElementById failed for ${id}:`, e);
            }
            
            // Method 2: querySelector with ID - Brave fallback
            try {
                element = document.querySelector(`#${id}`);
                if (element) {
                    console.log(`Found element ${id} via querySelector`);
                    return element;
                }
            } catch (e) {
                console.warn(`querySelector failed for ${id}:`, e);
            }
            
            // Method 3: Try fallback selectors with enhanced Brave support
            for (const selector of fallbackSelectors) {
                try {
                    element = document.querySelector(selector);
                    if (element) {
                        console.log(`Found element ${id} via fallback selector: ${selector}`);
                        return element;
                    }
                } catch (e) {
                    console.warn(`Fallback selector ${selector} failed:`, e);
                }
            }
            
            // Method 4: Brave-specific DOM traversal
            try {
                const allElements = document.querySelectorAll('*');
                for (const el of allElements) {
                    if (el.id === id || el.getAttribute('id') === id) {
                        console.log(`Found element ${id} via DOM traversal`);
                        return el;
                    }
                }
            } catch (e) {
                console.warn(`DOM traversal failed for ${id}:`, e);
            }
            
            // Method 5: Search by data attributes with Brave compatibility
            try {
                const dataSelectors = [
                    `[data-element-id="${id}"]`,
                    `[data-id="${id}"]`,
                    `[data-target="${id}"]`
                ];
                
                for (const selector of dataSelectors) {
                    element = document.querySelector(selector);
                    if (element) {
                        console.log(`Found element ${id} via data attribute: ${selector}`);
                        return element;
                    }
                }
            } catch (e) {
                console.warn(`Data attribute search failed for ${id}:`, e);
            }
            
            console.warn(`Element ${id} not found with any method`);
            return null;
        };
        
        // Define the missing updateDisplayElement function
        const updateDisplayElement = (elementId, value, fallbackSelectors = []) => {
            try {
                // Try to find element by ID first
                let element = document.getElementById(elementId);
                if (element) {
                    element.textContent = value;
                    console.log(`✓ Updated ${elementId} with value: ${value}`);
                    return true;
                }
                
                // Try fallback selectors
                for (const selector of fallbackSelectors) {
                    element = document.querySelector(selector);
                    if (element) {
                        element.textContent = value;
                        console.log(`✓ Updated ${elementId} via fallback selector ${selector} with value: ${value}`);
                        return true;
                    }
                }
                
                console.warn(`✗ Could not find element ${elementId} to update with value: ${value}`);
                return false;
            } catch (error) {
                console.error(`Error updating element ${elementId}:`, error);
                return false;
            }
        };
        
        const priceResult = findElement('priceResult', ['.price-result', '[data-element="price-result"]', '.system-details']);
        if (!priceResult) {
            console.error('Price result element not found');
            console.log('Available elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
            return;
        }
        console.log('Price result element found:', priceResult);
        
        // Brave-compatible localStorage access
        let savedContent = null;
        let hasCustomValues = false;
        
        try {
            // Enhanced localStorage access for Brave browser
            if (typeof Storage !== "undefined" && window.localStorage) {
                savedContent = localStorage.getItem('editableContent');
                if (savedContent) {
                    const allSavedContent = JSON.parse(savedContent);
                    Object.keys(allSavedContent).forEach(key => {
                        if (key.includes(`kw-${selectedKW}`)) {
                            hasCustomValues = true;
                        }
                    });
                }
            } else {
                console.warn('localStorage not available (Brave privacy mode)');
            }
        } catch (localStorageError) {
            console.warn('localStorage access error (Brave browser compatibility):', localStorageError);
            savedContent = null;
            hasCustomValues = false;
        }
    
        // Enhanced element mappings with Brave-specific selectors
        const elementMappings = {
            capacityDisplay: [
                '.detail-value[data-editable*="capacity"]', 
                '[data-kw-specific="true"]:first-of-type', 
                '.capacity-value',
                '.details-left .detail-value:first-child',
                '.detail-item:first-child .detail-value'
            ],
            generationDisplay: [
                '.detail-value[data-editable*="generation"]', 
                '.generation-value',
                '.details-left .detail-value:nth-child(2)',
                '.detail-item:nth-child(2) .detail-value'
            ],
            savingsDisplay: [
                '.detail-value[data-editable*="savings"]', 
                '.savings-value',
                '.details-left .detail-value:nth-child(3)',
                '.detail-item:nth-child(3) .detail-value'
            ],
            totalPrice: [
                '.price-amount[data-editable*="total"]', 
                '.total-price .price-amount', 
                '.price-value',
                '.price-display .price-amount'
            ],
            subsidyPrice: [
                '.subsidy-amount[data-editable*="subsidy"]', 
                '.subsidy-info .subsidy-amount', 
                '.subsidy-value',
                '.price-display .subsidy-amount'
            ]
        };
        
        // Calculate values with proper formatting
        const subsidyAmount = systemData.subsidy || 0;
        const formattedValues = {
            capacity: selectedKW + ' KW',
            generation: systemData.generation + ' units',
            savings: '₹' + systemData.savings.toLocaleString('en-IN'),
            totalPrice: '₹' + systemData.price.toLocaleString('en-IN'),
            subsidyPrice: '₹' + subsidyAmount.toLocaleString('en-IN')
        };
        
        // Debug: Check if all target elements exist before updating
        const targetElements = ['capacityDisplay', 'generationDisplay', 'savingsDisplay', 'totalPrice', 'subsidyPrice'];
        console.log('=== ELEMENT EXISTENCE CHECK ===');
        targetElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            console.log(`${elementId}: ${element ? 'EXISTS' : 'MISSING'}`, element);
            if (!element) {
                const alternatives = document.querySelectorAll(`[data-editable*="${elementId.replace('Display', '').toLowerCase()}"], .${elementId}, [class*="${elementId}"]`);
                console.log(`  Alternatives found: ${alternatives.length}`, alternatives);
            }
        });
        
        // Force update with default system data (ignore custom values for Brave compatibility)
        console.log('Updating with default system data (Brave mode)');
        
        // Direct DOM update approach - force update all system detail elements
        console.log('🔧 Direct DOM update approach');
        
        // Find and update all possible system detail elements
        const detailElements = document.querySelectorAll('.detail-value, .price-amount, .subsidy-amount');
        console.log('Found detail elements:', detailElements.length);
        
        detailElements.forEach((element, index) => {
            const text = element.textContent.trim();
            console.log(`Element ${index}:`, text, element);
            
            // Update based on content patterns
            if (text.includes('units') || text.includes('130')) {
                element.textContent = formattedValues.generation;
                console.log('✅ Updated generation element to:', formattedValues.generation);
            }
            else if (text.includes('₹15,600') || (text.includes('₹') && text.includes('15') && text.includes('600'))) {
                element.textContent = formattedValues.savings;
                console.log('✅ Updated savings element to:', formattedValues.savings);
            }
            else if (text.includes('₹65,000') || (text.includes('₹') && text.includes('65') && text.includes('000'))) {
                element.textContent = formattedValues.totalPrice;
                console.log('✅ Updated price element to:', formattedValues.totalPrice);
            }
            else if (text.includes('₹19,500') || (text.includes('₹') && text.includes('19') && text.includes('500'))) {
                element.textContent = formattedValues.subsidyPrice;
                console.log('✅ Updated subsidy element to:', formattedValues.subsidyPrice);
            }
        });
        
        // Fallback: Update by element position
        const systemDetailsElements = document.querySelectorAll('.system-details .detail-value, .price-result .detail-value');
        if (systemDetailsElements.length >= 3) {
            systemDetailsElements[1].textContent = formattedValues.generation; // Monthly Gen
            systemDetailsElements[2].textContent = formattedValues.savings;   // Annual Savings
            console.log('✅ Updated by position - generation and savings');
        }
        
        // Update price elements specifically
        const priceElements = document.querySelectorAll('.price-amount');
        const subsidyElements = document.querySelectorAll('.subsidy-amount');
        
        if (priceElements.length > 0) {
            priceElements[0].textContent = formattedValues.totalPrice;
            console.log('✅ Updated first price element to:', formattedValues.totalPrice);
        }
        
        if (subsidyElements.length > 0) {
            subsidyElements[0].textContent = formattedValues.subsidyPrice;
            console.log('✅ Updated first subsidy element to:', formattedValues.subsidyPrice);
        }
        
        // Legacy update method as backup
        const updateResults = {
            capacity: updateDisplayElement('capacityDisplay', formattedValues.capacity, elementMappings.capacityDisplay),
            generation: updateDisplayElement('generationDisplay', formattedValues.generation, elementMappings.generationDisplay),
            savings: updateDisplayElement('savingsDisplay', formattedValues.savings, elementMappings.savingsDisplay),
            totalPrice: updateDisplayElement('totalPrice', formattedValues.totalPrice, elementMappings.totalPrice),
            subsidyPrice: updateDisplayElement('subsidyPrice', formattedValues.subsidyPrice, elementMappings.subsidyPrice)
        };
        
        console.log('Update results:', updateResults);
        
        // GitHub Pages specific retry mechanism
        if (isGitHubPages) {
            setTimeout(() => {
                console.log('GitHub Pages retry mechanism starting...');
                Object.keys(updateResults).forEach(key => {
                    if (!updateResults[key]) {
                        const elementId = key === 'capacity' ? 'capacityDisplay' : 
                                        key === 'generation' ? 'generationDisplay' : 
                                        key === 'savings' ? 'savingsDisplay' : 
                                        key === 'totalPrice' ? 'totalPrice' : 'subsidyPrice';
                        
                        const element = document.getElementById(elementId);
                        if (element) {
                            const value = formattedValues[key === 'totalPrice' ? 'totalPrice' : key === 'subsidyPrice' ? 'subsidyPrice' : key];
                            element.textContent = value;
                            element.style.visibility = 'visible';
                            element.style.display = 'inline';
                            console.log(`✓ GitHub Pages retry successful for ${key}:`, value);
                        }
                    }
                });
            }, 200);
        }
        
        // Brave-specific retry mechanism for failed updates
        Object.keys(updateResults).forEach(key => {
            if (!updateResults[key]) {
                console.warn(`Failed to update ${key}, attempting Brave-specific retry`);
                setTimeout(() => {
                    const container = document.querySelector('.system-details, .price-result, .details-layout');
                    if (container) {
                        const possibleElements = container.querySelectorAll(`#${key}Display, #${key}, .${key}-value, .detail-value, .price-amount, .subsidy-amount`);
                        for (const el of possibleElements) {
                            if (el && (!el.textContent || el.textContent.trim() === '')) {
                                const valueToSet = formattedValues[key === 'totalPrice' ? 'totalPrice' : key === 'subsidyPrice' ? 'subsidyPrice' : key];
                                el.textContent = valueToSet;
                                console.log(`✓ Brave retry successful for ${key}:`, valueToSet);
                                break;
                            }
                        }
                    }
                }, 100);
            }
        });
    
        // Enhanced display method with Brave compatibility
        try {
            const displayMethods = [
                () => {
                    priceResult.style.display = 'block';
                    priceResult.style.visibility = 'visible';
                    priceResult.style.opacity = '1';
                },
                () => {
                    priceResult.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important;');
                },
                () => {
                    priceResult.classList.remove('hidden');
                    priceResult.classList.add('visible');
                },
                () => {
                    priceResult.removeAttribute('hidden');
                    priceResult.style.cssText = 'display: block; visibility: visible; opacity: 1;';
                },
                () => {
                    // Brave-specific display method
                    priceResult.style.setProperty('display', 'block', 'important');
                    priceResult.style.setProperty('visibility', 'visible', 'important');
                    priceResult.style.setProperty('opacity', '1', 'important');
                }
            ];
            
            let displaySuccess = false;
            for (const method of displayMethods) {
                try {
                    method();
                    displaySuccess = true;
                    console.log('Display method succeeded');
                    break;
                } catch (e) {
                    console.warn('Display method failed, trying next:', e);
                }
            }
            
            if (!displaySuccess) {
                console.error('All display methods failed');
            }
            
            // Force reflow and repaint for Brave
            void priceResult.offsetHeight;
            
            // Enhanced scrolling with Brave compatibility
            setTimeout(() => {
                const scrollMethods = [
                    () => priceResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
                    () => priceResult.scrollIntoView({ behavior: 'auto', block: 'nearest' }),
                    () => priceResult.scrollIntoView(true),
                    () => priceResult.scrollIntoView(),
                    () => {
                        const rect = priceResult.getBoundingClientRect();
                        window.scrollTo({
                            top: window.pageYOffset + rect.top - 100,
                            behavior: 'smooth'
                        });
                    },
                    () => {
                        const rect = priceResult.getBoundingClientRect();
                        window.scrollTo(0, window.pageYOffset + rect.top - 100);
                    }
                ];
                
                for (const scrollMethod of scrollMethods) {
                    try {
                        scrollMethod();
                        break;
                    } catch (scrollError) {
                        console.warn('Scroll method failed, trying next:', scrollError);
                    }
                }
            }, 150);
            
            console.log('✓ Price result displayed successfully with Brave compatibility');
            console.log('=== FINAL ELEMENT VALUES CHECK ===');
            targetElements.forEach(elementId => {
                const element = document.getElementById(elementId);
                if (element) {
                    console.log(`${elementId} final value:`, element.textContent);
                } else {
                    console.log(`${elementId}: STILL MISSING`);
                }
            });
            console.log('=== CALCULATE PRICE DEBUG END ===');
        } catch (displayError) {
            console.error('Error displaying price result:', displayError);
        }
        
        // Final GitHub Pages and Brave-specific validation and retry
        setTimeout(() => {
            const finalCheck = ['capacityDisplay', 'generationDisplay', 'savingsDisplay', 'totalPrice', 'subsidyPrice'];
            finalCheck.forEach(elementId => {
                const element = document.getElementById(elementId);
                if (element && (!element.textContent || element.textContent.trim() === '')) {
                    const valueKey = elementId.replace('Display', '').replace('total', 'total').replace('subsidy', 'subsidy');
                    const value = formattedValues[valueKey === 'total' ? 'totalPrice' : valueKey === 'subsidy' ? 'subsidyPrice' : valueKey];
                    if (value) {
                        element.textContent = value;
                        console.log(`✓ Final fix applied to ${elementId}:`, value);
                    }
                }
            });
        }, 300);
    } catch (error) {
        console.error('Error in calculatePrice:', error);
    }
}

// Close price modal
function closePriceModal() {
    const modal = document.getElementById('priceModal');
    if (modal) {
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    }
    
    // Enhanced body scrolling restoration for GitHub Pages compatibility
    try {
        if (document.body) {
            // Remove all overflow styles completely
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('overflow-x');
            document.body.style.removeProperty('overflow-y');
            
            // Force reflow to ensure changes take effect
            document.body.offsetHeight;
            
            // Additional fallback methods for different browsers
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 100);
        }
    } catch (error) {
        console.error('Error restoring scroll:', error);
    }
    
    // Additional GitHub Pages compatibility fixes
    const html = document.documentElement;
    if (html) {
        html.style.removeProperty('overflow');
        html.style.removeProperty('overflow-x');
        html.style.removeProperty('overflow-y');
    }
    
    console.log('Price modal closed and scrolling restored with enhanced compatibility');
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

// Enhanced DOM Content Loaded for better Brave browser compatibility
function initializeWebsite() {
    try {
        console.log('Initializing website...');
        
        // Set sun/moon based on time
        setCelestialBody();
        
        // Hide loading screen after page loads (1 second total)
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 200);
            }
        }, 800);
        
        // Initialize brand logos with delay for GitHub Pages
        setTimeout(() => {
            try { 
                initBrandLogos(); 
                console.log('Brand logos initialized successfully');
            } catch (e) { 
                console.error('Brand logos init error:', e); 
            }
        }, 100);
        
        // Update KW card prices on page load
        setTimeout(() => {
            try { 
                updateKWCardPrices(); 
                console.log('KW card prices updated successfully');
            } catch (e) { 
                console.error('KW card prices update error:', e); 
            }
        }, 200);
        
        // GitHub Pages specific initialization
        setTimeout(() => {
            try {
                // Force initialize pricing data for GitHub Pages
                window.onGridPricing = getBrandPricing();
                console.log('GitHub Pages pricing data initialized:', window.onGridPricing);
                
                // Ensure all DOM elements are ready
                const priceModal = document.getElementById('priceModal');
                if (priceModal) {
                    console.log('Price modal found on GitHub Pages');
                } else {
                    console.warn('Price modal not found on GitHub Pages');
                }
                
                // Check for price result elements
                const priceResult = document.getElementById('priceResult');
                if (priceResult) {
                    console.log('Price result container found on GitHub Pages');
                } else {
                    console.warn('Price result container not found on GitHub Pages');
                }
                
            } catch (e) {
                console.error('GitHub Pages initialization error:', e);
            }
        }, 500);
        
        console.log('Website initialization completed');
        
    } catch (error) {
        console.error('Website initialization error:', error);
    }
}

// Disable right-click context menu and image protection
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    // Ctrl+U
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // Ctrl+S
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
});

// Disable text selection on images
document.addEventListener('selectstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Multiple event listeners for maximum browser compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    // DOM is already loaded
    initializeWebsite();
}

// Fallback initialization
window.addEventListener('load', function() {
    // Double-check brand logos are initialized
    setTimeout(() => {
        const brandLogos = document.querySelectorAll('.brand-logo');
        if (brandLogos.length > 0) {
            let hasEventListeners = false;
            brandLogos.forEach(logo => {
                if (logo.onclick || logo.getAttribute('data-initialized')) {
                    hasEventListeners = true;
                }
            });
            
            if (!hasEventListeners) {
                console.log('Re-initializing brand logos as fallback');
                initBrandLogos();
            }
        }
    }, 500);
});

// Initialize brand logo click handlers for better browser compatibility
function initBrandLogos() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBrandLogos);
        return;
    }
    
    // Add event listeners to brand logos for better Brave browser compatibility
    const brandLogos = document.querySelectorAll('.brand-logo');
    
    console.log('Initializing brand logos, found:', brandLogos.length);
    
    brandLogos.forEach((logo, index) => {
        // Remove existing onclick handlers
        logo.removeAttribute('onclick');
        
        // Add proper event listeners with better error handling
        const clickHandler = function(e) {
            try {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Brand logo clicked, element:', this);
                
                // Get brand from data attribute or determine from image src
                let brand = this.getAttribute('data-brand');
                
                if (!brand) {
                    const img = this.querySelector('img');
                    if (img) {
                        const src = img.src.toLowerCase();
                        if (src.includes('exide')) brand = 'exide';
                        else if (src.includes('luminous')) brand = 'luminous';
                        else if (src.includes('adani')) brand = 'adani';
                        else if (src.includes('tata')) brand = 'tata';
                        else if (src.includes('waaree')) brand = 'waaree';
                    }
                }
                
                if (brand) {
                    console.log('Opening price modal for brand:', brand);
                    openPriceModalWithBrand(brand);
                } else {
                    console.error('Unable to determine brand from logo');
                    alert('Unable to open price calculator. Please try again.');
                }
            } catch (error) {
                console.error('Error in brand logo click handler:', error);
                alert('Unable to open price calculator. Please try again.');
            }
        };
        
        // Add click event listener
        logo.addEventListener('click', clickHandler);
        
        // Add touch event for mobile devices
        logo.addEventListener('touchend', function(e) {
            e.preventDefault();
            clickHandler.call(this, e);
        });
        
        // Add keyboard support for accessibility
        logo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                clickHandler.call(this, e);
            }
        });
        
        // Make focusable for keyboard navigation
        logo.setAttribute('tabindex', '0');
        logo.setAttribute('role', 'button');
        logo.setAttribute('aria-label', `Open price calculator for ${logo.getAttribute('data-brand') || 'brand'}`);
        logo.setAttribute('data-initialized', 'true');
        logo.style.cursor = 'pointer';
        
        console.log(`Brand logo ${index + 1} initialized for brand:`, logo.getAttribute('data-brand'));
    });
    
    console.log('Brand logos initialization completed');
}

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

// Smart WhatsApp redirection - tries native app first, then falls back to web
function redirectToWhatsAppWithDetails() {
    try {
        // Check if KW is selected
        if (!currentSelectedKW) {
            alert('Please select a system capacity first!');
            return;
        }
        
        // Use complete pricing data (same as directPriceDisplay)
        const pricing = {
            tata: { 1: {gen: 120, sav: 14400, price: 60000, sub: 18000}, 2: {gen: 240, sav: 144000, price: 125000, sub: 37500}, 3: {gen: 360, sav: 43200, price: 180000, sub: 78000}, 4: {gen: 480, sav: 57600, price: 240000, sub: 72000}, 5: {gen: 600, sav: 72000, price: 300000, sub: 90000}, 6: {gen: 720, sav: 86400, price: 350000, sub: 105000}, 7: {gen: 840, sav: 100800, price: 380000, sub: 114000}, 8: {gen: 960, sav: 115200, price: 400000, sub: 120000}, 9: {gen: 1080, sav: 129600, price: 420000, sub: 126000}, 10: {gen: 1200, sav: 144000, price: 450000, sub: 135000} },
            exide: { 1: {gen: 130, sav: 15600, price: 65000, sub: 19500}, 2: {gen: 260, sav: 31200, price: 130000, sub: 39000}, 3: {gen: 390, sav: 46800, price: 185000, sub: 55500}, 4: {gen: 520, sav: 62400, price: 245000, sub: 73500}, 5: {gen: 650, sav: 78000, price: 305000, sub: 91500}, 6: {gen: 780, sav: 93600, price: 355000, sub: 106500}, 7: {gen: 910, sav: 109200, price: 385000, sub: 115500}, 8: {gen: 1040, sav: 124800, price: 405000, sub: 121500}, 9: {gen: 1170, sav: 140400, price: 425000, sub: 127500}, 10: {gen: 1300, sav: 156000, price: 445000, sub: 133500} },
            luminous: { 1: {gen: 125, sav: 15000, price: 62000, sub: 18600}, 2: {gen: 250, sav: 30000, price: 128000, sub: 38400}, 3: {gen: 375, sav: 45000, price: 182000, sub: 54600}, 4: {gen: 500, sav: 60000, price: 242000, sub: 72600}, 5: {gen: 625, sav: 75000, price: 302000, sub: 90600}, 6: {gen: 750, sav: 90000, price: 352000, sub: 105600}, 7: {gen: 875, sav: 105000, price: 382000, sub: 114600}, 8: {gen: 1000, sav: 120000, price: 402000, sub: 120600}, 9: {gen: 1125, sav: 135000, price: 422000, sub: 126600}, 10: {gen: 1250, sav: 150000, price: 442000, sub: 132600} },
            adani: { 1: {gen: 135, sav: 16200, price: 68000, sub: 20400}, 2: {gen: 270, sav: 32400, price: 135000, sub: 40500}, 3: {gen: 405, sav: 48600, price: 190000, sub: 57000}, 4: {gen: 540, sav: 64800, price: 250000, sub: 75000}, 5: {gen: 675, sav: 81000, price: 310000, sub: 93000}, 6: {gen: 810, sav: 97200, price: 360000, sub: 108000}, 7: {gen: 945, sav: 113400, price: 390000, sub: 117000}, 8: {gen: 1080, sav: 129600, price: 410000, sub: 123000}, 9: {gen: 1215, sav: 145800, price: 430000, sub: 129000}, 10: {gen: 1350, sav: 162000, price: 450000, sub: 135000} },
            waaree: { 1: {gen: 128, sav: 15360, price: 64000, sub: 19200}, 2: {gen: 256, sav: 30720, price: 132000, sub: 39600}, 3: {gen: 384, sav: 46080, price: 187000, sub: 56100}, 4: {gen: 512, sav: 61440, price: 247000, sub: 74100}, 5: {gen: 640, sav: 76800, price: 307000, sub: 92100}, 6: {gen: 768, sav: 92160, price: 357000, sub: 107100}, 7: {gen: 896, sav: 107520, price: 387000, sub: 116100}, 8: {gen: 1024, sav: 122880, price: 407000, sub: 122100}, 9: {gen: 1152, sav: 138240, price: 427000, sub: 128100}, 10: {gen: 1280, sav: 153600, price: 447000, sub: 134100} }
        };
        
        // Get system data from hardcoded pricing
        const brand = currentBrand || 'tata';
        const systemData = pricing[brand] && pricing[brand][currentSelectedKW];
        
        if (!systemData) {
            alert('Pricing data not available. Please try again later.');
            return;
        }
        
        // Construct WhatsApp message with system details
        const netPrice = systemData.price - systemData.sub;
        const message = `Hello Dhanunjay Solar Solutions,

I am interested in your ${brand.toUpperCase()} solar system with the following specifications:

🔋 System Capacity: ${currentSelectedKW} KW
⚡ Monthly Generation: ${systemData.gen} units
💰 Monthly Savings: ₹${systemData.sav.toLocaleString('en-IN')}
💵 Total Price: ₹${systemData.price.toLocaleString('en-IN')}
🎯 Government Subsidy: ₹${systemData.sub.toLocaleString('en-IN')}
✅ Net Price After Subsidy: ₹${netPrice.toLocaleString('en-IN')}

Please provide more details about installation, warranty, and next steps.

Thank you!`;
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp number to contact
        const whatsappNumber = '918500583341';
        
        // Smart WhatsApp redirection - Always try native app first
        const openWhatsAppSmart = () => {
            // Create URLs for both native app and web
            const nativeAppURL = 'whatsapp://send?phone=' + whatsappNumber + '&text=' + encodedMessage;
            const webURL = 'https://web.whatsapp.com/send?phone=' + whatsappNumber + '&text=' + encodedMessage;
            
            console.log('Opening WhatsApp...');
            console.log('Phone:', whatsappNumber);
            console.log('Native URL:', nativeAppURL);
            console.log('Web URL:', webURL);
            
            // Detect device type
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Function to try native app with proper detection
            const tryNativeApp = function() {
                var appOpened = false;
                var startTime = new Date().getTime();
                
                console.log('Attempting to open native WhatsApp app...');
                
                // Method 1: Try direct window.location for mobile
                if (isMobile) {
                    try {
                        window.location.href = nativeAppURL;
                        appOpened = true;
                        console.log('Mobile: Redirected to native app');
                    } catch (e) {
                        console.warn('Mobile native app failed:', e);
                    }
                } else {
                    // Method 2: For desktop, try multiple approaches
                    
                    // Create hidden iframe to test app availability
                    try {
                        var iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.style.width = '1px';
                        iframe.style.height = '1px';
                        iframe.src = nativeAppURL;
                        document.body.appendChild(iframe);
                        
                        // Remove iframe after test
                        setTimeout(function() {
                            try {
                                if (iframe && iframe.parentNode) {
                                    document.body.removeChild(iframe);
                                }
                            } catch (e) {}
                        }, 1000);
                        
                        console.log('Desktop: Created iframe for app detection');
                    } catch (e) {
                        console.warn('Desktop iframe method failed:', e);
                    }
                    
                    // Try window.open with native URL
                    setTimeout(function() {
                        try {
                            var appWindow = window.open(nativeAppURL, '_blank');
                            if (appWindow) {
                                console.log('Desktop: Opened native app via window.open');
                                appOpened = true;
                            }
                        } catch (e) {
                            console.warn('Desktop window.open failed:', e);
                        }
                    }, 100);
                    
                    // Try location.href as backup
                    setTimeout(function() {
                        if (!appOpened) {
                            try {
                                window.location.href = nativeAppURL;
                                console.log('Desktop: Tried location.href for native app');
                            } catch (e) {
                                console.warn('Desktop location.href failed:', e);
                            }
                        }
                    }, 300);
                }
                
                // Fallback to web version after delay
                setTimeout(function() {
                    console.log('Fallback: Opening WhatsApp Web...');
                    try {
                        window.open(webURL, '_blank');
                    } catch (e) {
                        console.error('Web fallback failed:', e);
                        // Last resort - direct navigation
                        window.location.href = webURL;
                    }
                }, isMobile ? 2500 : 3000); // Longer delay for desktop app detection
            };
            
            // Execute native app attempt
            tryNativeApp();
        };
        
        // Execute smart WhatsApp opening
        openWhatsAppSmart();
        
        // Track the interaction
        try {
            if (typeof trackEvent === 'function') {
                trackEvent('whatsapp_contact', { 
                    brand: brand, 
                    kw: currentSelectedKW,
                    method: 'smart_redirect'
                });
            }
        } catch (e) {
            console.warn('Error tracking event:', e);
        }
        
    } catch (error) {
        console.error('Error redirecting to WhatsApp:', error);
        alert('Unable to open WhatsApp. Please try again later.');
    }
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
        console.error('Error sending to cloud storage:', error);
    }
}

// Show edit controls only with keyboard shortcut (Ctrl+Shift+E)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        const editControls = document.getElementById('editControls');
        if (editControls && editControls.style.display === 'none') {
            editControls.style.display = 'block';
        }
    }
});

// Initialize custom pricing on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCustomPricingData();
});

// Send email notification to admin
async function sendEmailNotification(data) {
    try {
        const emailData = {
            to: 'admin@dhanunjaysolar.com',
            subject: `New Solar Quote Request - ${data.capacity}`,
            html: `
                <h2>New Solar Quote Request</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                <p><strong>System Capacity:</strong> ${data.capacity}</p>
                <p><strong>Brand:</strong> ${data.brand}</p>
                <p><strong>Monthly Generation:</strong> ${data.generation}</p>
                <p><strong>Annual Savings:</strong> ${data.savings}</p>
                <p><strong>Total Price:</strong> ${data.totalPrice}</p>
                <p><strong>Government Subsidy:</strong> ${data.subsidy}</p>
                <p><strong>Message:</strong> ${data.message}</p>
                <hr>
                <p><em>Sent from Dhanunjay Solar Solutions Website</em></p>
            `
        };
        
        // Here you would integrate with your email service
        // For now, we'll just log it
        console.log('Email notification prepared:', emailData);
        
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}

// Visitor Tracking
function initVisitorTracking() {
    // ... (rest of the code remains the same)
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

// Smooth scroll to brands section function
function scrollToBrands() {
    const brandsSection = document.getElementById('brands');
    if (brandsSection) {
        brandsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
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

// Enter Edit Mode
function enterEditMode() {
    if (!isEditAuthorized) {
        return;
    }
    
    isEditMode = true;
    
    // Show edit controls
    document.getElementById('editControls').style.display = 'block';
    
    // Store original values
    originalValues = {
        generation: document.getElementById('generationDisplay').textContent,
        savings: document.getElementById('savingsDisplay').textContent,
        totalPrice: document.getElementById('totalPrice').textContent,
        subsidy: document.getElementById('subsidyPrice').textContent
    };
    
    // Make fields editable
    makeFieldsEditable();
    
    // Update UI
    document.getElementById('editModeBtn').style.display = 'none';
    document.getElementById('saveBtn').style.display = 'inline-block';
    document.getElementById('cancelBtn').style.display = 'inline-block';
    
    console.log('Edit mode enabled');
}

// Exit Edit Mode
function exitEditMode() {
    isEditMode = false;
    isEditAuthorized = false;
    
    // Remove editable fields
    removeEditableFields();
    
    // Update UI
    document.getElementById('editModeBtn').style.display = 'inline-block';
    document.getElementById('saveBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';
    
    // Hide edit controls completely
    document.getElementById('editControls').style.display = 'none';
    
    console.log('Edit mode disabled');
}

// Toggle Edit Mode
function toggleEditMode() {
    if (!isEditAuthorized) {
        requestEditAccess();
        return;
    }
    
    isEditMode = !isEditMode;
    
    if (isEditMode) {
        enterEditMode();
    } else {
        exitEditMode();
    }
}

// Admin access control - password should be handled server-side in production
let isEditAuthorized = false;

// Secure admin authentication function
function authenticateAdmin() {
    // In production, this should use proper authentication with server-side validation
    const password = prompt('Enter admin password:');
    if (password && password.length > 0) {
        // This is a temporary client-side check - replace with server authentication
        const hashedInput = btoa(password); // Basic encoding - use proper hashing in production
        const expectedHash = btoa('solar2024'); // This should come from server in production
        
        if (hashedInput === expectedHash) {
            isEditAuthorized = true;
            sessionStorage.setItem('adminAuth', 'true');
            return true;
        }
    }
    alert('Invalid password');
    return false;
}

// Request edit access with password
function requestEditAccess() {
    if (authenticateAdmin()) {
        enterEditMode();
    }
}

// Make fields editable
function makeFieldsEditable() {
    const editableFields = [
        { id: 'generationDisplay', type: 'number', suffix: ' units' },
        { id: 'savingsDisplay', type: 'currency', prefix: '₹' },
        { id: 'totalPrice', type: 'currency', prefix: '₹' },
        { id: 'subsidyPrice', type: 'currency', prefix: '₹' }
    ];
    
    editableFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            const currentValue = element.textContent;
            let numericValue = currentValue.replace(/[^0-9]/g, '');
            
            element.classList.add('editable-field');
            element.innerHTML = `<input type="number" value="${numericValue}" data-field="${field.id}" data-type="${field.type}" data-prefix="${field.prefix || ''}" data-suffix="${field.suffix || ''}">`;
            
            // Add event listener for real-time formatting
            const input = element.querySelector('input');
            input.addEventListener('input', formatInputValue);
        }
    });
}

// Format input value in real-time
function formatInputValue(event) {
    const input = event.target;
    const type = input.dataset.type;
    const prefix = input.dataset.prefix;
    const suffix = input.dataset.suffix;
    let value = parseInt(input.value) || 0;
    
    if (type === 'currency') {
        input.parentElement.setAttribute('data-formatted', prefix + value.toLocaleString('en-IN'));
    } else {
        input.parentElement.setAttribute('data-formatted', value + suffix);
    }
}

// Remove editable fields
function removeEditableFields() {
    const editableFields = document.querySelectorAll('.editable-field');
    editableFields.forEach(field => {
        const input = field.querySelector('input');
        if (input) {
            const formattedValue = field.getAttribute('data-formatted') || field.textContent;
            field.classList.remove('editable-field');
            field.innerHTML = formattedValue;
        }
    });
}

// Save edited values
function saveEditedValues() {
    const inputs = document.querySelectorAll('.editable-field input');
    const newValues = {};
    
    inputs.forEach(input => {
        const fieldId = input.dataset.field;
        const type = input.dataset.type;
        const value = parseInt(input.value) || 0;
        
        newValues[fieldId] = value;
    });
    
    // Update the pricing data for current brand and KW
    updatePricingData(currentBrand, currentSelectedKW, newValues);
    
    // Update display with formatted values
    updateDisplayWithNewValues(newValues);
    
    // Exit edit mode
    exitEditMode();
    
    alert('✅ Values saved successfully!');
    console.log('Saved values:', newValues);
}

// Cancel edit
function cancelEdit() {
    // Restore original values
    document.getElementById('generationDisplay').textContent = originalValues.generation;
    document.getElementById('savingsDisplay').textContent = originalValues.savings;
    document.getElementById('totalPrice').textContent = originalValues.totalPrice;
    document.getElementById('subsidyPrice').textContent = originalValues.subsidy;
    
    // Exit edit mode
    exitEditMode();
    
    console.log('Edit cancelled, values restored');
}

// Update pricing data in memory
function updatePricingData(brand, kw, newValues) {
    if (!onGridPricing[brand]) {
        onGridPricing[brand] = {};
    }
    
    if (!onGridPricing[brand][kw]) {
        onGridPricing[brand][kw] = {};
    }
    
    // Update the pricing data
    onGridPricing[brand][kw] = {
        generation: newValues.generationDisplay || onGridPricing[brand][kw].generation,
        savings: newValues.savingsDisplay || onGridPricing[brand][kw].savings,
        price: newValues.totalPrice || onGridPricing[brand][kw].price,
        subsidy: newValues.subsidyPrice || onGridPricing[brand][kw].subsidy
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('customPricingData', JSON.stringify(onGridPricing));
    
    console.log(`Updated ${brand} ${kw}KW:`, onGridPricing[brand][kw]);
}

// Update display with new values
function updateDisplayWithNewValues(newValues) {
    Object.keys(newValues).forEach(fieldId => {
        const element = document.getElementById(fieldId);
        const value = newValues[fieldId];
        
        if (element) {
            switch(fieldId) {
                case 'generationDisplay':
                    element.textContent = value + ' units';
                    break;
                case 'savingsDisplay':
                case 'totalPrice':
                case 'subsidyPrice':
                    element.textContent = '₹' + value.toLocaleString('en-IN');
                    break;
            }
        }
    });
}

// Load custom pricing data on page load
function loadCustomPricingData() {
    const customData = localStorage.getItem('customPricingData');
    if (customData) {
        try {
            const parsedData = JSON.parse(customData);
            // Merge with default pricing
            Object.keys(parsedData).forEach(brand => {
                if (!onGridPricing[brand]) onGridPricing[brand] = {};
                Object.keys(parsedData[brand]).forEach(kw => {
                    onGridPricing[brand][kw] = { ...onGridPricing[brand][kw], ...parsedData[brand][kw] };
                });
            });
            console.log('Custom pricing data loaded:', parsedData);
        } catch (error) {
            console.error('Error loading custom pricing data:', error);
        }
    }
}

// Direct price display function - bypasses all complex logic
window.directPriceDisplay = function(brand, kw) {
    console.log('=== DIRECT PRICE DISPLAY ===');
    console.log('Brand:', brand, 'KW:', kw);
    
    // Set global variables for WhatsApp function
    window.currentBrand = brand;
    window.currentSelectedKW = kw;
    currentBrand = brand;
    currentSelectedKW = kw;
    
    // Complete brand pricing data for all KW values 1-10
    const pricing = {
        tata: { 
            1: {gen: 120, sav: 14400, price: 60000, sub: 18000}, 
            2: {gen: 240, sav: 144000, price: 125000, sub: 37500}, 
            3: {gen: 360, sav: 43200, price: 180000, sub: 78000},
            4: {gen: 480, sav: 57600, price: 240000, sub: 72000},
            5: {gen: 600, sav: 72000, price: 300000, sub: 90000},
            6: {gen: 720, sav: 86400, price: 350000, sub: 105000},
            7: {gen: 840, sav: 100800, price: 380000, sub: 114000},
            8: {gen: 960, sav: 115200, price: 400000, sub: 120000},
            9: {gen: 1080, sav: 129600, price: 420000, sub: 126000},
            10: {gen: 1200, sav: 144000, price: 450000, sub: 135000}
        },
        exide: { 
            1: {gen: 130, sav: 15600, price: 65000, sub: 19500}, 
            2: {gen: 260, sav: 31200, price: 130000, sub: 39000}, 
            3: {gen: 390, sav: 46800, price: 185000, sub: 55500},
            4: {gen: 520, sav: 62400, price: 245000, sub: 73500},
            5: {gen: 650, sav: 78000, price: 305000, sub: 91500},
            6: {gen: 780, sav: 93600, price: 355000, sub: 106500},
            7: {gen: 910, sav: 109200, price: 385000, sub: 115500},
            8: {gen: 1040, sav: 124800, price: 405000, sub: 121500},
            9: {gen: 1170, sav: 140400, price: 425000, sub: 127500},
            10: {gen: 1300, sav: 156000, price: 445000, sub: 133500}
        },
        luminous: { 
            1: {gen: 125, sav: 15000, price: 62000, sub: 18600}, 
            2: {gen: 250, sav: 30000, price: 128000, sub: 38400}, 
            3: {gen: 375, sav: 45000, price: 182000, sub: 54600},
            4: {gen: 500, sav: 60000, price: 242000, sub: 72600},
            5: {gen: 625, sav: 75000, price: 302000, sub: 90600},
            6: {gen: 750, sav: 90000, price: 352000, sub: 105600},
            7: {gen: 875, sav: 105000, price: 382000, sub: 114600},
            8: {gen: 1000, sav: 120000, price: 402000, sub: 120600},
            9: {gen: 1125, sav: 135000, price: 422000, sub: 126600},
            10: {gen: 1250, sav: 150000, price: 442000, sub: 132600}
        },
        adani: { 
            1: {gen: 135, sav: 16200, price: 68000, sub: 20400}, 
            2: {gen: 270, sav: 32400, price: 135000, sub: 40500}, 
            3: {gen: 405, sav: 48600, price: 190000, sub: 57000},
            4: {gen: 540, sav: 64800, price: 250000, sub: 75000},
            5: {gen: 675, sav: 81000, price: 310000, sub: 93000},
            6: {gen: 810, sav: 97200, price: 360000, sub: 108000},
            7: {gen: 945, sav: 113400, price: 390000, sub: 117000},
            8: {gen: 1080, sav: 129600, price: 410000, sub: 123000},
            9: {gen: 1215, sav: 145800, price: 430000, sub: 129000},
            10: {gen: 1350, sav: 162000, price: 450000, sub: 135000}
        },
        waaree: { 
            1: {gen: 128, sav: 15360, price: 64000, sub: 19200}, 
            2: {gen: 256, sav: 30720, price: 132000, sub: 39600}, 
            3: {gen: 384, sav: 46080, price: 187000, sub: 56100},
            4: {gen: 512, sav: 61440, price: 247000, sub: 74100},
            5: {gen: 640, sav: 76800, price: 307000, sub: 92100},
            6: {gen: 768, sav: 92160, price: 357000, sub: 107100},
            7: {gen: 896, sav: 107520, price: 387000, sub: 116100},
            8: {gen: 1024, sav: 122880, price: 407000, sub: 122100},
            9: {gen: 1152, sav: 138240, price: 427000, sub: 128100},
            10: {gen: 1280, sav: 153600, price: 447000, sub: 134100}
        }
    };
    
    const data = pricing[brand] && pricing[brand][kw];
    if (!data) {
        console.error('No data found for', brand, kw);
        return;
    }
    
    // Show price result
    const priceResult = document.getElementById('priceResult');
    if (priceResult) {
        priceResult.style.display = 'block';
        priceResult.style.visibility = 'visible';
        priceResult.style.opacity = '1';
    }
    
    // Direct element updates
    const updates = [
        ['capacityDisplay', kw + ' KW'],
        ['generationDisplay', data.gen + ' units'],
        ['savingsDisplay', '₹' + data.sav.toLocaleString('en-IN')],
        ['totalPrice', '₹' + data.price.toLocaleString('en-IN')],
        ['subsidyPrice', '₹' + data.sub.toLocaleString('en-IN')]
    ];
    
    updates.forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value;
            el.style.display = 'inline';
            el.style.visibility = 'visible';
            console.log('✓', id, '=', value);
        } else {
            console.error('✗ Element not found:', id);
        }
    });
    
    console.log('=== DIRECT DISPLAY COMPLETE ===');
    console.log('Global variables set - Brand:', currentBrand, 'KW:', currentSelectedKW);
};

// Override selectKW to use direct approach
const originalSelectKW = selectKW;
selectKW = function(kw) {
    console.log('selectKW override called:', kw);
    currentSelectedKW = kw;
    
    // Update card selection
    document.querySelectorAll('.kw-card').forEach(card => card.classList.remove('selected'));
    const selectedCard = document.querySelector(`[data-kw="${kw}"], .kw-card:nth-child(${kw})`);
    if (selectedCard) selectedCard.classList.add('selected');
    
    // Direct price display
    window.directPriceDisplay(currentBrand || 'tata', kw);
    
    // Show details view
    document.getElementById('detailsBtn').classList.add('active');
    document.getElementById('capacityBtn').classList.remove('active');
    document.querySelector('.kw-selector-container').style.display = 'none';
    document.getElementById('priceResult').style.display = 'block';
};

console.log('Dhanunjay Solar Solutions - Website with Direct Edit Loaded Successfully! 🌞⚡✏️');

// CSRF Token Management
function generateCSRFToken() {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0')).join('');
    sessionStorage.setItem('csrf-token', token);
    return token;
}

function getCSRFToken() {
    let token = sessionStorage.getItem('csrf-token');
    if (!token) {
        token = generateCSRFToken();
    }
    return token;
}

function validateCSRFToken(token) {
    const storedToken = sessionStorage.getItem('csrf-token');
    return token && storedToken && token === storedToken;
}

// Initialize CSRF token when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const csrfTokenInput = document.getElementById('csrf-token');
    if (csrfTokenInput) {
        csrfTokenInput.value = getCSRFToken();
    }
});

// Update the form submission to include CSRF validation
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const csrfToken = formData.get('_csrf');
        
        if (!validateCSRFToken(csrfToken)) {
            console.error('Invalid CSRF token');
            alert('Session expired. Please refresh the page and try again.');
            return;
        }
        
        // Your existing form submission logic here
        // Make sure to include the CSRF token in any AJAX requests
        
        // After successful submission, generate a new token
        document.getElementById('csrf-token').value = generateCSRFToken();
    });
}

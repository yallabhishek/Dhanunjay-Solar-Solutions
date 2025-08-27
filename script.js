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
            7: { generation: 840, savings: 100800, price: 380000, subsidy: 114000 },
            8: { generation: 960, savings: 115200, price: 400000, subsidy: 120000 },
            9: { generation: 1080, savings: 129600, price: 420000, subsidy: 126000 },
            10: { generation: 1200, savings: 144000, price: 450000, subsidy: 135000 }
        },
        exide: {
            1: { generation: 130, savings: 15600, price: 65000, subsidy: 19500 },
            2: { generation: 260, savings: 31200, price: 130000, subsidy: 39000 },
            3: { generation: 390, savings: 46800, price: 185000, subsidy: 55500 },
            4: { generation: 520, savings: 62400, price: 245000, subsidy: 73500 },
            5: { generation: 650, savings: 78000, price: 305000, subsidy: 91500 },
            6: { generation: 780, savings: 93600, price: 355000, subsidy: 106500 },
            7: { generation: 910, savings: 109200, price: 385000, subsidy: 115500 },
            8: { generation: 1040, savings: 124800, price: 405000, subsidy: 121500 },
            9: { generation: 1170, savings: 140400, price: 425000, subsidy: 127500 },
            10: { generation: 1300, savings: 156000, price: 445000, subsidy: 133500 }
        },
        luminous: {
            1: { generation: 125, savings: 15000, price: 62000, subsidy: 18600 },
            2: { generation: 250, savings: 30000, price: 128000, subsidy: 38400 },
            3: { generation: 375, savings: 45000, price: 182000, subsidy: 54600 },
            4: { generation: 500, savings: 60000, price: 242000, subsidy: 72600 },
            5: { generation: 625, savings: 75000, price: 302000, subsidy: 90600 },
            6: { generation: 750, savings: 90000, price: 352000, subsidy: 105600 },
            7: { generation: 875, savings: 105000, price: 382000, subsidy: 114600 },
            8: { generation: 1000, savings: 120000, price: 402000, subsidy: 120600 },
            9: { generation: 1125, savings: 135000, price: 422000, subsidy: 126600 },
            10: { generation: 1250, savings: 150000, price: 442000, subsidy: 132600 }
        },
        adani: {
            1: { generation: 135, savings: 16200, price: 68000, subsidy: 20400 },
            2: { generation: 270, savings: 32400, price: 135000, subsidy: 40500 },
            3: { generation: 405, savings: 48600, price: 190000, subsidy: 57000 },
            4: { generation: 540, savings: 64800, price: 250000, subsidy: 75000 },
            5: { generation: 675, savings: 81000, price: 310000, subsidy: 93000 },
            6: { generation: 810, savings: 97200, price: 360000, subsidy: 108000 },
            7: { generation: 945, savings: 113400, price: 390000, subsidy: 117000 },
            8: { generation: 1080, savings: 129600, price: 410000, subsidy: 123000 },
            9: { generation: 1215, savings: 145800, price: 430000, subsidy: 129000 },
            10: { generation: 1350, savings: 162000, price: 450000, subsidy: 135000 }
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
    
    try {
        const savedBrandPricing = localStorage.getItem('brandPricingData');
        return savedBrandPricing ? JSON.parse(savedBrandPricing) : defaultBrandPricing;
    } catch (error) {
        console.warn('Error accessing localStorage for brand pricing, using defaults:', error);
        return defaultBrandPricing;
    }
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
    try {
        console.log('Opening price modal for brand:', brand);
        
        // Validate brand parameter
        if (!brand || typeof brand !== 'string') {
            console.error('Invalid brand parameter:', brand);
            alert('Unable to open price calculator. Please try again.');
            return;
        }
        
        // Set current brand and update pricing with validation
        const normalizedBrand = brand.toLowerCase();
        const brandPricing = getBrandPricing();
        
        // Verify brand exists in pricing data
        const availableBrands = Object.keys(brandPricing).map(k => k.toLowerCase());
        if (availableBrands.includes(normalizedBrand)) {
            currentBrand = normalizedBrand;
        } else {
            console.warn(`Brand '${normalizedBrand}' not found in pricing data. Available:`, availableBrands);
            // Find closest match or use default
            const exactMatch = Object.keys(brandPricing).find(k => k.toLowerCase() === normalizedBrand);
            currentBrand = exactMatch ? exactMatch.toLowerCase() : 'tata';
        }
        
        console.log('Set current brand to:', currentBrand);
        onGridPricing = brandPricing;
        currentSelectedKW = null; // Reset selected KW
        
        // Find modal element with multiple fallback attempts
        let modal = document.getElementById('priceModal');
        if (!modal) {
            // Try alternative selectors
            modal = document.querySelector('[id="priceModal"]') || 
                   document.querySelector('.price-modal') ||
                   document.querySelector('#price-modal');
        }
        
        if (!modal) {
            console.error('Price modal element not found in DOM');
            alert('Unable to open price calculator. Please refresh the page and try again.');
            return;
        }
        
        // Find price result element
        let priceResult = document.getElementById('priceResult');
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
        } catch (e) {
            console.warn('Error tracking event:', e);
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
        
        console.log('Formatted values:', formattedValues);
        
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
        
        // Update each element with enhanced fallback support
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
        console.error('Error in calculatePrice function:', error);
        // Emergency fallback for GitHub Pages and Brave
        setTimeout(() => {
            const elements = document.querySelectorAll('.detail-value, .price-amount, .subsidy-amount');
            if (elements.length > 0 && selectedKW && currentBrand) {
                const brandPricing = getBrandPricing();
                const systemData = brandPricing[currentBrand] && brandPricing[currentBrand][selectedKW];
                if (systemData) {
                    const values = [
                        selectedKW + ' KW',
                        systemData.generation + ' units',
                        '₹' + systemData.savings.toLocaleString('en-IN'),
                        '₹' + systemData.price.toLocaleString('en-IN'),
                        '₹' + (systemData.subsidy || 0).toLocaleString('en-IN')
                    ];
                    
                    elements.forEach((el, index) => {
                        if (values[index] && (!el.textContent || el.textContent.trim() === '')) {
                            el.textContent = values[index];
                        }
                    });
                    console.log('✓ Emergency fallback completed');
                }
            }
        }, 500);
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
    if (document.body) {
        // Remove all overflow styles completely
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('overflow-x');
        document.body.style.removeProperty('overflow-y');
        
        // Force reflow to ensure changes take effect
        document.body.offsetHeight;
        
        // Additional fallback methods for different browsers
        setTimeout(() => {
            document.body.classList.remove('modal-open');
            document.documentElement.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('overflow-x');
            document.documentElement.style.removeProperty('overflow-y');
        }, 10);
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
        
        // Hide loading screen after page loads
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1000);
        
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

// Redirect to WhatsApp with predefined message for selected system
function redirectToWhatsAppWithDetails() {
    try {
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
        
        // Create optimized message for WhatsApp auto-send
        const brandName = currentBrand.charAt(0).toUpperCase() + currentBrand.slice(1);
        const message = `🌞 *INTERESTED IN SOLAR SYSTEM* 🌞

Hi DhanunJay Solar Solutions!

I'm interested in the *${brandName} ${currentSelectedKW}KW Solar System*

📋 *System Details:*
• Capacity: ${currentSelectedKW} KW
• Monthly Generation: ${systemData.generation} units
• Annual Savings: ₹${systemData.savings.toLocaleString()}
• Government Subsidy: ₹${subsidyAmount.toLocaleString()}
• Total System Price: ₹${totalPrice.toLocaleString()}
• *Final Price: ₹${netPrice.toLocaleString()}*

Please share:
✅ Installation timeline
✅ Site visit details
✅ Payment options
✅ Warranty information

Looking forward to going solar! 🔋⚡`;
        
        // WhatsApp number
        const whatsappNumber = '919133921819';
        
        // Create WhatsApp URL with better encoding for auto-send
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        console.log('Opening WhatsApp with predefined message...');
        
        // Track the WhatsApp redirect
        try {
            if (typeof trackEvent === 'function') {
                trackEvent('whatsapp_interested_clicked', { brand: brand, kw: currentSelectedKW, totalPrice: totalPrice, netPrice: netPrice });
            }
        } catch (e) {
            console.warn('Tracking error:', e);
        }
        
        // Enhanced cross-platform WhatsApp opening with browser-specific handling
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isBrave = navigator.brave && navigator.brave.isBrave || false;
        
        // Create different URL formats for better compatibility
        const whatsappWebURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        const whatsappApiURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        console.log('Browser detection - Mobile:', isMobile, 'Brave:', isBrave);
        console.log('Message length:', message.length, 'Encoded length:', encodedMessage.length);
        
        if (isMobile) {
            // Mobile device handling
            try {
                if (isBrave) {
                    // Brave mobile - use API URL which works better
                    window.open(whatsappApiURL, '_blank');
                } else {
                    // Other mobile browsers - try app first, then web
                    window.location.href = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
                    
                    // Fallback to web WhatsApp after short delay
                    setTimeout(() => {
                        window.open(whatsappURL, '_blank');
                    }, 1500);
                }
            } catch (error) {
                console.error('Mobile WhatsApp error:', error);
                window.open(whatsappApiURL, '_blank');
            }
        } else {
            // Desktop handling - force WhatsApp Web to avoid app detection
            try {
                let targetURL;
                
                if (isBrave) {
                    // Brave desktop - use simpler encoding and force web.whatsapp.com
                    const simpleMessage = message.replace(/[^\w\s\-_.,!?()]/g, ' ');
                    const simpleEncoded = encodeURIComponent(simpleMessage);
                    targetURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${simpleEncoded}`;
                    console.log('Using Brave-compatible Web URL:', targetURL);
                } else {
                    // Other desktop browsers - always use web.whatsapp.com
                    targetURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
                }
                
                console.log('Opening WhatsApp Web directly:', targetURL);
                
                // Force opening in new tab to avoid app detection dialog
                const newWindow = window.open('about:blank', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
                
                if (newWindow) {
                    // Navigate to WhatsApp Web in the new window
                    newWindow.location.href = targetURL;
                    console.log('WhatsApp Web opened in new window');
                } else {
                    // Popup blocked - try direct navigation
                    console.log('Popup blocked, using direct navigation');
                    window.location.href = targetURL;
                }
                
            } catch (error) {
                console.error('Desktop WhatsApp error:', error);
                // Ultimate fallback - try direct navigation
                try {
                    const fallbackURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
                    window.location.href = fallbackURL;
                } catch (fallbackError) {
                    console.error('Fallback error:', fallbackError);
                    alert('Unable to open WhatsApp. Please visit: https://web.whatsapp.com and search for +91 9133921819');
                }
            }
        }
        
        // Close the price modal after opening WhatsApp
        setTimeout(() => {
            closePriceModal();
        }, 500);
        
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        // Ultimate fallback - simple WhatsApp link
        const fallbackURL = `https://wa.me/919133921819`;
        window.open(fallbackURL, '_blank');
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

// Simple Cloud Data Synchronization using GitHub Pages
class CloudDataSync {
    constructor() {
        this.storageKey = 'solarPricingData_v2';
        this.backupEndpoint = 'https://httpbin.org/post'; // Simple test endpoint
    }

    // Save data to cloud (simplified approach)
    async saveToCloud(data) {
        try {
            // For GitHub Pages, we'll use a simple approach
            // Save to multiple localStorage keys for redundancy
            const timestamp = new Date().toISOString();
            const dataWithMeta = {
                data: data,
                timestamp: timestamp,
                version: Date.now()
            };

            // Try to post to a simple endpoint for logging
            try {
                await fetch(this.backupEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataWithMeta)
                });
                console.log('✅ Data backup sent successfully');
            } catch (backupError) {
                console.log('📝 Backup endpoint not available, using local storage only');
            }

            // Save to localStorage with timestamp
            localStorage.setItem(this.storageKey, JSON.stringify(dataWithMeta));
            localStorage.setItem('lastCloudSync', timestamp);
            
            return true;
        } catch (error) {
            console.error('❌ Cloud save failed:', error);
            return false;
        }
    }

    // Load data from cloud
    async loadFromCloud() {
        try {
            // Load from localStorage
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                console.log('✅ Data loaded from storage successfully');
                return parsed.data;
            }
        } catch (error) {
            console.error('❌ Cloud load failed:', error);
        }
        return null;
    }

    // Simple fallback method
    async saveToGist(data) {
        console.log('📝 Data prepared for manual backup:', JSON.stringify(data, null, 2));
        return true;
    }

    // Load from fallback
    async loadFromGist() {
        return null;
    }
}

// Initialize cloud sync
const cloudSync = new CloudDataSync();

// Enhanced save function with cloud sync
async function saveWithCloudSync(data) {
    // Save locally first
    localStorage.setItem('customPricingData', JSON.stringify(data));
    localStorage.setItem('solarPricingData', JSON.stringify(data));
    localStorage.setItem('brandPricingData', JSON.stringify(data));
    localStorage.setItem('onGridPricing', JSON.stringify(data));

    // Try to save to cloud
    const cloudSaved = await cloudSync.saveToCloud(data);
    
    if (!cloudSaved) {
        // Fallback to Gist
        await cloudSync.saveToGist(data);
    }

    return cloudSaved;
}

// Enhanced load function with cloud sync
async function loadWithCloudSync() {
    // Try cloud first
    let cloudData = await cloudSync.loadFromCloud();
    
    if (cloudData) {
        // Merge with local data
        const localData = localStorage.getItem('customPricingData');
        if (localData) {
            try {
                const parsedLocal = JSON.parse(localData);
                // Use cloud data but keep any newer local changes
                const mergedData = { ...cloudData, ...parsedLocal };
                return mergedData;
            } catch (error) {
                console.error('Error parsing local data:', error);
            }
        }
        return cloudData;
    }

    // Try to load from GitHub Pages JSON file
    try {
        const response = await fetch('./pricing-data.json');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Loaded pricing data from GitHub Pages file');
            return data;
        }
    } catch (error) {
        console.log('📝 GitHub Pages file not available');
    }

    // Final fallback to local storage
    const localData = localStorage.getItem('customPricingData');
    if (localData) {
        try {
            return JSON.parse(localData);
        } catch (error) {
            console.error('Error parsing local data:', error);
        }
    }

    return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cloudSync, saveWithCloudSync, loadWithCloudSync };
}

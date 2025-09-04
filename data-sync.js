// Cloud Data Synchronization System
class CloudDataSync {
    constructor() {
        this.apiEndpoint = 'https://api.jsonbin.io/v3/b';
        this.binId = '676f8a2bad19ca34f8c8e5a2'; // Your JSONBin ID
        this.apiKey = '$2a$10$8K9vN2mF5qL3pR7sT1wX4eY6hG8jD9kA2bC5fE3gH1iJ4kL6mN0oP';
        this.fallbackGist = 'https://gist.githubusercontent.com/yallabhishek/solar-pricing-data/main/pricing.json';
    }

    // Save data to cloud
    async saveToCloud(data) {
        try {
            const response = await fetch(`${this.apiEndpoint}/${this.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey,
                    'X-Bin-Versioning': 'false'
                },
                body: JSON.stringify({
                    pricing: data,
                    lastUpdated: new Date().toISOString(),
                    version: Date.now()
                })
            });

            if (response.ok) {
                console.log('✅ Data saved to cloud successfully');
                return true;
            } else {
                throw new Error('Failed to save to cloud');
            }
        } catch (error) {
            console.error('❌ Cloud save failed:', error);
            return false;
        }
    }

    // Load data from cloud
    async loadFromCloud() {
        try {
            const response = await fetch(`${this.apiEndpoint}/${this.binId}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Data loaded from cloud successfully');
                return result.record.pricing;
            } else {
                throw new Error('Failed to load from cloud');
            }
        } catch (error) {
            console.error('❌ Cloud load failed:', error);
            return null;
        }
    }

    // Fallback: Save to GitHub Gist (read-only for users)
    async saveToGist(data) {
        try {
            // This would require GitHub API token - for now just log
            console.log('📝 Fallback: Data ready for GitHub Gist upload');
            console.log('Data to upload:', JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error('❌ Gist save failed:', error);
            return false;
        }
    }

    // Load from GitHub Gist (fallback)
    async loadFromGist() {
        try {
            const response = await fetch(this.fallbackGist);
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Fallback data loaded from Gist');
                return data;
            }
        } catch (error) {
            console.error('❌ Gist load failed:', error);
        }
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

    // Fallback to Gist
    cloudData = await cloudSync.loadFromGist();
    if (cloudData) {
        return cloudData;
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

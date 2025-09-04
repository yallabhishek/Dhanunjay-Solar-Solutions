// ========================================
// 📊 SOLAR PRICING DATA - EASY TO EDIT
// ========================================
// 
// 🔧 HOW TO UPDATE PRICES:
// 1. Find the brand you want to edit (tata, exide, luminous, adani, waaree)
// 2. Find the KW capacity (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// 3. Update any of these values:
//    - generation: Monthly units generated
//    - savings: Annual savings in rupees
//    - price: Total system price in rupees
//    - subsidy: Government subsidy in rupees
// 4. Save the file and refresh your website
//
// 💡 TIP: Keep the format exactly the same, just change the numbers!
//
const SOLAR_PRICING_DATA = {
  
  // 🔆 TATA POWER SOLAR
  "tata": {
    "1": { "generation": 120, "savings": 6000, "price": 90000, "subsidy": 30000 },
    "2": { "generation": 240, "savings": 13000, "price": 150000, "subsidy": 60000 },
    "3": { "generation": 360, "savings": 24000, "price": 215000, "subsidy": 78000 },
    "4": { "generation": 480, "savings": 36000, "price": 280000, "subsidy": 78000 },
    "5": { "generation": 600, "savings": 48000, "price": 345000, "subsidy": 78000 },
    "6": { "generation": 720, "savings": 60000, "price": 405000, "subsidy": 78000 },
    "7": { "generation": 840, "savings": 72000, "price": 480000, "subsidy": 78000 },
    "8": { "generation": 960, "savings": 84000, "price": 535000, "subsidy": 78000 },
    "9": { "generation": 1080, "savings": 96000, "price": 600000, "subsidy": 78000 },
    "10": { "generation": 1200, "savings": 108000, "price": 655000, "subsidy": 78000 }
  },
  
  // 🔋 EXIDE SOLAR
  "exide": {
    "1": { "generation": 120, "savings": 6000, "price": 85000, "subsidy": 30000 },
    "2": { "generation": 240, "savings": 13000, "price": 144000, "subsidy": 60000 },
    "3": { "generation": 360, "savings": 24000, "price": 208000, "subsidy": 78000 },
    "4": { "generation": 480, "savings": 36000, "price": 273000, "subsidy": 78000 },
    "5": { "generation": 600, "savings": 48000, "price": 340000, "subsidy": 78000 },
    "6": { "generation": 720, "savings": 60000, "price": 400000, "subsidy": 78000 },
    "7": { "generation": 840, "savings": 72000, "price": 475000, "subsidy": 78000 },
    "8": { "generation": 960, "savings": 84000, "price": 530000, "subsidy": 78000 },
    "9": { "generation": 1080, "savings": 96000, "price": 595000, "subsidy": 78000 },
    "10": { "generation": 1200, "savings": 108000, "price": 650000, "subsidy": 78000 }
  },
  
  // 💡 LUMINOUS SOLAR
  "luminous": {
    "1": { "generation": 120, "savings": 6000, "price": 90000, "subsidy": 30000 },
    "2": { "generation": 240, "savings": 13000, "price": 150000, "subsidy": 60000 },
    "3": { "generation": 360, "savings": 24000, "price": 215000, "subsidy": 78000 },
    "4": { "generation": 480, "savings": 36000, "price": 280000, "subsidy": 78000 },
    "5": { "generation": 600, "savings": 48000, "price": 345000, "subsidy": 78000 },
    "6": { "generation": 720, "savings": 60000, "price": 405000, "subsidy": 78000 },
    "7": { "generation": 840, "savings": 72000, "price": 480000, "subsidy": 78000 },
    "8": { "generation": 960, "savings": 84000, "price": 535000, "subsidy": 78000 },
    "9": { "generation": 1080, "savings": 96000, "price": 595000, "subsidy": 78000 },
    "10": { "generation": 1200, "savings": 108000, "price": 650000, "subsidy": 78000 }
  },
  
  // ⚡ ADANI SOLAR
  "adani": {
    "1": { "generation": 120, "savings": 6000, "price": 90000, "subsidy": 30000 },
    "2": { "generation": 240, "savings": 13000, "price": 150000, "subsidy": 60000 },
    "3": { "generation": 360, "savings": 24000, "price": 215000, "subsidy": 78000 },
    "4": { "generation": 480, "savings": 36000, "price": 280000, "subsidy": 78000 },
    "5": { "generation": 600, "savings": 48000, "price": 345000, "subsidy": 78000 },
    "6": { "generation": 720, "savings": 60000, "price": 405000, "subsidy": 78000 },
    "7": { "generation": 840, "savings": 72000, "price": 480000, "subsidy": 78000 },
    "8": { "generation": 960, "savings": 84000, "price": 535000, "subsidy": 78000 },
    "9": { "generation": 1080, "savings": 96000, "price": 600000, "subsidy": 78000 },
    "10": { "generation": 1200, "savings": 108000, "price": 655000, "subsidy": 78000 }
  },
  
  // 🌞 WAAREE SOLAR
  "waaree": {
    "1": { "generation": 120, "savings": 6000, "price": 90000, "subsidy": 30000 },
    "2": { "generation": 240, "savings": 13000, "price": 150000, "subsidy": 60000 },
    "3": { "generation": 360, "savings": 24000, "price": 215000, "subsidy": 78000 },
    "4": { "generation": 480, "savings": 36000, "price": 280000, "subsidy": 78000 },
    "5": { "generation": 600, "savings": 48000, "price": 345000, "subsidy": 78000 },
    "6": { "generation": 720, "savings": 60000, "price": 405000, "subsidy": 78000 },
    "7": { "generation": 840, "savings": 72000, "price": 480000, "subsidy": 78000 },
    "8": { "generation": 960, "savings": 84000, "price": 535000, "subsidy": 78000 },
    "9": { "generation": 1080, "savings": 96000, "price": 600000, "subsidy": 78000 },
    "10": { "generation": 1200, "savings": 108000, "price": 655000, "subsidy": 78000 }
  }
};

const { defineConfig } = require("cypress");

const fs = require('fs');
const path = require('path');

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        overwriteDataFile() {
          try {
          const backupPath = path.join(__dirname, '././backup.txt'); 
          const dataPath = path.join(__dirname, '././data.txt'); 
    
          const backupContent = fs.readFileSync(backupPath, 'utf8'); 
          fs.writeFileSync(dataPath, backupContent); 
    
          return null; 
        } catch (error) {
          console.error('Error overwriting data file:', error);
          throw error;
        }
      }
      });
      return config;
    },
  },
});

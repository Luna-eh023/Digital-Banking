const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// 🔥 FIX CONNECTION STRING (AMAN)
const connectionString = `${config.database.connection}/${config.database.name}`;

// 🔥 CONNECT DATABASE
mongoose.connect(connectionString);

const db = mongoose.connection;

// 🔥 ERROR HANDLER
db.on('error', (err) => {
  logger.error(err, 'MongoDB connection error');
});

// 🔥 SUCCESS CONNECT
db.once('open', () => {
  logger.info(`Successfully connected to MongoDB: ${connectionString}`);
});

const dbExports = {};
dbExports.db = db;

const basename = path.basename(__filename);

// 🔥 LOAD SEMUA MODEL
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const filePath = path.join(__dirname, file);

    console.log("🔍 Loading model from:", file);

    const imported = require(filePath);

    let model;

    try {
      if (typeof imported === 'function') {
        model = imported(mongoose);
      } else {
        model = imported;
      }

      // 🔥 CEK MODEL VALID
      if (!model || !model.modelName) {
        console.warn(`⚠️ Model invalid dari file: ${file}`);
        return;
      }

      dbExports[model.modelName] = model;
    } catch (err) {
      console.error(`❌ Error load model dari file: ${file}`, err.message);
    }
  });

// 🔥 DEBUG MODEL YANG KELOAD
console.log('✅ Loaded models:', Object.keys(dbExports));

module.exports = dbExports;
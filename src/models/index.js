const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// 🔥 CONNECT DATABASE
mongoose.connect(config.database.connection);

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error(err, 'MongoDB connection error');
});

db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const dbExports = {};
dbExports.db = db;

const basename = path.basename(__filename);

// 🔥 LOAD SEMUA MODEL (SUPPORT 2 FORMAT)
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const filePath = path.join(__dirname, file);

    const imported = require(filePath);

    let model;

    // 🔥 Kalau export function → panggil
    if (typeof imported === 'function') {
      model = imported(mongoose);
    } else {
      // 🔥 Kalau langsung model → pakai langsung
      model = imported;
    }

    dbExports[model.modelName] = model;
  });

module.exports = dbExports;
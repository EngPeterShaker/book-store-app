const { getDefaultConfig } = require('expo/metro-config');
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add watchFolders for monorepo packages
config.watchFolders = [path.resolve(__dirname, '../../packages')];

// Ensure Metro can find node_modules from monorepo root
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, '../../node_modules'),
  path.resolve(__dirname, './node_modules'),
];

module.exports = config;

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);


// npm v7+ will install ../node_modules/react and ../node_modules/react-native because of peerDependencies.
// To prevent the incompatible react-native between ./node_modules/react-native and ../node_modules/react-native,
// excludes the one from the parent folder when bundling.
// config.resolver.blockList = [
//     ...Array.from(config.resolver.blockList ?? []),
//     new RegExp(path.resolve('../offerwall-sdk', 'node_modules', 'react')),
//     new RegExp(path.resolve('../offerwall-sdk', 'node_modules', 'react-native')),
// ];

config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, './node_modules'),
    path.resolve(__dirname, '../offerwall-sdk/node_modules'),
];

config.resolver.extraNodeModules = {
    'offerwall-sdk': path.resolve(__dirname, '../offerwall-sdk/src'),
};

config.watchFolders = [path.resolve(__dirname, '../offerwall-sdk')];

config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

module.exports = withNativeWind(config, { input: './global.css' });

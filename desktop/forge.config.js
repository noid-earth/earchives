require('dotenv').config();
const path = require('path');

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, './build/icon.ico'),
    ignore: [
      ".gitignore",
      ".env"
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: path.resolve(__dirname, './build/icon.ico'),
        setupIcon: path.resolve(__dirname, './build/icon.ico')
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'noid-earth',
          name: 'earchives',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};

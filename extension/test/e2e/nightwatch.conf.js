const CRX_PATH = require('path').join(__dirname, '../../dist')
const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')

module.exports = {
  src_folders: ['test/e2e'],
  output_folder: './output',
  filter: ['*.js'],
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4445,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path
    }
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'screenshots'
      },
      filter: ['*.spec.js'],
      globals: {
        waitForConditionTimeout: 5000
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: [`--load-extension=${CRX_PATH}`, `--disable-web-security`],
          w3c: false
        }
      }
    }
  },
  globals: {
    EXTENSION_ID: 'cklkpejioojjeiigffappdlcmnonmjek'
  }
}

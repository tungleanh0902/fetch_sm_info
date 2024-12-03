const nightwatch_config = {
  src_folders: ["tests/e2e"],
  globals_path: "./nightwatchGlobals.js",
  output_folder: "./output",
  launch_url: "http://127.0.0.1:9080",

  selenium: {
    start_process: false,
    host: "hub-cloud.browserstack.com",
    port: 443,
  },

  common_capabilities: {
    "browserstack.user": process.env.BROWSERSTACK_USERNAME || "",
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY || "",
    "browserstack.debug": true,
    "browserstack.networkLogs": false,
    build: "nightwatch-browserstack",
    browser: "chrome",
    resolution: "1920x1080",
    javascriptEnabled: true,
    acceptSslCerts: true,
    loggingPrefs: {
      driver: "INFO",
      server: "OFF",
      browser: "INFO",
    },
    chromeOptions: {
      args: ["disable-web-security", "ignore-certificate-errors"],
      prefs: {
        "intl.accept_languages": "en-US,en",
      },
    },
  },

  test_settings: {
    default: {
      filter: ["*.spec.js"],
    },
    windows: {
      desiredCapabilities: {
        os: "Windows",
        os_version: "10",
      },
    },
    osx: {
      desiredCapabilities: {
        os: "OS X",
        os_version: "Mojave",
        browserName: "Safari",
      },
    },
  },
}

// Code to copy seleniumhost/port into test settings
for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i]
  config["selenium_host"] = nightwatch_config.selenium.host
  config["selenium_port"] = nightwatch_config.selenium.port
  config["desiredCapabilities"] = config["desiredCapabilities"] || {}
  for (var j in nightwatch_config.common_capabilities) {
    config["desiredCapabilities"][j] =
      config["desiredCapabilities"][j] ||
      nightwatch_config.common_capabilities[j]
  }
}

module.exports = nightwatch_config

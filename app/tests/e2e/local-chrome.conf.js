const chromedriver = require("chromedriver")

const nightwatch_config = {
  src_folders: ["./tests/e2e/"],
  output_folder: "./output",
  globals_path: "./nightwatchGlobals.js",
  disable_colors: false,
  test_workers: false,
  webdriver: {
    start_process: true,
    port: 9515,
    default_path_prefix: "",
    server_path: chromedriver.path,
    cli_args: ["--verbose", "--no-sandbox"],
  },
  desiredCapabilities: {
    browserName: "chrome",
    javascriptEnabled: true,
    acceptSslCerts: true,
    loggingPrefs: {
      driver: "INFO",
      server: "OFF",
      browser: "INFO",
    },
    chromeOptions: {
      args: [
        "disable-web-security",
        "ignore-certificate-errors",
        "no-sandbox",
        // "headless", // headless is not possible as it doesn't allow to fix the internationalization
        "window-size=1920,1080",
      ],
      prefs: {
        "intl.accept_languages": "en-US,en",
      },
    },
  },
  screenshots: {
    enabled: true,
    on_failure: true,
    on_error: true,
    path: "screenshots",
  },
  request_timeout_options: {
    timeout: 60000,
    retry_attempts: 5,
  },
  test_settings: {
    default: {
      launch_url: "http://localhost:9080",
      silent: true,
      filter: ["*.spec.js"],
    },
  },
}

module.exports = nightwatch_config

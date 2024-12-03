var { globals } = require('./nightwatch.conf.js')
const formData = require('./formData.json')

module.exports = {
  'Send Transaction': function(browser) {
    browser
      .url(`chrome-extension://${globals.EXTENSION_ID}/popup/popup.html`)
      .waitForElementVisible('.tm-li-session-title')
      .click('a[href="#/recover"]')
      .pause(500)
      // Seed
      .waitForElementVisible('h2.session-title')
      .setValue(
        "textarea[placeholder='Must be exactly 24 words']",
        formData.seedPhrase
      )
      .click('div.session-footer button')
      .pause(500)
      // Name
      .waitForElementVisible('h2.session-title')
      .setValue(
        "input[placeholder='Must have at least 3 characters']",
        formData.name
      )
      .click('div.session-footer button')
      .pause(500)
      // Password
      .waitForElementVisible('h2.session-title')
      .setValue(
        "input[placeholder='Must be at least 10 characters']",
        formData.password
      )
      .setValue("input[placeholder='Enter password again']", formData.password)
      .click('div.session-footer button')
      .pause(500)
      // Assert
      .assert.containsText(
        'body',
        'You can use the account(s) below to explore Lunie.io and to approve transactions'
      )

      // Send transaction on Lunie to extension
      .execute(function() {
        window.open('http://localhost:9080/#/extension')
      })
      .pause(500)

      // Switch to Localhost
      .windowHandles(function(result) {
        browser
          .switchWindow(result.value[1])
          .pause(300)
          // .assert.urlContains('http://localhost:9080/#/extension')
          .waitForElementVisible('.account-button')
          .click('.account-button')
          .waitForElementNotPresent('.session')

          // Perform a token send
          // .click('a[href="/portfolio"]') // this doesn't work and we are at portfolio already
          .click('.send-button')
          .setValue(
            "input[placeholder='Address']",
            'cosmos1akhswynqs07zj5p2k25r6s4ur45qyjnr30wt59'
          )
          .setValue("input[placeholder='Amount']", '1')
          .click('div.action-modal-footer button')
          .click('div.action-modal-footer button')
          .click('div.action-modal-footer button')

          // Back to extension to approve
          .switchWindow(result.value[0])
          .refresh()
          .setValue("input[placeholder='Password']", formData.password)
          .click('#approve-btn')
          .assert.containsText('body', 'Transaction Complete')
          .switchWindow(result.value[1])
        browser.expect
          .element('body')
          .text.to.contain('Successful Send')
          .before(10000)
      })
  }
}

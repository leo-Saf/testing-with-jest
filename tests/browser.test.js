const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        // Öppna webbsidan
        await driver.get('file://' + __dirname + '/../dist/index.html');
        
        // Testa knappen "push"
        let pushButton = await driver.findElement(By.id('push'));
        await pushButton.click();

        // Fyll i prompten
        await driver.executeScript('window.prompt = function() { return "test"; }');

        // Testa knappen "peek"
        let peekButton = await driver.findElement(By.id('peek'));
        await peekButton.click();

        // Kontrollera resultatet
        let display = await driver.findElement(By.id('top_of_stack'));
        let text = await display.getText();
        if (text === "test") {
            console.log('Test passed!');
        } else {
            console.log('Test failed. Expected "test", but got:', text);
        }
    } finally {
        await driver.quit();
    }
})();

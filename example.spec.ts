const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
    const browser = await webkit.launch({ headless: false });
    const context = await browser.newContext();
    await context.exposeBinding('pageURL', ({ page }) => page.url());
    const page = await context.newPage();
    await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
    await page.click('button');
})();

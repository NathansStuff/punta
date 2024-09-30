const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// File to save cookies
const cookiesFilePath = path.join(__dirname, 'cookies.json');
// File to save the raw HTML
const htmlFilePath = path.join(__dirname, 'rawPage.html');

// Function to save cookies
async function saveCookies(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies, null, 2));
  console.log('Cookies saved.');
}

// Function to load cookies
async function loadCookies(page) {
  if (fs.existsSync(cookiesFilePath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));
    await page.setCookie(...cookies);
    console.log('Cookies loaded.');
    return true; // Return true if cookies exist
  }
  return false; // Return false if no cookies
}

// Function to save the raw HTML of the page
async function saveRawHTML(page) {
  const rawHTML = await page.content(); // Get the raw HTML of the page
  fs.writeFileSync(htmlFilePath, rawHTML);
  console.log(`Raw HTML saved to ${htmlFilePath}`);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Try to load cookies; if cookies exist, go straight to the horse page
  const cookiesLoaded = await loadCookies(page);

  if (!cookiesLoaded) {
    // No cookies; go to the login page
    console.log('No cookies found. Navigating to login page...');
    await page.goto('https://www.studbook.org.au/Default.aspx');

    // Wait for the login form to appear and log in
    if (await page.$('input[name="txtUserId"]')) {
      console.log('Logging in...');
      await page.type('input[name="txtUserId"]', '763168');
      await page.type('input[name="txtPassword"]', 'XQRLFG');
      await page.click('input[name="btnLogin"]');
      await page.waitForNavigation();

      // Save cookies after logging in
      await saveCookies(page);
    }
  } else {
    console.log(
      'Cookies found. Skipping login and going straight to horse page...'
    );
  }

  // Navigate to the target page
  await page.goto(
    'https://www.studbook.org.au/horse.aspx?hid=1025161&pagetype=PEDIGREE'
  );

  // Save the raw HTML for later analysis
  await saveRawHTML(page);

  // Extract pedigree information
  const extractPedigreeInfo = async page => {
    console.log('Extracting Pedigree Info...');

    const response = await page.evaluate(() => {
      const pedigree = {};
      const debugInfo = [];
      const extractedItems = [];

      // Get all PedigreeItem elements
      const pedigreeItems = document.querySelectorAll('a.PedigreeItem');
      debugInfo.push(`Found ${pedigreeItems.length} Pedigree Items`);
      debugInfo.push(`Item 0: ${pedigreeItems[0].innerText}`);

      // Log every pedigree item text and link for debugging
      pedigreeItems.forEach((pedigreeItem, i) => {
        debugInfo.push(
          `${i} -${pedigreeItem.innerText} - ${pedigreeItem.href}`
        );
      });

      if (pedigreeItems.length > 0) {
        // Assign based on their position in the pedigree tree
        pedigree.paternalGrandfather = pedigreeItems[0].innerText; // Danehill
        pedigree.paternalGrandmother = pedigreeItems[1].innerText; // Kensington Gardens
        pedigree.father = pedigreeItems[2]; // Blackfriars
        pedigree.maternalGrandfather = pedigreeItems[3].innerText; // Bellotto
        pedigree.maternalGrandmother = pedigreeItems[4].innerText; // Favorita
        pedigree.mother = pedigreeItems[5].innerText; // Mimicry
        pedigree.currentHorse = pedigreeItems[6].innerText; // The Temptress
      }

      return { pedigree, debugInfo, extractedItems }; // Return debug and extracted info
    });

    console.log('Debug Info:', response.debugInfo); // Log debug information
    console.log('Extracted Items:', response.extractedItems); // Log all extracted items
    return response.pedigree;
  };

  const pedigreeInfo = await extractPedigreeInfo(page);

  // Log the extracted pedigree information
  console.log('Extracted Pedigree Info:', pedigreeInfo);

  // Close the browser manually or let it stay open
  // await browser.close();
})();

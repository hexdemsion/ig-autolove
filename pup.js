const puppeteer = require('puppeteer');


var Args = process.argv.slice(2);

(async (username, password) => {
	const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage();
	await page.setViewport({
		width: 1366,
		height: 768,
		deviceScaleFactor: 1,
	})

	await page.goto('https://www.instagram.com/accounts/login/')
	await page.waitFor(4000)
	await page.screenshot({path: 'init.png'})

	await page.type('input[name="username"]', username);
	await page.type('input[name="password"]', password);

	await page.screenshot({path: 'filled.png'})

	await page.click('button[type="submit"]')

	await page.waitFor(5000)

	i=0
	while(i<10) {
		await page.evaluate(() => {
			function like_timeline() {
				// elem = document.getElementsByClassName("glyphsSpriteHeart__outline__24__grey_9 u-__7")
				// for (var i = elem.length - 1; i >= 0; i--) {
				// 	elem[i].click()
				// }
				location.reload()
			}
			setTimeout(function(){
				like_timeline()
			}, 4000)
		})
		i++
	}

	// await page.waitFor(10000)

	// await browser.close()
})(Args[0], Args[1])
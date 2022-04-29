const puppeteer = require('puppeteer');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const csv = fs.readFileSync('csv/data.csv');
const records = parse(csv.toString('utf-8'));

const cheerio = require('cheerio');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://ndev.co.kr/login.php');

    const ndev_id = "phadceo"
    const ndev_pw = "phadceo!!"

    const inputed_kword = "전세사기"

    await page.type('[name="userid"]', ndev_id)
    await page.type('[name="password"]', ndev_pw)

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    console.log("눌렀다.")

    await page.waitForNavigation();
    await page.goto('http://ndev.co.kr/b');
    console.log("11111")

    await page.type('[name="keyword"]', inputed_kword)
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(10000)

    // const content = await page.content();
    // // $에 cheerio를 로드한다.
    // const $ = cheerio.load(content);
    // // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
    // const lists = $("tr");
    // // 모든 리스트를 순환한다.
    // lists.each((index, list) => {
    //     console.log(index);
    // });

    // const data = await page.$$eval('table tr td', tds => tds.map((td) => {
    //     return td.innerText;
    // }));
    // lists.each((index, list) => {
    //     console.log(index);
    // });

    await page.screenshot({fullPage: true, path: "./Docs/test.png"});
    await browser.close();
})();
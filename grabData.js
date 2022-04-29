const puppeteer = require("puppeteer"); // 설치된 puppeteer 모듈

(async () => {
    const browser = await puppeteer.launch(); // headless 브라우저 실행
    const page = await browser.newPage(); // 새로운 페이지 열기

    const ndev_id = "phadceo"
    const ndev_pw = "phadceo!!"

    const inputed_kword = "전세사기"
    await page.goto("http://ndev.co.kr/");

    await page.evaluate((id, pw) => {
        document
            .querySelector('#userid')
            .value = id;
        document
            .querySelector('#password')
            .value = pw;
    }, ndev_id, ndev_pw);

    await page.click('.btn-block');
    
    await page.waitForNavigation();

    await page.goto('http://ndev.co.kr/b');


    // await page.evaluate((kword) => {
    //     document
    //         .querySelector('#keyword')
    //         .value = kword;
    // }, inputed_kword);

    // await page.click('.btn-lg');

    await page.screenshot({ path: 'naver.png', fullPage:true });
    // // evaluate() 함수를 이용해 History table을 선택하고 반복문으로 내용을 빈배열에 추가한다
    // const reactHistory = await page.evaluate(() => {
    //     let scrappedData = []; // 스크래핑 내용 담을 빈 배열
    //     const tbodyChilds = document
    //         .querySelector(".a")
    //         .childNodes[3]
    //         .children; // history 테이블의 <tbody> 내용

    //     // 반복문으로 <tbody> 내용 객체 형식으로 빈 배열에 추가
    //     for (let i = 1; i < tbodyChilds.length; i++) {
    //         scrappedData.push({
    //             version: tbodyChilds[i]
    //                 .children[0]
    //                 .textContent,
    //             released: tbodyChilds[i]
    //                 .children[1]
    //                 .textContent,
    //             changes: tbodyChilds[i]
    //                 .children[2]
    //                 .textContent
    //         });
    //     }
    //     return scrappedData;
    // });

    // const fs = require("fs"); // 내장된 `file system` 모듈
    // // 스크래핑된 내용 json 파일로 원하는 경로에 생성
    // fs.writeFile(
    //     "./Docs/react-history.json",
    //     JSON.stringify(reactHistory, null, 2),
    //     err => err
    //         ? console.error("!!Failed writing file", err)
    //         : console.log("Successfuly file created!")
    // );

    // 모든 스크래핑 작업을 마치고 브라우저 닫기
    await browser.close();
})();
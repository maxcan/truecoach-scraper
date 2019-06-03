require("dotenv").config();
import axios from "axios";
import * as readline from "readline";
import puppeteer from "puppeteer";
import Bluebird from "bluebird";

const email = process.env.TC_EMAIL;
const pass = process.env.TC_PASSWORD;
if (!email) {
  throw new Error("missing emial");
}

if (!pass) {
  throw new Error("missing password");
}

const sleep = (millis: number) => new Promise(res => setTimeout(res, millis));

const run = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto("https://app.truecoach.co/login/");

  const emailInput = await page.$("input#email");
  if (!emailInput) {
    console.error("could not get email input");
    return;
  }
  await emailInput.type(email);

  const passwordInput = await page.$("input#password");
  if (!passwordInput) {
    console.error("could not get password input");
    return;
  }
  await passwordInput.type(pass);
  await page.setRequestInterception(true);
  page.on("request", request => {
    const reqHeaders = request.headers();
    const url = request.url();
    // console.log(url);
    if (
      url &&
      url.startsWith("https://bigdawgs.truecoach.co/proxy/api/clients/")
    ) {
      console.log("set URL");
      baseUrl = url
        .replace(/page=\d+&/, "")
        .replace(/states=pending/, "states=completed%2Cmissed");
    }
    if (!headers && reqHeaders.authorization) {
      headers = {
        Authorization: reqHeaders.authorization,
        "X-Requested-With": "XMLHttpRequest",
        Role: "Client",
        Accept: "application/json"
      };
    }

    // if (request.url === constants.API) {
    //   request.respond({
    //     content: "application/json",
    //     headers: { "Access-Control-Allow-Origin": "*" },
    //     body: JSON.stringify(constants.biddersMock)
    //   });
    // } else {
    request.continue();
    // }
  });
  const submit = await page.$("button[type=submit]");
  submit!.click();
  await sleep(2500);

  let headers: any = null;
  let baseUrl: string | null = null;
  await sleep(5000);
  console.log("clicking past");
  (await page.$("a.tab.db:not(.is-active)"))!.click();
  // (await page.$("a.clientHeader-link"))!.click();
  await sleep(5000);

  // console.log(headers.Authorization);
  // console.log(headers);
  // return;
  const loadDataForPage = async (page: number) => {
    if (!baseUrl) {
      throw new Error("trying to load data before base URL is set");
    }
    const response = await axios
      .get(`${baseUrl}&page=${page}`, { headers })
      .catch(e => {
        console.error(e);
        return {} as any;
      });
    if (!response || !response.data) {
      throw new Error("bad response from the server ");
    }
    // console.log(response);
    // console.log(response.statusText);
    return JSON.parse(response.data);
  };
  const resObj = await loadDataForPage(1);
  if (!resObj.meta || !resObj.meta.total_pages) {
    throw new Error("Missing total pages..");
  }
  const allData: Array<any> = [];
  Bluebird.map([...new Array(resObj.meta.total_pages)], (_, idx) => {
    allData[idx] = loadDataForPage(idx + 1);
  });

  console.log(JSON.stringify(allData, null, "  "));
  // await page.goto("https://bigdawgs.truecoach.co/client/workouts?_=true");

  //   (await page.$(".client-workouts a.tab.db:not(.is-active)"))!.click();
  //   //   const nextpage = await browser.newPage();
  //   await page.screenshot({ path: "/tmp/screenshot.png" });
  // //
  //   await browser.close();
};

run();
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// rl.on("line", function(line) {
//   console.log(line);
// });

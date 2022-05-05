const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require("fs");
let xlsx = require("json-as-xlsx")

let leaderboard = [];
let counter = 0;

request('https://www.espncricinfo.com/series/ipl-2021-1249214/match-results', function (error, response, body) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    }
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    else {
        // console.log('body:', body); // Print the HTML for the Google homepage.
        const dom = new JSDOM(body);
        const document = dom.window.document;
        let links = document.querySelectorAll(".ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent>span>a");
        let count = 1;
        let total = 1;
        for (let i = 0; i < links.length; i++) {
            if (count == 3) {
                var link = links[i].href;
                let fulllink = "https://www.espncricinfo.com" + link;
                // console.log(fulllink,total++);

                request(fulllink, function (error, response, body) {
                    if (error) {
                        console.error('error:', error); // Print the error if one occurred
                    }
                    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    else {
                        // console.log('body:', body); // Print the HTML for the Google homepage.
                        const dom = new JSDOM(body);
                        const document = dom.window.document;
                        let batsmantable = document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table")

                        for (let i = 0; i < batsmantable.length; i++) {
                            let batsmanrows = batsmantable[i].querySelectorAll("tbody>.ds-border-b.ds-border-line.ds-text-tight-s")
                            for (let j = 0; j < batsmanrows.length; j++) {
                                let tds = batsmanrows[j].querySelectorAll("td");
                                if (tds.length > 4) {
                                    let name = tds[0].textContent;
                                    let runs = tds[2].textContent;
                                    let fours = tds[5].textContent;
                                    let sixes = tds[6].textContent;
                                    processPlayer(name, runs, fours, sixes);
                                    // console.log("Name:",name,"Runs:",runs,"  4's:",fours,"   6's:",sixes);
                                }
                            }
                        }
                        counter--;
                        if (counter == 0) {
                            // console.log(leaderboard);
                            // let data = JSON.stringify(leaderboard);
                            // fs.writeFileSync("batsmanStats.json",data);


                            let dataExcel = [
                                {
                                    sheet: "Leaderboard",
                                    columns: [
                                        { label: "Batsman Name", value: "Name" }, // Top level data
                                        { label: "Runs", value: "Runs" }, // Custom format
                                        { label: "Fours", value: "Fours" }, // Run functions
                                        { label: "Sixes", value: "Sixes" },
                                    ],
                                    content: leaderboard
                                },
                            ]

                            let settings = {
                                fileName: "BatsmanLeaderBoard", // Name of the resulting spreadsheet
                                extraLength: 3, // A bigger number means that columns will be wider
                                writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
                            }

                            xlsx(dataExcel, settings) // Will download the excel file
                        }

                    }
                });
                counter++;
            }
            if (count == 4) {
                count = 1;
            }
            else {
                count++;
            }
        }


    }
});

// console.log(leaderboard);

// processPlayer("Charith","99","9","5");
// processPlayer("Charith","5","1","2");
// console.log(leaderboard);

function processPlayer(name, runs, fours, sixes) {
    runs = Number(runs);
    fours = Number(fours);
    sixes = Number(sixes);
    for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].Name == name) {
            leaderboard[i].Runs += runs;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }

    let obj = {
        Name: name,
        Runs: runs,
        Fours: fours,
        Sixes: sixes
    }
    leaderboard.push(obj)
}
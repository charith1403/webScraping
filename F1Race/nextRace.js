const request=require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom; 

request('https://www.formula1.com/en/racing/2022.html', function (error, response, body) {
  if(error)
  {
    console.error('error:', error); // Print the error if one occurred
  }
  else
  {
    // console.log('body:', body); // Print the HTML for the Google homepage.
    const dom = new JSDOM(body);
    const document = dom.window.document;
    let raceRound = document.querySelectorAll(".race-card-wrapper.event-item .card-title.f1-uppercase.f1-color--warmRed");
    let startDate = document.querySelectorAll(".race-card-wrapper.event-item .start-date");
    let endDate = document.querySelectorAll(".race-card-wrapper.event-item .end-date");
    let month = document.querySelectorAll(".race-card-wrapper.event-item .month-wrapper.f1-wide--xxs");
    let area = document.querySelectorAll(".race-card-wrapper.event-item .event-place.d-block");
    let session = document.querySelectorAll(".time-list.f1-color--white.f1-uppercase.misc--label>div");
    let round = "ROUND 3";
    for(let i=0;i<month.length;i++)
    {
      // if(raceRound[i].textContent==round)
      // {
        console.log(raceRound[i].textContent+"  -> "+startDate[i].textContent+"-"+ endDate[i].textContent+" "+month[i].textContent+" "+area[i].textContent);
        
      // }
      
    }
    // for(let j=0;j<session.length;j++)
    // {
    //   console.log(session[j].textContent);
    // }
    console.log(session.length);
    // console.log(raceStartDate[0]);
  }
});



//- UP NEXT
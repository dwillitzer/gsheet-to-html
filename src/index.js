import GSheetReader from "g-sheets-api";
import moment from "moment";
import "./styles.css";

GSheetReader(
  {
    sheetId: "1D-g2sN9GMBNom8tMFV8wSS1hT-GTKf0La017aDscj7o",
    sheetNumber: 1,
    returnAllResults: true
  },
  (results) => {
    let eventDates = [];
    results.forEach((result) => {
      console.log(result);
      let app = document.getElementById("app");
      let dateString = moment(result["month"]).format("YYYY MMM");
      let event, date, dates, year, month;

      date = dateString.split(" ");
      year = date[0];
      month = date[1];

      // fields
      dates = typeof result["dates"] !== "undefined" ? result["dates"] : "";
      let title = typeof result["title"] !== "undefined" ? result["title"] : "";
      let description =
        typeof result["description"] !== "undefined"
          ? result["description"]
          : "";
      let location =
        typeof result["descrilocationption"] !== "undefined"
          ? result["location"]
          : "";
      let image =
        typeof result["image"] !== "undefined"
          ? `<div class="img"><img src="${result["image"]}" alt=""></div>`
          : "";

      // Add Event Date to array and create month section
      if (!eventDates.includes(dateString)) {
        eventDates.push(dateString);

        app.innerHTML += `<section data-title="${dateString}">
          <div><span class="year">${year}</span> <span class="month">${month}</span></div>
         
        </section>`;
      }

      // Add events to month
      if (eventDates.includes(dateString)) {
        event = document.querySelector(`[data-title="${dateString}"]`);

        event.innerHTML += `
        <div class="event">
            ${image}
            <div class="date">
                <div class="day">${dates}</div>
                <div class="month">${month}</div>
                <div class="year">${year}</div>
            </div>
            <div class="title">${title}</div>
            <div class="description">${description}</div>
            <div class="location">${location}</div>
        </div>
        `;
      }

      //console.log(dateString); // Output: 2020-07-21
      // document.getElementById("app");
      //.innerHTML += `<p>${dateString}</p>`;
      //.innerHTML += `<p>${result["month"]}</p>`;
    });
  },
  (error) => {
    document.getElementById("app").innerHTML += `<p>error: ${error}</p>`;
  }
);



let dataExcel = [
  {
    sheet: "Leaderboard",
    columns: [
      { label: "Batsman Name", value: "user" }, // Top level data
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
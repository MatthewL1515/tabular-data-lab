// Monthy Data

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/master/us-weather-history/KNYC.csv"

let weatherTable

// Array Variables
let tempsMax = []
let tempsMin = []
let months = []

// Initialized Variables
let minTemp = Infinity
let maxTemp = -Infinity
let selectedMonth = 1

function preload() {
  weatherTable = loadTable(weatherURL, 'csv', 'header')
}

function setup() {
  createCanvas(500, 500)
  noLoop()
  
  // Extract Temperature data for each row
  for (let i = 0; i < weatherTable.getRowCount(); i++) {
    let dataStr = weatherTable.getString(i, "date")
    let maxT = weatherTable.getNum(i, "actual_max_temp")
    let minT = weatherTable.getNum(i, "actual_min_temp")
    
    let month = int(dateStr.split('-')[1])
    // Note: I had to look up how to do this, because I was unsure how to identify and single out the date. The int() brings out the value as number (because dataStr brings it out as a string). Then the .split('-') tells the function to search for the numbers seperated by dashes '-'. The bracketed 1 [1] finds the second number in the string, which is the month I'm looking for.
    
    // Store in the seperate arrays
    months.push(month)
    maxTemps.push(maxT)
    minTemps.push(minT)
    
    // Track min and max temperatures
    if (maxT > maxTemp) {
      maxTemp = maxT
    }
    
    if (minT > minTemp) {
      minTemp = minT
    }
  }
}

function draw() {
  background(220)
}

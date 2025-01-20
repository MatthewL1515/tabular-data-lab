// Raw Data Site: https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv

// Data Site: https://github.com/fivethirtyeight/data/blob/master/us-weather-history/KNYC.csv



// Variables
const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

  // Array variables
  let tempsMax = []
  let tempsMin = []
  
  // Initialized Variables
  let minTemp = -Infinity
  let maxTemp = Infinity

function preload() {
  weatherTable = loadTable(weatherURL,'csv','header')
}

function setup() {
  createCanvas(400,400)
  noLoop()
  
  // Extract Temp. Data
  for (let i = 0; i < weatherTable.getRowCount(); i++) {
    // Need to make more variables for max and min temps
    let maxT = weatherTable.getNum(i, "actual_max_temp")
    let minT = weatherTable.getNum(i, "actual_min_temp")
    
    // Add new variables into array
    tempsMax.push(maxT)
    tempsMin.push(minT)
    
    // Track the temperatures
    if (maxT > maxTemp)
      maxTemp = maxT
    if (minT < minTemp)
      minTemp = minT
  }
}

function draw() {
  background(220)
  stroke(0)
  fill(0)
  
}

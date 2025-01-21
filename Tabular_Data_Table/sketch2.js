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
    let dateStr = weatherTable.getString(i, "date")
    let maxT = weatherTable.getNum(i, "actual_max_temp")
    let minT = weatherTable.getNum(i, "actual_min_temp")
    
    let month = int(dateStr.split('-')[1])
    // Note: I had to look up how to do this, because I was unsure how to identify and single out the date. The int() brings out the value as number (because dataStr brings it out as a string). Then the .split('-') tells the function to search for the numbers seperated by dashes '-'. The bracketed 1 [1] finds the second number in the string, which is the month I'm looking for.
    
    // Store in the seperate arrays
    months.push(month)
    tempsMax.push(maxT)
    tempsMin.push(minT)
    
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
  // Other variables relevant for draw function
  let h = height - 50
  let w = width / 2
  let c = 50
  
  background(220)
  
  // Specific temperatures on a specific month
  let filterMaxTemps = []
  let filterMinTemps = []
  
  for (let i = 0; i < months.length; i++) {
    if (months[i] === selectedMonth) {
      filterMaxTemps.push(tempsMax[i])
      filterMinTemps.push(tempsMin[i])
    }
  }
  
  // Spacing
  let dx = width / filterMaxTemps.length
  
  // Draw a title
  fill(0)
  textAlign(CENTER,CENTER)
  
  // Later button pressing will update variable 'selectedMonth'
  text(`Actual Min & Max Temperature - Month ${selectedMonth}`, w, 30)
  
  // Draw max temp line in red
  stroke("red")
  noFill()
  beginShape()
  for (let i = 0; i < filterMaxTemps.length; i++) {
    let x = (i + 1) * dx
    let yMax = map(filterMaxTemps[i], tempsMin, tempsMax, h, c)
    vertex(x, yMax)
  }
  endShape()
  
  // Draw blue line now for min temp line
  stroke("blue")
  noFill()
  beginShape()
  for (let i = 0; i < filterMinTemps.length; i++) {
    let x = (i + 1) * dx
    let yMin = map(filterMinTemps[i], tempsMin, tempsMax, h, c)
    vertex(x, yMin)
  }
  endShape()
  
  // Instructions for a reader for pushing buttons
  fill(0)
  noStroke()
  text("Press Left/Right arrow button to change month please", w, height - 20)
}

function keyPressed() {
  // Add 1 Month
  if (keyCode === RIGHT_ARROW) {
    selectedMonth = (selectedMonth % 12) + 1
    // the % sign basically gives the remainder, so if someone jams the right arrow, the variable selected month can still calculate between 1 and 12 even if it's higher than that value
  }
  if (keyCode === LEFT_ARROW) {
    selectedMonth = (selectedMonth - 2 + 12 ) % 12 + 1
  }
  redraw()
}

// Yearly Data

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/master/us-weather-history/KNYC.csv"

let weatherTable

  // Array variables
let tempsMax = []
let tempsMin = []
  
  // Initialized Variables
let minTemp = Infinity
let maxTemp = -Infinity

// Color Variables
let r = 'red'
let b = 'blue'

function preload() {
  weatherTable = loadTable(weatherURL,'csv','header')
}

function setup() {
  createCanvas(500,500)
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
    if (maxT > maxTemp) {
      maxTemp = maxT
    }
    if (minT < minTemp) {
      minTemp = minT
    }
  }
}

function draw() {
  // Other frequently used variables
  let h = height - 50
  let d = 50
  let m = 20
  
  background(220)

  // Spacing btween points
  let dx = width / tempsMax.length
  
  // For drawing data points
  for (let i = 0; i < tempsMax.length; i++) {
    let x = (i + 1) * dx
    let yMax = map(tempsMax[i], minTemp, maxTemp, h, d) // See other variables
    let yMin = map(tempsMin[i], minTemp, maxTemp, h, d)
    
    // Draw points onto screen
      // Max
    stroke(r)
    point(x, yMax)
    
      // Min
    stroke(b)
    point(x, yMin)
    
  }
  
  // Drawing lines to connect data points
  stroke(r)
  noFill()
  beginShape()
  for (let i = 0; i < tempsMax.length; i++) {
    let x = (i + 1) * (width / tempsMax.length)
    let yMax = map(tempsMax[i], minTemp, maxTemp, h, d)
    vertex(x, yMax)
  }
  endShape()
  
  stroke(b)
  noFill()
  beginShape()
  for (let i = 0; i < tempsMin.length; i++) {
    let x = (i + 1) * (width / tempsMin.length)
    let yMax = map(tempsMin[i], minTemp, maxTemp, h, d)
    vertex(x, yMax)
  }
  endShape()
  
  // Label Max_Temp as red and Min_Temp as blue
  noStroke()
  textAlign(LEFT,CENTER)
  fill(r)
  text("Max Temp.", m, 30) // See other variables for 'm'
  fill(b)
  text("Min Temp.", m, height - 30)
}

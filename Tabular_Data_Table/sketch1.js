// Yearly Data

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/master/us-weather-history/KNYC.csv"

let weatherTable

  // Array variables
let tempsMax = []
let tempsMin = []
  
  // Initialized Variables
let minTemp = Infinity
let maxTemp = -Infinity

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
    if (maxT > maxTemp) {
      maxTemp = maxT
    }
    if (minT < minTemp) {
      minTemp = minT
    }
  }
}

function draw() {
  background(220)

  // Spacing btween points
  let dx = width / tempsMax.length
  
  // For drawing data points
  for (let i = 0; i < tempsMax.length; i++) {
    let x = (i + 1) * dx
    let yMax = map(tempsMax[i], minTemp, maxTemp, height - 50, 50)
    let yMin = map(tempsMin[i], minTemp, maxTemp, height - 50, 50)
    
    // Draw points onto screen
      // Max
    stroke("red")
    point(x, yMax)
    
      // Min
    stroke("blue")
    point(x, yMin)
    
  }
  
  // Drawing lines to connect data points
  stroke("red")
  noFill()
  beginShape()
  for (let i = 0; i < tempsMax.length; i++) {
    let x = (i + 1) * (width / tempsMax.length)
    let yMax = map(tempsMax[i], minTemp, maxTemp, height - 50, 50)
    vertex(x, yMax)
  }
  endShape()
  
  stroke("blue")
  noFill()
  beginShape()
  for (let i = 0; i < tempsMin.length; i++) {
    let x = (i + 1) * (width / tempsMin.length)
    let yMax = map(tempsMin[i], minTemp, maxTemp, height - 50, 50)
    vertex(x, yMax)
  }
  endShape()
  
  // Label Max_Temp as red and Min_Temp as blue
  noStroke()
  textAlign(LEFT,CENTER)
  fill('red')
  text("Max Temp.", 20, 30)
  fill('blue')
  text("Min Temp.", 20, height - 30)
}

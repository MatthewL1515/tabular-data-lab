// Raw Data Site: https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv

// Data Site: https://github.com/fivethirtyeight/data/blob/master/us-weather-history/KNYC.csv

const weatherURL = "https://raw.githubusercontent.com/fivethirtyeight/data/refs/heads/master/us-weather-history/KNYC.csv"

function preload() {
  weatherTable = loadTable(weatherURL,'csv','header')
}

function canvas() {
  createCanvas(400,400)
  noLoop()
}

function draw() {
  background(220)
  stroke(0)
  fill(0)
}

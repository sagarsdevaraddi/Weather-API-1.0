const { log } = require("console")
const express = require("express") 
const bodyParser = require("body-parser")


const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");


}); 

app.post("/",function(req,res){
  
  // console.log("post received")
  const query = req.body.cityName
  const apiKey = "eafc7c26f78b203abfe1a1295b7743ba"
  const unit = "metric"
  
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey
    https.get(url,function(response){
  console.log(response.statusCode)
  
  response.on("data",function(data){
    // console.log(data);
  const WeatherData = JSON.parse(data)
  //   console.log(WeatherData )  
  // const object = {
  //   name:"sagar",favouriteFood:"GobiManchurian"
  // }
  //  console.log(JSON.stringify(object)); 
  //  console.log(WeatherData.weather[0].description);
  const temp = WeatherData.main.temp
  const weatherDescription = WeatherData.weather[0].description                      //we can only have one res.send or send()
                                                            
  //  res.send(`<h1>the weather in hubli is ${weatherDescription} </h1>`)
  const icon = WeatherData.weather[0].icon
  const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
  
  res.write(`<h1>the weather in ${query} is ${weatherDescription} </h1>`)
  res.write(`<h1>the temperature in ${query} is ${temp} degree Celcius</h1>`)
  res.write("<img src="+imageURL+">")
  
  res.send()
  })
})
  })
//   // res.send("server is running...")



app.listen(3000,function(){
    console.log("server at port:3000")
}) 
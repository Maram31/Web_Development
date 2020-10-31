/* Global Variables */
let baseURL ='http://api.openweathermap.org/data/2.5/weather'
let apiKey = '276aa47c25d25d1dcbddb95e3a25d586';

let myServerURL = 'http://localhost:8000';

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getDate()+'/'+ d.getMonth()+'/'+ d.getFullYear();

//Event listner for generate button click
document.getElementById('generate').addEventListener('click', addEntry);

function addEntry(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if(zip.length == 5) {

        if(feelings.length > 0) {
            getWeather(zip)
            .then(function(data) {
                console.log(data);
                postWeather(`${myServerURL}/add`, {date: date, temperature: data.main.temp, feelings: feelings});
         
                updateUI();
            });
        }
        

        else {
            alert("Why didn't you enter how you are feeling?");
        }
    }

    else {
        alert('Please enter a valid 5 digit zip code!');
    }



}


const getWeather = async(zip) => {

    const response = await fetch(`${baseURL}?zip=${zip}&appid=${apiKey}`); // Get weather from OpenWeatherMap.org

	try {
		const data = await response.json(); // Convert response to JSON and store
        
        if( data.cod == 404 ){
            alert("City not found!");


			//return Promise.reject( data.message);

        }
        
        console.log(data);
        return data; 
    }

    catch(error) {
        console.log("error", error);
    }
};

// Async POST
const postWeather = async(url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } 
    catch(error) {
        console.log("error", error);
    }
};


//Async UPDATE UI
const updateUI = async () => {
    const request = await fetch(`${myServerURL}/all`)
    try {

        const allData = await request.json();
        console.log(allData);

        document.getElementById("date").innerHTML = "Date: " + allData[allData.length-1].date;
        document.getElementById("temp").innerHTML = "Temperature: " + allData[allData.length-1].temperature + " °C";
        document.getElementById('content').innerHTML = "Feeling: " + allData[allData.length-1].feelings;
    }
    catch(error) {
      console.log("error", error);
    }
};

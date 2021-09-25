
/* Global Variables */
const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=2b44cb3893cc4f3edeac2825bb073e8e';
let d = new Date();



/* Function to GET Web API Data*/
async function fetchAPI (apiUrl, zipCode, apiKey) {
    const apiReply = await fetch(apiUrl+zipCode+apiKey);
    try {
        const apiData = apiReply.json();
        return apiData
    } catch (err) {
        console.log(err)
    }
}
/* Function to POST data */
async function postData (url = '', data = {}) {
    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData= await response.json();
        console.log(newData);
        return newData
    } catch(err) {
        console.log(err)
    }
}
/* Function to GET Project Data */
async function updateUI () {
    const request = await fetch('/all')
    try {
        const response = await request.json();
        document.querySelector('#date').innerHTML = `<p>Date: ${response.date}</p>`;
        document.querySelector('#temp').innerHTML = `<p>Temperatuer in kelvin: ${response.temp} <br> Temperatuer in Celisius: ${response.temp - 273}</p>`;
        document.querySelector('#content').innerHTML = `<p>I feel: ${response.feelings}</p>`;
    } catch(err) {
        console.log(err)
    }
}

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', (event) => {
    const zip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    fetchAPI(apiUrl, zip, apiKey).then((response) => {
        console.log(response);
        postData('/add', {
            date: d,
            temp: response.list[0].main.temp,
            feelings: feelings
        });
        updateUI()
    })
})
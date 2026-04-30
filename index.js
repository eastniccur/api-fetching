// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Create a function, such as fetchWeatherAlerts(state), to make a GET request to the API.
// Use fetch() to retrieve weather alerts based on the state abbreviation provided by the user.
// fetch(`https://api.weather.gov/alerts/active?area=${STATE_ABBR}`)

// Parse the JSON response and log the data to the console for testing for now. We'll use this data soon.
// Handle network and API errors gracefully using catch and console.log for now.
// Step 2: Display the Alerts on the Page
// Create a function, such as displayAlerts(data), to dynamically update the DOM with weather information.
// When the fetch is successful, show:
// A summary message using the `title` property and number of alerts (under the `features` key) in the data from the API response, like:  "Current watches, warnings, and advisories for Minnesota: 11"
// A list of alert headlines, each as its own line or bullet.
// Each alert is available as an array under features, and each alert headline is available under properties.headline in the array. Feel free to use debugger wherever you have access to the data to explore how the object is formatted.
// Step 3: Clear and Reset the UI
// Each time the user fetches new data:
// Clear the input field.
// Update the weather alerts display with fresh data, removing any previous data.
// Step 4: Implement Error Handling
// When something goes wrong (e.g., empty input, bad state code, or network failure):
// Display the message in the error.
// From .catch, this can be accessed using the message key on the error object:
// .catch(errorObject => console.log(errorObject.message))

// Show the message in the dedicated <div id="error-message">.
// Ensure this div is hidden and text is cleared when the next successful request is made.
// Step 5: Optional Additional Features
// Time permitting, feel free to add additional features to improve the application. Some ideas:

// Loading Indicator: Add a loading spinner while fetching data to improve user experience.
// Error Styling: Use CSS classes to style error messages dynamically.
// Input Validation: Validate that the user input is two capital letters before making the request.
document.getElementById("fetch-alerts").addEventListener("click", () => {
    const state = document.getElementById("state-input").value;
    fetchWeatherAlerts(state);
});
function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then((response)=> response.json())
    .then((data)=>{
       displayAlerts(data);
       document.getElementById("state-input").value = "";
    })
.catch((error) => {

    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");

});
};

function displayAlerts(data){
    const alertSummary= document.getElementById("alert-summary");
    alertSummary.textContent = `${data.title}: ${data.features.length}`;
    const alertList = document.getElementById("alert-list");
    alertList.innerHTML = "";
    data.features.forEach((alert)=>{
        const listItem = document.createElement("li");
        listItem.textContent = alert.properties.headline;
        alertList.appendChild(listItem);
    });
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
};
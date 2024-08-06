// Will be used for suggestion destinations that will be picked at random
// every time the user reloads the page
// This list should get moved somewhere else in the future, but for now it's fine here
// const apiKey = process.env.GOOGLE_PLACES_KEY
const apiKey = "AIzaSyAR_HQHRhazRxBTKcab27NeXmatm01q2XQ";

const vacationDestinations = [
    "Paris, France",
    "New York City, USA",
    "Tokyo, Japan",
    "London, England",
    "Rome, Italy",
    "Barcelona, Spain",
    "Dubai, UAE",
    "Istanbul, Turkey",
    "Bangkok, Thailand",
    "Sydney, Australia",
    "Los Angeles, USA",
    "Singapore",
    "Hong Kong",
    "Las Vegas, USA",
    "Cancun, Mexico",
    "Amsterdam, Netherlands",
    "Vienna, Austria",
    "Venice, Italy",
    "Rio de Janeiro, Brazil",
    "Cape Town, South Africa",
    "Maui, Hawaii, USA",
    "Santorini, Greece",
    "Phuket, Thailand",
    "Bali, Indonesia",
    "Prague, Czech Republic",
    "San Francisco, USA",
    "Florence, Italy",
    "Berlin, Germany",
    "Madrid, Spain",
    "Cairo, Egypt",
    "Edinburgh, Scotland",
    "Buenos Aires, Argentina",
    "Seoul, South Korea",
    "Lisbon, Portugal",
    "Moscow, Russia",
    "Dublin, Ireland",
    "Marrakech, Morocco",
    "Toronto, Canada",
    "Zurich, Switzerland",
    "Vancouver, Canada",
    "Chicago, USA",
    "Athens, Greece",
    "Melbourne, Australia",
    "Miami, USA",
    "Monaco",
    "Jerusalem, Israel",
    "Budapest, Hungary",
    "Kyoto, Japan",
    "Reykjavik, Iceland",
    "Hanoi, Vietnam"
];

// Function to suggest random destinations from the vacationDestinations array
function suggestDestinations() {
    // Generate a random index within the range of vacationDestinations array length
    const randomIndex = Math.floor(Math.random() * vacationDestinations.length);
    
    // Get the random destination from the vacationDestinations array
    const randomDestination = vacationDestinations[randomIndex];
    
    // Return the random destination
    return randomDestination;
}

const suggestedDestination = suggestDestinations();
const placeName = suggestedDestination;

// Function to reload the webpage
// function reloadPage() {
//     // Call the suggestDestinations function
//     const suggestedDestination = suggestDestinations();
//     console.log("Suggested Destination:", suggestedDestination);
    
//     // Reload the webpage
//     location.reload();
// }

// Call the reloadPage function when the webpage loads
// window.onload = reloadPage;
// Example usage
console.log("Suggested Destination:", suggestedDestination);

// Function to get place details and photo refernce from Google Places API
async function getPlacePhoto() {
    const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=photos&key=${apiKey}`;
    console.log("findPlaceUrl:", findPlaceUrl);

    try {
        const response = await fetch(findPlaceUrl);
        const data = await response.json();

        console.log("Place details:", data);

        if (data.candidates && data.candidates.length > 0) {
            const photoReference = data.candidates[0].photos[0].photo_reference; //grabs the photo reference and stores it 
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
            displayPhoto(photoUrl);
        } else {
            console.error("No photo found for this place.");
        }
    } catch (error) {
        console.error("Error: feteching places details", error);
    }
}

// Function to display the photo of the place in HTML
function displayPhoto(photoUrl) {
    const photocontainer = document.getElementById("photo-container");
    const img = document.createElement("img");
    img.src = photoUrl;
    img.alt = placeName;
    photocontainer.appendChild(img);
}

// Call the function to get places photo
getPlacePhoto();


// Will be used for suggestion destinations that will be picked at random
// every time the user reloads the page
// This list should get moved somewhere else in the future, but for now it's fine here
// const apiKey = process.env.GOOGLE_PLACES_KEY
const apiKey = "AIzaSyAR_HQHRhazRxBTKcab27NeXmatm01q2XQ";

// List of vacation destinations
import { vacationDestinations } from "./destinations.js";
//console.log("Vacation Destinations 1:", vacationDestinations);

// Function to suggest random destinations from the vacationDestinations array
function suggestDestinations() {
    // Generate a random index within the range of vacationDestinations array length
    let randomIndex = Math.floor(Math.random() * vacationDestinations.length);
    
    // Get the random destination from the vacationDestinations array
    //changed to a let variable
    let randomDestination = vacationDestinations[randomIndex];
    
    // Return the random destination
    return randomDestination;
}

// let suggestedDestination = suggestDestinations();
// let placeName = suggestedDestination;
// console.log("Suggested Destination:", suggestedDestination);

//Idea: run the functions in a loop 3 times to get 3 different destinations
for(let i = 0; i < 3; i++) {
    let suggestedDestination = suggestDestinations();
    let placeName = suggestedDestination;
    console.log("Suggested Destination1:", suggestedDestination);

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
        const photocontainer = document.getElementsByClassName("photo-container")[i];
        const img = document.createElement("img");
        img.src = photoUrl;
        img.alt = placeName;
        img.style.width = "350px"; //Set the width
        img.style.height = "300px"; //Set the height
        photocontainer.appendChild(img);
    }

    //Display the destination name in the HTML element with class "place-name"
    document.getElementsByClassName("place-name")[i].textContent = placeName;

    // Call the function to get places photo
    getPlacePhoto();

}

// Function to get place details and photo refernce from Google Places API
// async function getPlacePhoto() {
//     const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=photos&key=${apiKey}`;
//     console.log("findPlaceUrl:", findPlaceUrl);

//     try {
//         const response = await fetch(findPlaceUrl);
//         const data = await response.json();

//         console.log("Place details:", data);

//         if (data.candidates && data.candidates.length > 0) {
//             const photoReference = data.candidates[0].photos[0].photo_reference; //grabs the photo reference and stores it 
//             const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
//             displayPhoto(photoUrl);
//         } else {
//             console.error("No photo found for this place.");
//         }
//     } catch (error) {
//         console.error("Error: feteching places details", error);
//     }
// }

// // Function to display the photo of the place in HTML
// function displayPhoto(photoUrl) {
//     const photocontainer0 = document.getElementsByClassName("photo-container")[0];
//     const photocontainer1 = document.getElementsByClassName("photo-container")[1];
//     const photocontainer2 = document.getElementsByClassName("photo-container")[2];
//     const img0 = document.createElement("img");
//     const img1 = document.createElement("img");
//     const img2 = document.createElement("img");

//     img0.src = photoUrl;
//     img0.alt = placeName;

//     img1.src = photoUrl;
//     img1.alt = placeName;

//     img2.src = photoUrl;
//     img2.alt = placeName;

//     photocontainer0.appendChild(img0);
//     photocontainer1.appendChild(img1);
//     photocontainer2.appendChild(img2);
// }

// // Call the function to get places photo
// getPlacePhoto();
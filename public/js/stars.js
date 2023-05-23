// Please change this constant number to modify number of stars
const NUMBER_OF_STARS = 5;

// Selecting elements from page!

// The form should contain a div with id "stars-root"
const starsRoot = document.getElementById("stars-root");

// The form should contain a number input with id "rating", and display property set to "none"
const starRating = document.getElementById("rating");
starRating.value = 0;
starRating.style.display = "none";

// The form should contain a submit button with id "review-submit"
const reviewSubmit = document.getElementById("review-submit");

const stars = [];
let clickedStar = false;

for (let i = 1; i <= NUMBER_OF_STARS; i++) {
    // Creating star
    const star = document.createElement("p");
    star.id = `star-${i}`;
    // A linked .css file should contain styling for the class "star", with font-size, color and other properties
    star.className = "star";
    star.innerHTML = "&#9734;";

    // Appending star to parent element and pushing into array
    starsRoot.appendChild(star);
    stars.push(star);
}

// Add mouse events to stars
stars.map(star => {
    // When the mouse is over a star, this star is highlighted, as well as the stars on its left
    star.addEventListener("mouseover", () => {
        // If any of the stars has already been selected, the stars will not react to the mouse movement
        if (!clickedStar) {
            // Highlight the stars
            const starIndex = stars.indexOf(star);
            for (let i = 0; i <= starIndex; i++) {
                stars[i].innerHTML = "&#9733;";
            }
        }
    });

    // When the mouse points away from the star, all of the stars revert to blank
    star.addEventListener("mouseout", () => {
        // If any of the stars has already been selected, the stars will not react to the mouse movement
        if (!clickedStar) {
            // Revert to blank stars
            for (let i = 0; i < NUMBER_OF_STARS; i++) {
                stars[i].innerHTML = "&#9734;";
            }
        }
    });
});

// Add click event to stars
stars.map(star => {
    star.addEventListener("click", () => {
        // If the star hasn't been selected yet, it will be highlighted, as well as the stars on its left.
        // If the star has been selected already, all stars will revert to blank
        if (clickedStar !== star) {
            // Current star is clicked
            clickedStar = star;
            // Set rating value to selected star number
            const starIndex = stars.indexOf(star);
            starRating.value = (starIndex + 1).toString();
            // Highlight stars
            for (let i = 0; i < NUMBER_OF_STARS; i++) {
                if (i <= starIndex) {
                    stars[i].innerHTML = "&#9733;";
                } else {
                    stars[i].innerHTML = "&#9734;";
                }
            }
        } else {
            // No star is clicked
            clickedStar = false;
            // Rating has no value
            starRating.value = "0";
            // Revert to blank stars
            for (let i = 0; i < NUMBER_OF_STARS; i++) {
                stars[i].innerHTML = "&#9734;";
            }
        }
    })
});

// Submit button event
reviewSubmit.addEventListener("click", (e) => {
    if (starRating.value === "0") {
        e.preventDefault();
        alert(`Please enter a rating from 1 to ${NUMBER_OF_STARS}!`);
    }
});
// Select stars on page
const star1 = document.getElementById("star-1");
const star2 = document.getElementById("star-2");
const star3 = document.getElementById("star-3");
const star4 = document.getElementById("star-4");
const star5 = document.getElementById("star-5");

// Select rating from form
const starRating = document.getElementById("rating");
const reviewSubmit = document.getElementById("review-submit");

// Stars are not clicked
let star1Clicked = false;
let star2Clicked = false;
let star3Clicked = false;
let star4Clicked = false;
let star5Clicked = false;

// Star 1 mouse events
const star1Mouseover = () => {
    star1.innerHTML = "&#9733;";
}

const star1Mouseout = () => {
    star1.innerHTML = "&#9734;";
}

// Star 2 mouse events
const star2Mouseover = () => {
    star1.innerHTML = "&#9733;";
    star2.innerHTML = "&#9733;";
}

const star2Mouseout = () => {
    star1.innerHTML = "&#9734;";
    star2.innerHTML = "&#9734;";
}

// Star 3 mouse events
const star3Mouseover = () => {
    star1.innerHTML = "&#9733;";
    star2.innerHTML = "&#9733;";
    star3.innerHTML = "&#9733;";
}

const star3Mouseout = () => {
    star1.innerHTML = "&#9734;";
    star2.innerHTML = "&#9734;";
    star3.innerHTML = "&#9734;";
}

// Star 4 mouse events
const star4Mouseover = () => {
    star1.innerHTML = "&#9733;";
    star2.innerHTML = "&#9733;";
    star3.innerHTML = "&#9733;";
    star4.innerHTML = "&#9733;";
}

const star4Mouseout = () => {
    star1.innerHTML = "&#9734;";
    star2.innerHTML = "&#9734;";
    star3.innerHTML = "&#9734;";
    star4.innerHTML = "&#9734;";
}

// Star 5 mouse events
const star5Mouseover = () => {
    star1.innerHTML = "&#9733;";
    star2.innerHTML = "&#9733;";
    star3.innerHTML = "&#9733;";
    star4.innerHTML = "&#9733;";
    star5.innerHTML = "&#9733;";
}

const star5Mouseout = () => {
    star1.innerHTML = "&#9734;";
    star2.innerHTML = "&#9734;";
    star3.innerHTML = "&#9734;";
    star4.innerHTML = "&#9734;";
    star5.innerHTML = "&#9734;";
}

const starAddMouseEvent = () => {
    star1.addEventListener("mouseover", star1Mouseover);
    star1.addEventListener("mouseout", star1Mouseout);

    star2.addEventListener("mouseover", star2Mouseover);
    star2.addEventListener("mouseout", star2Mouseout);

    star3.addEventListener("mouseover", star3Mouseover);
    star3.addEventListener("mouseout", star3Mouseout);

    star4.addEventListener("mouseover", star4Mouseover);
    star4.addEventListener("mouseout", star4Mouseout);

    star5.addEventListener("mouseover", star5Mouseover);
    star5.addEventListener("mouseout", star5Mouseout);
}

const starRemoveMouseEvent = () => {
    star1.removeEventListener("mouseover", star1Mouseover);
    star1.removeEventListener("mouseout", star1Mouseout);

    star2.removeEventListener("mouseover", star2Mouseover);
    star2.removeEventListener("mouseout", star2Mouseout);

    star3.removeEventListener("mouseover", star3Mouseover);
    star3.removeEventListener("mouseout", star3Mouseout);

    star4.removeEventListener("mouseover", star4Mouseover);
    star4.removeEventListener("mouseout", star4Mouseout);

    star5.removeEventListener("mouseover", star5Mouseover);
    star5.removeEventListener("mouseout", star5Mouseout);
}

starAddMouseEvent();

// Star 1 click event
star1.addEventListener("click", () => {
    if (!star1Clicked) {
        starRemoveMouseEvent();
        star1Clicked = true
        star1.innerHTML = "&#9733;";
        star2.innerHTML = "&#9734;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = 1;
    } else {
        starAddMouseEvent();
        star1Clicked = false
        star1.innerHTML = "&#9734;";
        star2.innerHTML = "&#9734;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = undefined;
    }
})

// Star 2 click event
star2.addEventListener("click", () => {
    if (!star2Clicked) {
        starRemoveMouseEvent();
        star2Clicked = true
        star1.innerHTML = "&#9733;";
        star2.innerHTML = "&#9733;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = 2;
    } else {
        starAddMouseEvent();
        star2Clicked = false
        star1.innerHTML = "&#9734;";
        star2.innerHTML = "&#9734;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = undefined;
    }
})

// Star 3 click event
star3.addEventListener("click", () => {
    if (!star3Clicked) {
        starRemoveMouseEvent();
        star3Clicked = true
        star1.innerHTML = "&#9733;";
        star2.innerHTML = "&#9733;";
        star3.innerHTML = "&#9733;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = 3;
    } else {
        starAddMouseEvent();
        star3Clicked = false
        star1.innerHTML = "&#9734;";
        star2.innerHTML = "&#9734;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = undefined;
    }
})

// Star 4 click event
star4.addEventListener("click", () => {
    if (!star4Clicked) {
        starRemoveMouseEvent();
        star4Clicked = true
        star1.innerHTML = "&#9733;";
        star2.innerHTML = "&#9733;";
        star3.innerHTML = "&#9733;";
        star4.innerHTML = "&#9733;";
        star5.innerHTML = "&#9734;";
        starRating.value = 4;
    } else {
        starAddMouseEvent();
        star4Clicked = false
        star1.innerHTML = "&#9734;";
        star2.innerHTML = "&#9734;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = undefined;
    }
})

// Star 5 click event
star5.addEventListener("click", () => {
    if (!star5Clicked) {
        starRemoveMouseEvent();
        star5Clicked = true
        star1.innerHTML = "&#9733;";
        star2.innerHTML = "&#9733;";
        star3.innerHTML = "&#9733;";
        star4.innerHTML = "&#9733;";
        star5.innerHTML = "&#9733;";
        starRating.value = 5;
    } else {
        starAddMouseEvent();
        star5Clicked = false
        star1.innerHTML = "&#9734;";
        star2.innerHTML = "&#9734;";
        star3.innerHTML = "&#9734;";
        star4.innerHTML = "&#9734;";
        star5.innerHTML = "&#9734;";
        starRating.value = undefined;
    }
})

// Submit button event
reviewSubmit.addEventListener("click", (e) => {
    if (!starRating.value) {
        alert("Please enter a rating from 1 to 5!");
    }
})
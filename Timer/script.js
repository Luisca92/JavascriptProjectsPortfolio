const currentDate = new Date();
console.log(currentDate); // This logs the current data and time to the console. 

const targetDate = new Date('2024-12-31T23:59:59');
console.log(targetDate); // This logs the current data and time to the console. 

// To make our countdown work, we need to calculate the difference between the current date and the target date. 
const difference = targetDate - currentDate;
console.log(difference)

// To make our countdown update in real-time, we'll use setInterval to call our updateCountdown function every second:
const interval = setInterval(updateCountdown, 1000);

// setInterval() is a JavaScript function that calls a function or executes a code snippet repeatedly, 
// with a fixed time delay between each call. 
// Here, it's set to call updateCountdown every 1000 milliseconds (which is 1 second).
// interval is a variable that stores the interval ID, which we can use to stop the interval later if needed.


// We'll create a function that updates the countdown every second, bringing us closer to our target event. 
// Let's dive into the heart of our project.

// Inside your script.js file, we're going to write a function named updateCountdown. 
// This function will calculate the time remaining and update our HTML elements accordingly:

function updateCountdown() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (difference < 0) {
        clearInterval(interval);
        document.getElementById("timer").innerText = "The Event Has Started!"
    }
}

// Here's what's happening in this function:

//     We calculate the difference between the targetDate and currentTime.
//     We then break down this difference into days, hours, minutes, and seconds.
//     Each time unit is calculated by dividing the difference by the number of milliseconds in that unit.
//     Math.floor() is used to round down to the nearest whole number.
//     Finally, we update the HTML elements with these calculated values.


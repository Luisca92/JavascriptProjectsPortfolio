const keys = document.querySelectorAll('.key')  
// The dot (.) is used to select elements by class name in CSS selectors.

// In this function, we’re:

// Listening for the keydown event on the entire window.
// Using the event.key property to find the corresponding div and its associated audio element based on the data-key 
// attribute that matches the uppercase version of event.key
// Playing the audio and adding a visual effect to the pressed key.
// Using setTimeout to remove the visual effect after a short duration.

// To organize our code better, let's encapsulate the sound-playing logic into a function:

function playSound(key) {
    const audio = document.querySelector(`audio[data-key="${key.toUpperCase()}"]`);
    const keyElement = document.querySelector(`.key[data-key="${key.toUpperCase()}"]`)
    if (!audio) return; 

    keyElement.classList.add('active');
    audio.currentTime = 0;
    audio.play()

    setTimeout(() => {
        keyElement.classList.remove('active');
    }, 100);
}

// Now, modify the event listener to use this function:
window.addEventListener('keydown', function(event) {
    playSound(event.key);
})

// With the keyboard functionality in place, let's enhance the interactivity of our Drum Kit by adding the ability 
// to play drum sounds through mouse clicks as well. 

// This will make our app more versatile and user-friendly, especially for users who prefer using a mouse 
// or are on touch devices.

// In this code snippet, we're:

// Iterating over each drum key using forEach.
// Adding a click event listener to each key.
// On click, retrieving the data-key attribute of the clicked element to identify the corresponding sound.
// Calling the playSound function with the appropriate keyAttribute.

keys.forEach(key => {
    key.addEventListener('click', function() {
        const keyAttribute = this.getAttribute('data-key');
        playSound(keyAttribute);
    });
});

// It's also important to ensure that the drum kit is fully functional with touch interactions for users on touchscreen devices:

keys.forEach(key => {
  key.addEventListener('touchstart', function(e) {
      e.preventDefault(); // Prevent the default touch behavior, like scrolling
      const keyAttribute = this.getAttribute('data-key');
      playSound(keyAttribute);
  });
});
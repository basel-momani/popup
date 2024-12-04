






// Get references to elements
const popup = document.getElementById('popup');
const acceptButton = document.getElementById('accept-button');
const counter = document.getElementById('counter');

// Initial state
let currentSlide = 0;

// Check if 'popupAccepted' is in localStorage to decide whether to show the popup
function shouldShowPopup() {
  return !localStorage.getItem('popupAccepted');
}

// Function to show the popup
function showPopup() {
  document.body.classList.add('overlay-active');
  updateSlide(); // Initialize the first slide and counter
}

// Function to update slides and counter
function updateSlide() {
  const slideElements = document.querySelectorAll('.slide'); // Get all slide elements (Renamed to slideElements)

  // Show the current slide, hide others
  slideElements.forEach((slide, index) => {
    slide.style.display = index === currentSlide ? 'block' : 'none';
  });

  // Update the counter text
  counter.textContent = `${currentSlide + 1}/${slideElements.length}`;

  // Update button text based on the current slide
  if (currentSlide === slideElements.length - 1) {
    acceptButton.textContent = 'موافق'; // Last slide: "Accept"
  } else {
    acceptButton.textContent = 'التالي'; // Other slides: "Next"
  }
}

// Event listener for the accept button
acceptButton.addEventListener('click', () => {
  const slideElements = document.querySelectorAll('.slide'); // Ensure you're getting slideElements again

  if (currentSlide < slideElements.length - 1) {
    // Move to the next slide
    currentSlide++;
    updateSlide();
  } else {
    // Last slide: Close popup and save acceptance in localStorage
    document.body.classList.remove('overlay-active');
    localStorage.setItem('popupAccepted', 'true'); // Mark popup as accepted
  }
});

// Show the popup only if needed on page load
window.onload = function () {
  if (shouldShowPopup()) {
    showPopup();
  }
};

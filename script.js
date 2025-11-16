// ============================
// GLOBAL PET OBJECT
// ============================

let pet_info = {
  name: "",
  weight: 10,         // starting weight
  happiness: 5,
  mood: "Neutral 😐"
};

const startingWeight = pet_info.weight;  // store initial weight

// ============================
// HELPER FUNCTIONS
// ============================

// Show pet message in thought bubble
function showPetMessage(text) {
  $(".pet-message")
    .stop(true)
    .hide()
    .text(text)
    .show();

  setTimeout(function() {
    $(".pet-message").hide();
  }, 5000); // 5 seconds
}

// Play a sound effect
function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

// Check if weight is half or less of starting weight
function checkWeightAlert() {
  if (pet_info.weight <= startingWeight / 2) {
    pet_info.mood = "HUNGRY!!! 😫"; // override mood
    pet_info.happiness = 1;         // lock happiness to 1
    checkAndUpdatePetInfoInHtml();  // update dashboard

    showPetMessage("I really need to eat!");
    playSound("sounds/crying.wav");
    return true; // alert triggered
  }
  return false; // alert not triggered
}

// Prevent weight or happiness from dropping below zero
function preventNegativeValues() {
  if (pet_info.weight < 0) pet_info.weight = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;
}

// Update HTML dashboard
function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
  $(".mood").text(pet_info.mood);
}

// Combines check and update
function checkAndUpdatePetInfoInHtml() {
  preventNegativeValues();
  updatePetInfoInHtml();
}

// ============================
// BUTTON FUNCTIONS
// ============================

// Treat button
function clickedTreatButton() {
  pet_info.weight += 1;

  if (pet_info.weight > startingWeight / 2) {
    pet_info.happiness += 2;
    pet_info.mood = "Happy 😄";
  }

  checkAndUpdatePetInfoInHtml();
  playSound("sounds/barks.wav");

  if (!checkWeightAlert()) {
    showPetMessage("Yum! That treat was delicious!");
  }
}

// Play button
function clickedPlayButton() {
  pet_info.weight -= 1;

  if (pet_info.weight > startingWeight / 2) {
    pet_info.happiness += 3;
    pet_info.mood = "Content 😎";
  }

  checkAndUpdatePetInfoInHtml();
  playSound("sounds/playing.wav");

  if (!checkWeightAlert()) {
    showPetMessage("That was fun! Let's play again!");
  }
}

// Exercise button
function clickedExerciseButton() {
  pet_info.weight -= 2;

  if (pet_info.weight > startingWeight / 2) {
    pet_info.happiness -= 2;
    pet_info.mood = "Tired 😴";
  }

  checkAndUpdatePetInfoInHtml();
  playSound("sounds/exercise.wav");

  if (!checkWeightAlert()) {
    showPetMessage("Phew! That was a hard workout.");
  }
}

// Cuddle button
function clickedCuddleButton() {
  if (pet_info.weight > startingWeight / 2) {
    pet_info.happiness += 4;
    pet_info.mood = "Loved ❤️";
  }

  checkAndUpdatePetInfoInHtml();
  playSound("sounds/howl.wav");

  if (!checkWeightAlert()) {
    showPetMessage("Aww... I love cuddles!");
  }
}

// ============================
// DOCUMENT READY
// ============================

$(function() {
  // Show overlay initially
  $(".name-overlay").show();

    // Start Game button
    $("#start-game-button").click(function () {
        const enteredName = $("#pet-name-input").val().trim();
        if (enteredName === "") {
            alert("Please enter a name for your pet!");
            return;
        }

        pet_info.name = enteredName;
        checkAndUpdatePetInfoInHtml();

        // Update the page title dynamically
        document.title = `Your Giga Pet ${enteredName}`;

        // Update header text
        $("#pet-title").text(`This is your Giga Pet ${enteredName}`);

        $(".name-overlay").fadeOut(500);
    });

  // Button click events
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".cuddle-button").click(clickedCuddleButton);
});

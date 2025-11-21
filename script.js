// ============================
// GLOBAL PET OBJECT
// ============================

let pet_info = {
    name: "",
    weight: 14,         // starting weight
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
        .stop(true)      // Stops any ongoing or queued animations on this element.
        // Ensures that if a previous message is still fading in/out, it is immediately stopped.
        // Prevents multiple messages from overlapping or queuing up.
        .hide()          // **.hide()**: immediately hides the element (sets display:none).
        // Clears any previous message so the new message can appear cleanly.
        .text(text)      // Updates the content of the element to the new message passed as 'text'.
        .show();         // **.show()**: immediately shows the element (restores display property).
    // Makes the new message visible to the user.

    // Automatically hide the message after 5 seconds
    setTimeout(function () {
        $(".pet-message").hide(); // Hides the message again after 5000 milliseconds (5 seconds)
    }, 5000);
}


// Play a sound effect
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// Check if weight is half or less of starting weight. This is an added feature that
// will override the mood and happiness of the animal until overall weight is >half its
// original weight.

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
    // Wrap pet name in quotes everywhere
    const quotedName = `"${pet_info.name}"`;
    $(".name").text(quotedName);
    $(".weight").text(pet_info.weight);
    $(".happiness").text(pet_info.happiness);
    $(".mood").text(pet_info.mood);

    // Update header and page title dynamically as well
    $("#pet-title").text(`This is your Giga Pet ${quotedName}`);
    document.title = `Your Giga Pet ${quotedName}`;
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
        showPetMessage("Aww... I love cuddles!!!");
    }
}

// ============================
// DOCUMENT READY
// ============================

$(function () {
    // Show overlay initially
    $(".name-overlay").show();

    // Start Game button
    $("#start-game-button").click(function () {
        const enteredName = $("#pet-name-input").val().trim();
        if (enteredName === "") {
            alert("Please enter a name for your pet!");
            return;
        }

        // Save name without quotes in object, quotes added in display
        pet_info.name = enteredName;
        checkAndUpdatePetInfoInHtml();

        // Hide overlay
        $(".name-overlay").fadeOut(1000);
    });

    // Button click events
    $(".treat-button").click(clickedTreatButton);
    $(".play-button").click(clickedPlayButton);
    $(".exercise-button").click(clickedExerciseButton);
    $(".cuddle-button").click(clickedCuddleButton);
});


 // MOOD CHECK-IN

const moodButtons = document.querySelectorAll(".mood-btn");
const saveMood = document.getElementById("saveMood");

moodButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        moodButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    });
});

if (saveMood) {
    saveMood.addEventListener("click", function(event) {
        event.preventDefault();

        const selectedMood = document.querySelector(".mood-btn.active");

        if (!selectedMood) {
            alert("Please select a mood first.");
            return;
        }

        alert("Your check-in has been saved successfully!");
    });
}

const saveLetter = document.getElementById("saveLetter");

if (saveLetter) {
    saveLetter.addEventListener("click", function() {
        const recipient = document.getElementById("letterTo").value.trim();
        const title = document.getElementById("letterTitle").value.trim();
        const content = document.getElementById("letterContent").value.trim();

        if (!content) {
            alert("Please write something in your letter first.");
            return;
        }

        const letter = {
            id: Date.now(),
            recipient: recipient || "Someone",
            title: title || "Untitled Letter",
            content: content,
            date: new Date().toLocaleDateString()
        };

        const letters = JSON.parse(localStorage.getItem("letters")) || [];

        letters.push(letter);
        localStorage.setItem("letters", JSON.stringify(letters));

        alert("Your letter has been saved!");

        document.getElementById("letterTo").value = "";
        document.getElementById("letterTitle").value = "";
        document.getElementById("letterContent").value = "";
    });
}
const reminderCategory = document.getElementById("reminderCategory");
const reminderTitle = document.getElementById("reminderTitle");
const reminderQuote = document.getElementById("reminderQuote");
const anotherReminder = document.getElementById("anotherReminder");
const categoryButtons = document.querySelectorAll(".category-btn");

const reminders = {
    "Positive Mindset": [
        {
            title: "You are allowed to begin again.",
            quote: "You don't need to have everything figured out today. Take your time. You are still growing."
        },
        {
            title: "Small steps still count.",
            quote: "You don't have to change your whole life overnight. One small step forward is enough for today."
        },
        {
            title: "Your story is still unfolding.",
            quote: "A difficult chapter does not mean your story will have a difficult ending."
        },
        {
            title: "Give tomorrow a chance.",
            quote: "You never know what beautiful things can happen when you give yourself another day."
        }
    ],

    "Self-Love": [
        {
            title: "You deserve the love you give others.",
            quote: "Be as gentle with yourself as you are with the people you care about."
        },
        {
            title: "You are enough, even on quiet days.",
            quote: "Your worth is not measured by how much you achieve or how useful you are to others."
        },
        {
            title: "Choose yourself, too.",
            quote: "Your needs matter. Making room for yourself is not selfish."
        }
    ],

    "Healing": [
        {
            title: "Healing takes the time it takes.",
            quote: "Some days will feel lighter than others. That doesn't mean you have lost your progress."
        },
        {
            title: "You can miss something and still move forward.",
            quote: "Something can have mattered deeply without needing to remain part of your future."
        },
        {
            title: "You don't have to be okay all the time.",
            quote: "Give your feelings room to exist. You don't need to rush your healing."
        }
    ],

    "Motivation": [
        {
            title: "Start exactly where you are.",
            quote: "You don't need perfect timing or a perfect plan. Begin with what you have today."
        },
        {
            title: "Your effort matters.",
            quote: "Even when progress feels slow, every small action can bring you closer to where you want to be."
        },
        {
            title: "Believe in the person you are becoming.",
            quote: "Keep making choices that move you toward a life that feels meaningful to you."
        }
    ]
};

let currentCategory = "Positive Mindset";
let previousReminderIndex = -1;

function showReminder(category, avoidRepeat = true) {
    if (!reminderTitle || !reminderQuote || !reminderCategory) {
        return;
    }

    const options = reminders[category];

    if (!options || options.length === 0) {
        return;
    }

    let index = Math.floor(Math.random() * options.length);

    if (avoidRepeat && options.length > 1) {
        while (index === previousReminderIndex) {
            index = Math.floor(Math.random() * options.length);
        }
    }

    previousReminderIndex = index;

    reminderCategory.textContent = category.toUpperCase();
    reminderTitle.textContent = options[index].title;
    reminderQuote.textContent = options[index].quote;
}

categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentCategory = button.dataset.category;

        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        previousReminderIndex = -1;

        showReminder(currentCategory, false);
    });
});

if (anotherReminder) {
    anotherReminder.addEventListener("click", function() {
        showReminder(currentCategory, true);
    });
}

showReminder(currentCategory, false);


// =====================================
// RECENTLY SAVED LETTERS ON HOME PAGE
// =====================================

const recentLetters = document.getElementById("recentLetters");

function displayRecentLetters() {
    if (!recentLetters) {
        return;
    }

    recentLetters.replaceChildren();

    let letters = [];

    try {
        letters = JSON.parse(localStorage.getItem("letters")) || [];
    } catch (error) {
        console.error("Could not load saved letters:", error);
    }

    if (!Array.isArray(letters) || letters.length === 0) {
        const column = document.createElement("div");
        column.className = "col-12";

        const message = document.createElement("div");
        message.className = "empty-letters";
        message.textContent =
            "Your saved letters will appear here when you write one.";

        column.appendChild(message);
        recentLetters.appendChild(column);
        return;
    }

    letters.slice(-3).reverse().forEach(function(letter) {
        const column = document.createElement("div");
        column.className = "col-12 col-md-4";

        const card = document.createElement("div");
        card.className = "recent-letter-card";

        const heading = document.createElement("h3");
        heading.textContent = letter.title || "Untitled Letter";

        const preview = document.createElement("p");
        const content = letter.content || "";

        preview.textContent = content.length > 120
            ? content.substring(0, 120) + "..."
            : content;

        const date = document.createElement("small");
        date.className = "d-block mt-3";
        date.textContent = letter.date || "";

        card.appendChild(heading);
        card.appendChild(preview);
        card.appendChild(date);

        column.appendChild(card);
        recentLetters.appendChild(column);
    });
}
displayRecentLetters();
const journalForm = document.getElementById("journalForm");

if (journalForm) {
    journalForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Your journal entry has been saved!");
    });
}

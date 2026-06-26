// Change the password here if you ever want a different date.
const correctPassword = "0328";
let typedPassword = "";

const lockScreen = document.getElementById("lock-screen");
const app = document.getElementById("app");
const dots = Array.from(document.querySelectorAll("#dots span"));
const message = document.getElementById("message");

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("filled", index < typedPassword.length);
  });
}

function resetPassword(text = "Password hint: MMDD", isError = false) {
  typedPassword = "";
  updateDots();
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function unlockSite() {
  lockScreen.classList.add("hidden");
  app.classList.remove("hidden");
  showPage("home");
}

function handleNumberPress(number) {
  if (typedPassword.length >= 4) return;

  typedPassword += number;
  updateDots();

  if (typedPassword.length === 4) {
    if (typedPassword === correctPassword) {
      message.textContent = "Unlocked ♡";
      setTimeout(unlockSite, 350);
    } else {
      setTimeout(() => resetPassword("Wrong password — try again", true), 250);
    }
  }
}

document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => handleNumberPress(button.dataset.number));
});

document.getElementById("clear").addEventListener("click", () => resetPassword());

document.getElementById("delete").addEventListener("click", () => {
  typedPassword = typedPassword.slice(0, -1);
  updateDots();
});

// Allows keyboard typing too.
document.addEventListener("keydown", (event) => {
  if (app.classList.contains("hidden")) {
    if (/^[0-9]$/.test(event.key)) handleNumberPress(event.key);
    if (event.key === "Backspace") {
      typedPassword = typedPassword.slice(0, -1);
      updateDots();
    }
    if (event.key === "Escape") resetPassword();
  }
});

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});


document.getElementById("lock-button").addEventListener("click", () => {
  app.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  resetPassword();
});

// Replace these songs with your own Spotify links.
// To get a Spotify link: open the song > Share > Copy Song Link.


// Makes missing photo files look intentional instead of broken.
document.querySelectorAll(".photo-grid img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "grid";
    img.style.placeItems = "center";
    img.alt = "Add your photo here";
    img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop stop-color="#ead9ff"/>
            <stop offset="1" stop-color="#9b5de5"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#g)"/>
        <text x="400" y="388" text-anchor="middle" font-family="Arial" font-size="44" fill="#4c2675">Add Photo</text>
        <text x="400" y="448" text-anchor="middle" font-family="Arial" font-size="26" fill="#73558f">assets/photo.jpg</text>
      </svg>
    `);
  });
});

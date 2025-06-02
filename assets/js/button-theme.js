const toggleBtn = document.getElementById("button-theme");

function updateIcon(isLight) {
  const icon = toggleBtn.querySelector("i");

  if (isLight) {
    icon.className = "bi bi-moon";
    toggleBtn.onmouseover = () => icon.className = "bi bi-moon-fill";
    toggleBtn.onmouseout = () => icon.className = "bi bi-moon";
  } else {
    icon.className = "bi bi-sun";
    toggleBtn.onmouseover = () => icon.className = "bi bi-sun-fill";
    toggleBtn.onmouseout = () => icon.className = "bi bi-sun";
  }
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  updateIcon(isLight);
});

window.addEventListener("DOMContentLoaded", () => {
  const isLight = document.body.classList.contains("light-mode");
  updateIcon(isLight);
});
window.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (isLoggedIn) {
    document.getElementById("btn-login").classList.add("hidden");
    document.getElementById("btn-signin").classList.add("hidden");
    document.getElementById("btn-logout").classList.remove("hidden");
  }

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
});

const toEventsPage = document.getElementById("page-switcher");

if (toEventsPage) {
  toEventsPage.addEventListener("click", () => {
    window.location.pathname = "./events.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((el) => {
      el.style.display = "none";
    });
    tabs.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabContent[i].style = "block";
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  headerParents.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      tabs.forEach((el, index) => {
        if (event.target == el) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
});

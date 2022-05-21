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

  //MODAL

  const allModalBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelectorAll("[data-close]");
  allModalBtn.forEach((el) => {
    el.addEventListener("click", () => {
      openModal();
    });
  });
  modalClose.forEach((el) => {
    el.addEventListener("click", () => {
      hideModal();
    });
  });

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }
  function hideModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      hideModal();
    }
  });
  const modalTimer = setTimeout(() => openModal(), 5000);

  const showMyModalByScroll = function () {
    if (
      window.scrollY + document.documentElement.clientHeight ==
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  };
  window.addEventListener("scroll", showMyModalByScroll);
});

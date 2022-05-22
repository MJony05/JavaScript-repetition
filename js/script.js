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

  // DATA
  const deadline = "2022-6-22";
  const getTime = function (endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total: total,
      days: days,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
    };
  };

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      minutes = timer.querySelector("#minutes"),
      hours = timer.querySelector("#hours"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock(params) {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      seconds.innerHTML = getZero(time.seconds);
      minutes.innerHTML = getZero(time.minutes);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total");
  let slideIndex = 1;
  show(slideIndex);
  function show(j = 1) {
    if (j > slides.length) {
      slideIndex = 1;
    }
    if (j < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((item) => {
      item.style.display = "none";
    });
    slides[slideIndex - 1].style.display = "block";
    if (slides.length < 10) {
      current.textContent = "0" + slideIndex;
    } else {
      current.textContent = slideIndex;
    }
  }
  function sliderPlus(i) {
    show((slideIndex += i));
  }

  next.addEventListener("click", () => {
    sliderPlus(1);
  });

  prev.addEventListener("click", () => {
    sliderPlus(-1);
  });
});

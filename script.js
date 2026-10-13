$(window).on("load", function () {
  $(".page-loader").fadeOut(350);
});

$(document).ready(function () {
  $("#year").text(new Date().getFullYear());

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    $("body").addClass("dark");
    $(".theme-toggle").text("☀");
  }

  $(".theme-toggle").on("click", function () {
    $("body").toggleClass("dark");
    const dark = $("body").hasClass("dark");
    $(this).text(dark ? "☀" : "☾");
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  $(".menu-toggle").on("click", function () {
    $(".nav-links").toggleClass("open");
    const isOpen = $(".nav-links").hasClass("open");
    $(this).attr("aria-expanded", isOpen);
  });

  $(".nav-links a").on("click", function () {
    $(".nav-links").removeClass("open");
  });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el) => revealObserver.observe(el));

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 350) {
      $("#backToTop").fadeIn(200);
    } else {
      $("#backToTop").fadeOut(200);
    }
  });

  $("#backToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  $(".counter").each(function () {
    const element = this;
    const target = Number($(element).data("target"));
    let started = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 35));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            $(element).text(current);
          }, 28);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    $(".error").text("");
    $("input, textarea").removeClass("input-error");
    $("#successMessage").hide();

    let valid = true;

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const subject = $("#subject").val().trim();
    const message = $("#message").val().trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(selector, messageText) {
      $(selector).addClass("input-error");
      $(selector).siblings(".error").text(messageText);
      valid = false;
    }

    if (name.length < 2) showError("#name", "Please enter your name.");
    if (!emailPattern.test(email)) showError("#email", "Enter a valid email address.");
    if (subject.length < 3) showError("#subject", "Please enter a subject.");
    if (message.length < 10) showError("#message", "Message should contain at least 10 characters.");

    if (valid) {
      $("#successMessage").fadeIn(250);
      this.reset();
    }
  });
});

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
    if (timers[uniqueId]) { clearTimeout(timers[uniqueId]); }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function setActiveMenuItem() {
  $("nav li a").removeClass("active");

  // Get visible section
  var scrollTop = $(document).scrollTop();
  if (scrollTop <= $("section.home").offset().top || scrollTop == 0)
    $("#home").addClass("active");
  else if (scrollTop <= $("section.services").offset().top)
    $("#services").addClass("active");
  else if (scrollTop <= $("section.process").offset().top)
    $("#process").addClass("active");
  else if (scrollTop <= $("section.brands").offset().top)
    $("#brands").addClass("active");
  else if (scrollTop <= $("section.pitch").offset().top)
    $("#pitch").addClass("active");
  else if (scrollTop <= $("section.contact").offset().top)
    $("#contact").addClass("active");
  else if (scrollTop <= $("section.career").offset().top)
    $("#career").addClass("active");
}
function closePopup() {
  $("body").removeClass("reading-more");
  setTimeout(
    $('.read-more-window-content').html(''), 250);
  return false;
}
function scrollToAnchor(aid) {
  console.log(aid);
  var aTag = $("a[name='" + aid + "']");
  var navHeight = $("nav").height() - 1;
  $('html,body').animate({ scrollTop: aTag.offset().top - navHeight }, 500);
}
function closeNavMenu() {
  $("nav button.hamburger").removeClass("is-active");
  $("body").removeClass("nav-menu-open");
}
function openContactFromPopup() {
    console.log('clicked');
    closePopup();
    scrollToAnchor("contact");
    return false;
}
function init() {
  setActiveMenuItem();
  $("nav li a").each(function () {
    $(this).attr("id", $(this).data("name"));
  });
  $(".read-more").on("click", function () {
    var text = $(this).next('.read-more-content').html();
    $('.read-more-window-content').html(text);
    $("body").addClass("reading-more");
    return false;
  });
  $(".close").on("click", function () {
    closePopup();
  });
  $(window).on("resize", function () {
    closeNavMenu();
  });
  $("nav a").on("click", function (event) {
    event.preventDefault();
    $("nav li a").removeClass("active");
    $(this).addClass("active");
    var name = $(this).data("name");
    scrollToAnchor(name);
    closeNavMenu();
  });

  $(window).on("scroll", function () {
    waitForFinalEvent(function () {
      setActiveMenuItem();
    }, 50, 'navscroll');
  });
  $(document).on('keyup', function (e) {
    if (e.key == "Escape") {
      closeNavMenu();
      closePopup();
    }
  });
}
$(document).ready(function () {
  init();
  var navburger = $("nav button.hamburger");
  navburger.on('click', function () {
    navburger.toggleClass("is-active");
    if (navburger.hasClass("is-active"))
      $("body").addClass("nav-menu-open");
    else
      $("body").removeClass("nav-menu-open");

  });
});

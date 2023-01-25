
(function() {

  let overlay = document.querySelector('.overlayContainer'),
      largeImage = document.querySelector('.largeImage');

  const hideOverlay = () => {
    overlay.removeEventListener('click', hideOverlay, false);
    overlay.classList.remove('opacity');

    setTimeout(function() {
      largeImage.removeAttribute('src');
      largeImage.removeAttribute('alt');
      overlay.classList.remove('display');
    }, 400);
  }

function lightbox(event) {
    const caption = document.querySelector('.imageCaption');
    let href, alt;

    event.preventDefault();
    href = this.getAttribute('href');
    alt = this.children[0].getAttribute('alt');

    largeImage.setAttribute('src', href);
    largeImage.setAttribute('alt', alt);
    caption.innerHTML = alt;
    overlay.classList.add('display');

    setTimeout(function() { overlay.classList.add('opacity'); }, 25);
    setTimeout(function() { overlay.addEventListener('click', hideOverlay, false); }, 400);
  }

  /********************************* Event Listener ********************************/

  const runCode = () => {
    const image = document.querySelectorAll('.imageLink');
    if ( image ) {
      for ( var i = 0; i < image.length; i++ ) {
        image[i].addEventListener('click', lightbox, false);
      }
    }
  }
  runCode();
})();

/****************************** FILTER **********************************************/

var filter_link = $('#filter'),
    gallery_item = $('.tumb'),
    gallery_img = $('.tumb > img');

filter_link.on('change',function(){
  // find same class of menu
  var filterVal = $(this).val();

  // console.log (filterVal);
  if(filterVal == 'all') {
    // Each all and filter values
    gallery_item.each(function() {
        var self = $(this);
        self.removeClass('hidden-me-full');
        var wait  = setTimeout(function(){
           self.removeClass('hidden-me');
          clearTimeout(wait);
       },500);
    });
  }else{
    // Each all and filter values
    gallery_item.each(function() {
       var self = $(this);
       console.log('llega');
      // Hide
      if(!self.hasClass(filterVal)) {
        console.log('llega2');
        self.addClass('hidden-me');
        var wait  = setTimeout(function(){
          console.log('and now');
           self.addClass('hidden-me-full');
          clearTimeout(wait);
        },500);
      }else{
        self.removeClass('hidden-me-full');
        var wait  = setTimeout(function(){
           self.removeClass('hidden-me');
          clearTimeout(wait);
       },500);
      }
    });
  }
  return false;
});
/******************************** LAZY LOAD *************************************************/
/* ---------- Lazy loading images starts ---------- */
if (typeof Array.prototype.forEach != 'function') {
  Array.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback.apply(this, [this[i], i, this]);
    }
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages = document.querySelectorAll("img.lazy");  
  var lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < (window.innerHeight + scrollTop)) {
          
          img.src = img.dataset.src;
          img.classList.add("fade-in")
          img.classList.remove('lazy');
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

});
/* ---------- Lazy loading images ends ---------- */

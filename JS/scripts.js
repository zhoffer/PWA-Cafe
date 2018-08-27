document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    } 
  });

// Inspired by http://madewithenvy.com/ecosystem/articles/2015/exploring-order-flexbox-carousel/

// Current item visible is always order 2
// Animate is order 1 -> 2
// Animaate reverse is order 2 <- 3
window.onload = function(){ 
  var carouselContent = document.querySelector('.carousel-content');
  var items = document.querySelectorAll('.carousel-item');
  
  /**
  * toggleReverse change class of .carousel-content element
  * @param check {bool} compare if .carousel-content element contains .carousel-reverse
  * @param action {string} [add, remove]
  */
  var toggleReverse = function(check, action){
    if(carouselContent.classList.contains('carousel-reverse') == check){
     carouselContent.classList[action]('carousel-reverse');
   } 
  };
  /**
  * toggleAnimate add or remove .carousel-animate to .carousel-content element
  */
  var toggleAnimate = function(){
    carouselContent.classList.toggle('carousel-animate');
  };
  
  /**
  * setOrder change dynamically the order of all .carousel-item elements
  */
  var setOrder = function(direction){
    // initialize direction to change order
    if(direction === 'left'){
      direction = 1;
    } else if(direction === "right"){
      direction = -1;
    }
    
    for(var i = 0, c=items.length;i<c;i++){
      if(items[i].style.order){ // change order with direction
        var newValue = (parseInt(items[i].style.order, 10) + direction) % c;
        items[i].style.order = newValue ? newValue : c;
      
      } else { // Initialize
        items[i].style.order = i+1;
      }
    }
  };

  // Initiliaze order of .carousel-item
  setOrder();



  var onRightClick = function(evt){
    // remove reverse
    toggleReverse(true, "remove");
    // Disable transition to instant change order     
    toggleAnimate();
    // Change order of element
    // Current order 2 visible become order 3
    setOrder('right');
    // Enable transition to animate order 3 to order 2
    setTimeout(toggleAnimate, 50);      
  };
  var onLeftClick = function(evt){
    // add reverse
    toggleReverse(false, "add");
    // Disable transition to instant change order
    toggleAnimate();
    // Change order of element
    // Current order 2 visible become order 1    
    setOrder('left');
    // Enable transition to animate order 1 to order 2
    setTimeout(toggleAnimate, 50);      
  };
  document.querySelector('.fa-chevron-left').addEventListener('click', onLeftClick, false);  
  document.querySelector('.fa-chevron-right').addEventListener('click', onRightClick, false);  
};
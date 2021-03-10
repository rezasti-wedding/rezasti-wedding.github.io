// Cache the label for later use.
var label = document.getElementById('label');
var start = document.getElementById('start');

// Setup the sounds to be used.
var sound1 = new Howl({
  src: ['assets/audio/music1.webm', 'assets/audio/music1.mp3'],
  html5: true
});



// Define the tests to run.
var id;
var tests = [
   function(fn) {
    id = sound1.play();

    label.innerHTML = 'PLAYING';
  },

  function(fn) {
    sound1.pause(id);

    label.innerHTML = 'PAUSED';
    setTimeout(fn, 1500);
  },

  function(fn) {
    sound1.play(id);

    label.innerHTML = 'RESUMING';
    setTimeout(fn, 2000);
  },

];

// Create a method that will call the next in the series.
var chain = function(i) {
  return function() {
    if (tests[i]) {
      tests[i](chain(++i));
    } else {
      document.getElementById('logo').style.display = 'none';
      label.innerHTML = 'COMPLETE!';
      label.style.color = '#74b074';

      // Wait for 5 seconds and then go back to the tests index.
      setTimeout(function() {
        window.location = './';
      }, 5000);
    }
  };
};




// Script Time

// Set the date we're counting down to
var countDownDate = new Date("Mar 20, 2021 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + " day " + hours + " hours "
  + minutes + " minutes " + seconds + " seconds ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "TODAY";
  }
}, 1000);


// Listen to a click on the button to being the tests.
start.addEventListener('click', function(e) {
  e.preventDefault();
  tests[0](chain(1));
  start.style.display = 'none';
  label.innerHTML = '<a href="#when&where" class="btn-get-started" id="demo">LOADING...</a>';
}, false);


var player1position = 0
var player2position = 0

$(document).ready(function() {
  // ('p').each.style.display = "none";
  var $strips = $(this).find('tr')
  var $cells1 = $strips[0].getElementsByTagName("td")
  var $cells2 = $strips[1].getElementsByTagName("td")
  $cells1[player1position].className = "active";
  $cells2[player2position].className = "active";

  var Stopwatch = function(elem, options) {

      var timer       = createTimer(),
          startButton = createButton("start", start),
          stopButton  = createButton("stop", stop),
          resetButton = createButton("reset", reset),
          offset,
          clock,
          interval;

      // default options
      options = options || {};
      options.delay = options.delay || 1;

      // append elements     
      elem.appendChild(timer);

      // initialize
      reset();

      // private functions
      function createTimer() {
        return document.createElement("span");
      }

      function createButton(action, handler) {
        var a = document.createElement("a");
        a.href = "#" + action;
        a.innerHTML = action;
        a.addEventListener("click", function(event) {
          handler();
          event.preventDefault();
        });
        return a;
      }

      function start() {
        if (!interval) {
          offset   = Date.now();
          interval = setInterval(update, options.delay);
        }
      }

      function stop() {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }

      function reset() {
        clock = 0;
        render();
      }

      function update() {
        clock += delta();
        render();
      }

      function render() {
        timer.innerHTML = clock/1000; 
      }

      function delta() {
        var now = Date.now(),
            d   = now - offset;

        offset = now;
        return d;
      }

      function time() {
        return clock;
      }

      // public API
      this.time = time;
      this.start = start;
      this.stop = stop;
      this.reset = reset;
   };

  function movement(player_track){
  // var $strips = $(document).find('tr')
  // var $cells1 = $strips[0].getElementsByTagName("td")
  // var $cells2 = $strips[1].getElementsByTagName("td")
    if (player1position > $cells1.length-1 || player2position > $cells2.length-1) {
        // $(document).find("winner").style.display = "initial";
        if (player1position > $cells1.length-1) {
          this.stop
          parseWinner($cells1, player2position) // refer to below function for clarity
        }
        else {
          this.stop
          parseWinner($cells2, player1position)
        }
    } else {
      // $(document).find('p')[0].css('display: initial')
      if (player_track === $cells1) {
        if (player1position === 0) {
          this.start
          $cells1[player1position].className = "";
          $cells1[player1position+1].className = "active";
            // debugger
        } else {
          $cells1[player1position-1].className = "";
          $cells1[player1position].className = "active";
        }
        player1position += 1
      }

      if (player_track === $cells2) {
        if (player2position === 0) {
          this.start
          $cells2[player2position].className = "";
          $cells2[player2position].className = "active";
        } else {
          $cells2[player2position-1].className = "";
          $cells2[player2position].className = "active";
        }
        player2position += 1
      }
    }
  }

  function parseWinner(player_track, loser_index) {
    var race_id = $("#race").data("race-id")
    var player1_id = $("#race").data("playerone-id")
    var player2_id = $("#race").data("playertwo-id")
    if (player_track === $cells1) {
      // debugger
      $.ajax({
        type: "PUT",
        url: "/race",
        data: {"race_id": race_id, 
               "winner_id": player1_id, 
               "loser_index": loser_index}
        }).done(function(e){
        // e.preventDefault();
        window.location = "/winner/" + race_id
      })
    }
    else {
      $.ajax({
        type: "PUT",
        url: "/race",
        data: {"race_id": race_id, 
               "winner_id": player1_id, 
               "loser_index": loser_index}
        }).done(function(e){
        console.log("wtfwtf")
        window.location = "/winner/" + race_id
      })
    }

  }

  // what defines an event?
  // is event an object?

  $(document).keydown(function(key) {
    switch(parseInt(key.which,10)) {
      case 81:
      movement($cells1);
        break;

      case 80:
      movement($cells2);
        break;
    };
  });



});








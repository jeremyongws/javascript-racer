// var player1position = 0
// var player2position = 0

$(document).ready(function() {
  // ('p').each.style.display = "none";
  var $strips = $(this).find('tr');
  var $cells1 = $strips[0].getElementsByTagName("td");
  var $cells2 = $strips[1].getElementsByTagName("td");
  var player1_id = $("#race").data("playerone-id");
  var player2_id = $("#race").data("playertwo-id");
  // $cells1[player1position].className = "active";
  // $cells2[player2position].className = "active";

  function Player(playernum){
    this.playernum = playernum;
    this.position = 0;

    this.move = function() {
      var position = $('player' + playernum + '_strip' + " td.active").index();
        $('player' + this.playernum + '_strip' + " td").eq(position).removeClass('active');
        $('player' + this.playernum + '_strip' + " td").eq(position+1).addClass('active');
        this.position = $('player' + this.playernum + '_strip' + " td.active").index();
    }
  }
  
  $('tr td:first-child').addClass("active");

  function Game(player1, player2){
    this.player1 = player1;
    this.player2 = player2;

    this.onKeyUp = function() {
      switch(parseInt(key.which,10)) {
        case 81:
        debugger
        this.player1.move();
        if(checkIfWon(1)) {
          parseWinner($cells1, this.player2.position)
        }
        break;

        case 80:        
        this.player2.move();
        if(checkIfWon(2)) {
          parseWinner($cells2, this.player1.position)
        }
        break;
      };
    }
  }

  function checkIfWon(playernum) {
    var position = $("#row" + id + " td.active").index();
    var length = $("#row" + id + " td").length
    if(position + 1 === length){
      return true
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
        window.location = "/winner/" + race_id
      })
    }
  }

  var game = new Game(new Player(1), new Player(2));
  alert(Player(1))

  $(document).keydown(function(key) {
    switch(parseInt(key.which,10)) {
      case 81:
      move($cells1);
        break;

      case 80:
      move($cells2);
        break;
    };
  });



});








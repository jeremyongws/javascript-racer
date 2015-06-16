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

  function Player(playernum, key){
    this.playernum = playernum;
    this.position = 0;
    this.key = key;

    this.move = function() {
      var position = $('#player' + playernum + '_strip' + " td.active").index();
        $('#player' + this.playernum + '_strip' + " td").eq(position).removeClass('active');
        $('#player' + this.playernum + '_strip' + " td").eq(position+1).addClass('active');
        this.position = $('#player' + this.playernum + '_strip' + " td.active").index();
        // debugger
    }
  }

  $('tr td:first-child').addClass("active");

  function Game(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    // debugger

    this.onKeyUp = function(code) {
      if (code == this.player1.key){//Q is player 1
        this.player1.move();
        // debugger
        if(checkIfWon(1)){
          // debugger
          // this.status = 0;
          loser_position = $('#player' + "2" + '_strip' + " td.active").index();
          player2position = loser_position
          // end_time = new Date().getTime();
          // var elapsedTime = end_time - start_time;
          // alert('Execution time: ' + elapsedTime);
          parseWinner(player1_id, loser_position);
          alert("Player 1 won!");}
       }
      else if (code == this.player2.key) {
        this.player2.move();
        // debugger
        if(checkIfWon(2)){
          // this.status = 0;
          loser_position = $('#player' + "1" + '_strip' + " td.active").index();
          player1position = loser_position
          // end_time = new Date().getTime();
          // var elapsedTime = end_time - start_time;
          // alert('Execution time: ' + elapsedTime);
          parseWinner(player2_id, player1position);
          alert("Player 2 won!");}
      }
    }
  }

  function checkIfWon(playernum) {
    var position = $('player' + playernum + '_strip' + " td.active").index();
    var length = $("#player" + playernum + "_strip td").length
    // debugger
    if(position + 2 === length){
      return true
      // debugger
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


  var player1 = new Player("1" , 81);
  var player2 = new Player("2" , 80);
  var game = new Game(player1, player2);
  // debugger

  $(document).on("keyup",(function(event){
      var code = event.keyCode || event.which;
      game.onKeyUp(code);

    }));



});








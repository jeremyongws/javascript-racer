var player1position = 0
var player2position = 0

$(document).ready(function() {
  // ('p').each.style.display = "none";
  var $strips = $(this).find('tr')
  var $cells1 = $strips[0].getElementsByTagName("td")
  var $cells2 = $strips[1].getElementsByTagName("td")
  $cells1[player1position].className = "active";
  $cells2[player2position].className = "active";

  function movement(player_num){
  // var $strips = $(document).find('tr')
  // var $cells1 = $strips[0].getElementsByTagName("td")
  // var $cells2 = $strips[1].getElementsByTagName("td")
  if (player1position > $cells1.length-1 || player2position > $cells2.length-1) {
      // $(document).find("winner").style.display = "initial";
  } else {
    // $(document).find('p')[0].css('display: initial')
    if (playernum === $cells1) {
      if (player1position === 0) {
        $cells1[player1position].className = "";
        $cells1[player1position+1].className = "active";
          // debugger
      } else {
        $cells1[player1position-1].className = "";
        $cells1[player1position].className = "active";
      }
      player1position += 1
    }

    if (playernum === $cells2) {
      if (player2position === 0) {
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

  $(document).keyup(function(key) {
    switch(parseInt(key.which,10)) {
      case 81:
      movement($cells1);
        break;

      case 87:
      movement($cells2);
        break;
    };
  });
});

function winner(player_num) {

}





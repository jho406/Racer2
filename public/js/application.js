$(document).ready(function() {
  var game_over = false;

  function movePlayerByOne(player_id){
    if (game_over) return;
    var player = $('#player'+player_id+'_strip').find('.active');
    player.removeClass('active');
    var nextElement = player.next();

    if (nextElement.length === 0){
      var db_id = $('#player'+player_id+'_strip').attr("data-player_id")
      game_over = true;
      // post to app that someone won
      $.ajax({
        url: document.URL,
        type: "put",
        data:{
          "winner_id": db_id
        }
      }).done(function(){
        $('#msg').text("player "+player_id+' WON!!!!');
        $('nav').css('display','block');
      });
    }else{
      nextElement.addClass('active');
    }

  };


  $('button').on('click', function(event){
      // post to app for a new game for the current players[session]

    $('nav').css('display','none');
    $('td').removeClass('active');
    $('tr > td:first-child').addClass('active');
    game_over=false
  });

  $(document).on('keyup', function(event) {

    if (event.keyCode == 32) {
      movePlayerByOne(1); 
    };
    if (event.keyCode == 13) {
      movePlayerByOne(2); 
    };
  });
});

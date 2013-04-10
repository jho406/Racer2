$(document).ready(function() {

  function Player(name){
    this.name = name;
    this.current_position = 0
  };

  Player.prototype.advance = function() {
    this.current_position+=1;
  };

  function Game(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.track_size = 19;
    this.seconds_played = 0;
    this.start_time = (new Date).getTime()

  };

  Game.prototype.over = function(){

    if (this.player1.current_position >= this.track_size){
      this.seconds_played = ((new Date).getTime() - this.start_time)/1000; 
      this.winner = player1;
      this.finish();
      return true;
    };

    if (this.player2.current_position >= this.track_size){
      this.seconds_played = ((new Date).getTime() - this.start_time)/1000; 
      this.winner = player2;
      this.finish();
      return true;
    };

    return false;


  };

  Game.prototype.onKeyUp = function(key){
    if (this.over() === false){ 
      if (key === 32) {
        player1.advance();
        this.render();
      };
      if (key === 13) {
        player2.advance();
        this.render(); 
      };
    };
  };
/*********************************************/
  Game.prototype.finish = function() {
    $.ajax({
        url: document.URL,
        type: "put",
        data:{
          "winner_name": this.winner.name
        }
      }).done(function(){
        $('#msg').text("player "+this.winner.name+' WON!!!!');
        $('nav').css('display','block');
      });
  };
/*********************************************/

  Game.prototype.render = function() {
    $('td').removeClass('active')
    pos1 = this.player1.current_position + 1;
    $( '#player1_strip td:nth-child(' + pos1 +')' ).addClass('active');

    pos2 = this.player2.current_position + 1;
    $( '#player2_strip td:nth-child(' + pos2 +')' ).addClass('active');

    if (this.over()){
      $('#msg').text("player "+this.winner.name+' WON!!!!');
      $('nav').css('display','block');
    }
  };

  p1_name = $('#player1_strip').attr('data-player_name')
  p2_name = $('#player1_strip').attr('data-player_name')
  player1 = new Player(p1_name);
  player2 = new Player(p2_name);

  game = new Game(player1, player2);
  game.render();

  $(document).on('keyup', function(event) {
    game.onKeyUp(event.which);
  });



});

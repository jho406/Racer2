get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/' do
  player1 = Player.find_or_create_by_initials(params["player1"])
  player2 = Player.find_or_create_by_initials(params["player2"]) 
  # todo:lowercase the initials
  game = Game.new
  game.players = [player1,player2]
  game.save!
  session[:game_id] = game.id
  redirect "/game/#{game.id}"
end

get '/game/:id' do
  @game = Game.find(params[:id])
  puts "-----------------#{@game}------------------"
  erb :game
end

put '/game/:id' do
  player = Player.find_by_initials(params["winner_name"])
  player.win!(params[:id])
end

get '/game/:id/results' do
  @game = Game.find(params[:id])
  @results = @game.results
  erb :results
end

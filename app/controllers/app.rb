get '/' do
  erb :welcome
end

post '/users/create' do
  @players = [User.new(name: params[:player1]), User.new(name: params[:player2])]
  if @players[0].save && @players[1].save
      @race = Race.create
      @user_race = UserRace.create(player1_id: @players[0].id, player2_id: @players[1].id, race: @race)
      # @race.save
      byebug
      redirect to "/race/#{@race.id}"
  else
    redirect to "/"
  end
end

get '/race/:race_id' do
  @race = Race.find(params[:race_id])
  erb :race
end

put '/game/:game_id' do
  @game = Game.find(params[:game_id])
  redirect_to '/winner/@{params[:game_id]'
end

get '/winner/:game_id' do
end
  
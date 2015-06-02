get '/' do
  erb :welcome
end

post '/users/create' do
  @players = [User.new(name: params[:player1]), User.new(name: params[:player2])]
  if @players[0].save && @players[1].save
      @race = UserRace.create(player1_id: @players[0].id, player2_id: @players[1].id)
      # @race.save
      byebug
      redirect to "/race/#{@race.id}"
  else
    redirect to "/"
  end
end

get '/race/:user_race_id' do
  erb :race
end
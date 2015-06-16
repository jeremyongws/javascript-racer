get '/' do
  erb :welcome
end

post '/users/create' do
  # byebug
  @player1 = User.new(name: params[:player1])
  @player2 = User.new(name: params[:player2])
  if @player1.save && @player2.save
      @race = Race.create
      @user_race = UserRace.create(player1_id: @player1.id, player2_id: @player2.id, race_id: @race.id)
      redirect to "/race/#{@race.id}"
  else
    @player1 = User.find_by_name(params[:player1])
    @player2 = User.find_by_name(params[:player2])
    @race = Race.create
    # byebug
    @user_race = UserRace.create(player1_id: @player1.id, player2_id: @player2.id, race_id: @race.id)
    # byebug
      redirect to "/race/#{@race.id}"
  end
end

get '/race/:race_id' do
  @race = Race.find(params[:race_id])
  @user_race = UserRace.find_by_race_id(params[:race_id])
  # byebug
  @player1 = User.find(@user_race.player1_id)
  @player2 = User.find(@user_race.player2_id)
  erb :race
end

put '/race' do
  # byebug
  @race = Race.find(params[:race_id])
  @race.winner = User.find(params[:winner_id]).name
  @race.loser_index = params[:loser_index]

  @race.save
  # byebug
end

get '/winner/:race_id' do
  @race = Race.find(params[:race_id])
  byebug
  if @race.winner == User.find(@race.user_races.first.player1_id).name
    @loser = User.find(@race.user_races.first.player2_id).name
  else
    @loser = User.find(@race.user_races.first.player1_id).name
  end
  erb :winner
end

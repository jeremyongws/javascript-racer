class CreateUserRaces < ActiveRecord::Migration
  def change
    create_table :user_races do |x|
      x.integer :player1_id
      x.integer :player2_id
      x.integer :race_id
    end
  end
end

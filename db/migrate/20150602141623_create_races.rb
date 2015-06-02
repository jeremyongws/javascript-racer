class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |x|
      x.string :winner
      x.integer :loser_index
      x.float :time_spent
    end
  end
end

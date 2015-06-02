class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |x|
      x.string :winner
    end
  end
end

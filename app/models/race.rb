class Race < ActiveRecord::Base
  has_many :user_races
  has_many :users, through: :user_races
  # Remember to create a migration!
end

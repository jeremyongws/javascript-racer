class User < ActiveRecord::Base
  has_many :user_races
  has_many :races, through: :user_races
  validates :name, uniqueness: true
  # Remember to create a migration!
end

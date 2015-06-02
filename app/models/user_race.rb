class UserRace < ActiveRecord::Base
  validate :two_players_only
  # Remember to create a migration!
  def two_players_only
    if (player1_id.present? && player2_id.present?) != true
      errors.add(:race_id, "must have two players")
    end
  end

end

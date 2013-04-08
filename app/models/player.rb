class Player < ActiveRecord::Base
  has_many :results
  has_many :games, :through=>:results

  validates :initials, :uniqueness => true, :presence => true

  def win!(game_id)
    game_results = self.results.find_by_game_id(game_id)
    game_results.won = true
    game_results.save
  end
end

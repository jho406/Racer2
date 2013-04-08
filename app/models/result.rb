class Result < ActiveRecord::Base
  belongs_to :player
  belongs_to :game

  def won!
    update_attribute(:won, true)
  end

  # def winning?
  #   won?
  # end
end

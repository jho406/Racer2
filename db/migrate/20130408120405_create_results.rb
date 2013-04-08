class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.references :game
      t.references :player
      t.boolean :won
    end
  end
end

class CreateMeals < ActiveRecord::Migration
  def change
    create_table :meals do |t|
      t.string :type
      t.date :date
      t.integer :level_of_fullness
      t.references :user, index: true

      t.timestamps
    end
  end
end

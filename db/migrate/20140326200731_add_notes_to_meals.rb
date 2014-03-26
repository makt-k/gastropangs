class AddNotesToMeals < ActiveRecord::Migration
  def change
    add_column :meals, :note, :text
  end
end

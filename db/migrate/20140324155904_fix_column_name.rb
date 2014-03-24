class FixColumnName < ActiveRecord::Migration
  def change
    rename_column(:meals, :type, :time)
  end
end

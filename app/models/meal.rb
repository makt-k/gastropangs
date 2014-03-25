class Meal < ActiveRecord::Base
  belongs_to :user

  validates :level_of_fullness, presence: true
  validates :time, presence: true
  validates :date, presence: true

end

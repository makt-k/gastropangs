class Meal < ActiveRecord::Base
  belongs_to :user

  def self.dow_count()
    User.meals.select("EXTRACT(dow FROM date as DOW, COUNT(*)").group("dow")
  end
end

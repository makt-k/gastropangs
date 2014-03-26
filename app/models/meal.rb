class Meal < ActiveRecord::Base
  belongs_to :user

  scope :today, lambda { where(date: Date.today)}
  validates :level_of_fullness, presence: true
  validates :time, presence: true
  validates :date, presence: true

  def self.on_weekday(weekday)
    where('extract(dow from date) = ?', weekday)
  end

  def self.with_high_fullness
    where('level_of_fullness > ?', 7)
  end

  def self.type_of_meal(time)
    where('time = ?', time)
  end

  def self.overeating_count_on_weekday(weekday)
    on_weekday(weekday).with_high_fullness.count
  end

  def self.overeating_count_per_type_of_meal(time)
    type_of_meal(time).with_high_fullness.count
  end

end

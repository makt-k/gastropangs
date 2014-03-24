class User < ActiveRecord::Base

  has_many :meals

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  # def self.dow_count()
  #   User.select("EXTRACT(dow FROM date as DOW, COUNT(*)").group("dow")
  # end

end

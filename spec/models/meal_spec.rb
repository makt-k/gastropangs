require 'spec_helper'

describe Meal do
  describe "validations" do
    it { should validate_presence_of(:level_of_fullness) }
    it { should validate_presence_of(:time) }
    it { should validate_presence_of(:date) }
  end

  describe "associations" do
    it { should belong_to(:user) }
  end
end

require 'spec_helper'

describe User do
  it 'has a valid factory' do
    user = FactoryGirl.create(:user)
    expect(user).to be_valid
  end

  describe "associations" do
    it { should have_many(:meals) }
  end
end

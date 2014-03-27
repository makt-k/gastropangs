require 'spec_helper'


feature 'Gastropang' do
  background do
    @user = FactoryGirl.create(:user)
    sign_in_as(@user)
  end
  scenario 'user can view dashboard', :js do
    expect(page).to have_content "Meals Recorded"
    expect(page).to have_content "Signed in as"
  end

  scenario 'user can go to new meal form', :js do
    click_link 'New Meal'
    expect(page).to have_content "Stufdometer"
  end

end

class MealsController < ApplicationController

  def index
   if current_user
     @meals = current_user.meals
   else
     redirect_to new_user_session_path, notice: 'You are not logged in.'
   end
  end

end

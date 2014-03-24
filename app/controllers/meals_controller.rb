class MealsController < ApplicationController

  before_action :get_user

  def index
   if current_user
     @meals = current_user.meals
     @meal = Meal.new
   else
     redirect_to new_user_session_path, notice: 'You are not logged in.'
   end
  end

  def create
    @meal = Meal.new(meal_params)
    if @meal.save!
      flash[:notice] = "Your meal has been charted!"
    else
      flash[:alert] = "Sorry, please try again."
    end
  end

  private

  def meal_params
    params.require(:meal).permit(:type, :level_of_fullness, :date, :user_id)
  end

  def get_user
    @user= User.find(params[:user_id])
  end
end

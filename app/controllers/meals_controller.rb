class MealsController < ApplicationController

  before_action :get_user

  def index
   if current_user
     @meals = current_user.meals
     @meal = Meal.new
   else
     redirect_to new_user_session_path, notice: 'You are not logged in.'
   end

   respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def create
    meal = Meal.new(meal_params)
    meal.date = Date.strptime(meal_params[:date], '%m/%d/%Y').to_s
    @user.meals << meal
    redirect_to :back
  end

  private

  def meal_params
    params.require(:meal).permit(:time, :level_of_fullness, :date)
  end

  def get_user
    @user= User.find(params[:user_id])
  end
end

class MealsController < ApplicationController

  before_action :get_user

  def index
   if current_user
     @meals = current_user.meals.order(:date)
     @meal = Meal.new
   else
     redirect_to new_user_session_path, notice: 'You are not logged in.'
   end

    respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def overate
    @meals = current_user.meals.order(:date).where('level_of_fullness > ?', 7)

     respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def show
    @meal = Meal.find(params[:id])
  end

  def create
    @meal = Meal.new(meal_params)
    @meal.date = Date.strptime(meal_params[:date], '%m/%d/%Y').to_s
    if @meal.save!
      @user.meals << @meal
      redirect_to :back, notice: 'Sweet! A new meal added.'
    else
      redirect_to :back, alert: 'Sorry, please try again.'
    end
  end

  private

  def meal_params
    params.require(:meal).permit(:time, :level_of_fullness, :date, :id)
  end

  def get_user
    @user= User.find(params[:user_id])
  end
end

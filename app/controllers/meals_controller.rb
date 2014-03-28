class MealsController < ApplicationController

  before_action :get_user
  before_action :get_dow, only: [:meals_by_dow]

  def index
   if current_user
     @meals = current_user.meals.order(:date)
     @meals_display = @meals.reverse_order.page(params[:page]).per_page(10)
     @meal = Meal.new
   else
     redirect_to new_user_session_path, notice: 'You are not logged in.'
   end

    respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def recent_meals
    @meals = current_user.meals.order(:date).reverse_order.limit(11)

     respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def meals_overate
    @meals = current_user.meals.order(:date).reverse_order.where('level_of_fullness > ?', 7).limit(11)

     respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def meals_by_dow
    @meals = current_user.meals.order(:date).reverse_order.on_weekday(@weekday).limit(11)

    respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def meals_today
    @meals = current_user.meals.today

    respond_to do |format|
      format.html
      format.json {render json: @meals, root: false }
    end
  end

  def create
    @meal = Meal.new(meal_params)
    if @meal.save!
      @user.meals << @meal
      redirect_to :back, notice: 'Sweet! A new meal added.'
    else
      redirect_to :back, alert: 'Sorry, something unexpected happened. Please try again.'
    end
  end

  def show
    @meal = Meal.find(params[:id])
  end

  private

  def meal_params
    params.require(:meal).permit(:time, :level_of_fullness, :date, :id, :weekday, :note)
  end

  def get_user
    @user= User.find(params[:user_id])
  end

  def get_dow
    dow = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7
    }
    @weekday = dow[params[:weekday].to_sym]
  end
end

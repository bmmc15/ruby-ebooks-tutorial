class Api::V1::ExercisesController < ApplicationController
  def index
    exercise = Exercise.all.order(created_at: :desc)
    render json: exercise
    end

  def create
    exercise = Exercise.create!(exercise_params)
    if exercise
    render json: exercise
    else
    render json: exercise.errors
    end
  end

  def show
  end

  def destroy
  end



  private
  def exercise_params
    params.permit(:name, :image, :trainings, :instruction)
  end
end
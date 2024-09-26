class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { message: "User created successfully", user: @user }, status: :created
    else
      render json: { error: "Invalid user creation", details: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.permit(:username, :email, :password)
  end
end

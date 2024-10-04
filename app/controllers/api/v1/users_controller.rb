class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
end


class Api::V1::UsersController < BaseController
  skip_before_action :authorized, only: [ :create ]
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create
    user = User.create!(user_params)
    @token = encode_token(user_id: user.id)
    render json: {
        user: UserSerializer.new(user),
        token: @token
    }, status: :created
  end

  def me
    render json: current_user, status: :ok
  end

  private

  def user_params
    params.permit(:username, :email, :password)
  end

  def handle_invalid_record(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end

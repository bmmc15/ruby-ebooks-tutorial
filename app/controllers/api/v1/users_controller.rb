class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :avatar_url
end


class Api::V1::UsersController < BaseController
  skip_before_action :authorized, only: [ :create ]
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create # Sign-up
    user = User.create!(user_params.merge(last_password_update: Time.current))

    # Email the buyer
    UserMailer.with(user: user).welcome_email.deliver_later

    user_payload = {
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url
    }
    token = encode_token(user_payload)
    render json: {
        user: UserSerializer.new(user),
        token: token
    }, status: :created
  end

  def update
    user = User.find_by(id: params[:id])

    if user
      if user.update(user_update_params)

        user_payload = {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url
      }
      token = encode_token(user_payload)
        render json: { message: "User updated successfully", user: user.as_json(methods: [ :avatar_url ]), token: token }, status: :ok
      else
        render json: { error: "Invalid user update", details: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def me
    render json: current_user, status: :ok
  end

  private

  def user_params
    params.permit(:username, :email, :password, :avatar)
  end

  def user_update_params
    params.permit(:avatar)
  end

  def handle_invalid_record(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end

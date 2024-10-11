class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :avatar_url
end

class Api::V1::AuthController < BaseController
  skip_before_action :authorized, only: [ :login ]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def login
      @user = User.find_by!(email: login_params[:email])
      if @user.authenticate(login_params[:password])
        if user.password_expired?
          render json: { message: 'Password expired. Please update your password.' }, status: :forbidden
        else

          user_payload = {
            id: @user.id,
            username: @user.username,
            avatar_url: @user.avatar_url
          }

          token = encode_token(user_payload)
          render json: {
              user: UserSerializer.new(@user),
              token: token
          }, status: :accepted
      else
          render json: { message: "Incorrect password" }, status: :unauthorized
      end
  end

  private

  def login_params
      params.require(:auth).permit(:email, :password)
  end

  def handle_record_not_found(e)
      render json: { message: "User doesn't exist" }, status: :unauthorized
  end
end

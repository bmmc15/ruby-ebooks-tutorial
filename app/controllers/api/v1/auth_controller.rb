class Api::V1::AuthController < BaseController
  skip_before_action :authorized, only: [ :login ]

  def login
      @user = User.find_by(email: login_params[:email])

      if @user.nil?
        handle_not_found("User")
        return
      end

      if @user.authenticate(login_params[:password])
        user_payload = {
          id: @user.id,
          username: @user.username,
          avatar_url: @user.avatar_url
        }

        token = encode_token(user_payload)
        if @user.password_expired?
          render json: { message: "Password expired. Please update your password, with the following token", token: token }, status: :forbidden
        else
        render json: {
            user: UserSerializer.new(@user),
            token: token
        }, status: :accepted
        end
      else
          render json: { message: "Incorrect password" }, status: :unauthorized
      end
  end

  def update_password
    @user = User.find(password_params[:user_id])

    if @user.update_password(password_params[:new_password])
      user_payload = {
        id: @user.id,
        username: @user.username,
        avatar_url: @user.avatar_url
      }

      new_token = encode_token(user_payload)
      render json: { message: "Password updated successfully", token: new_token }, status: :ok
    else
      render json: { message: "Password update failed" }, status: :unprocessable_entity
    end
  end

  private

  def login_params
      params.require(:auth).permit(:email, :password)
  end

  def password_params
    params.require(:auth).permit(:user_id, :new_password)
  end

  def handle_record_not_found(e)
      render json: { message: "User doesn't exist" }, status: :unauthorized
  end
end

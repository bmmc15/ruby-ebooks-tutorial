
class BaseController < ActionController::API
    before_action :authorized

    def encode_token(payload)
        JWT.encode(payload, ENV["JWT_SECRET"])
    end

    def decoded_token
        header = request.headers["Authorization"]
        if header
            token = header.split(" ")[1]
            begin
                JWT.decode(token, ENV["JWT_SECRET"], true, algorithm: "HS256")
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0]["id"]
            @user = User.find( user_id)
        end
    end

    def authorized
        unless !!current_user
        render json: { message: "Please log in" }, status: :unauthorized
        end
    end

    private

    def handle_not_found(resource_name)
      render json: { message: "#{resource_name} not found" }, status: :not_found
    end
end

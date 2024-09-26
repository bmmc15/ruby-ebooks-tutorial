class Api::V1::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def new
    end

    def create
        user = User.find_by(email: params[:session][:email])
        if user && user.authenticate(params[:session][:password])
            render json: { message: "Success" }, status: :ok
        else
            render json: { error: "Invalid user credentials" }, status: :forbidden
        end
    end

    def destroy
    end
end

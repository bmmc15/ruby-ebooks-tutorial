class Api::V1::PurchaseController < ApplicationController
    skip_before_action :verify_authenticity_token


    def create
      buyer = User.find_by(id: purchase_params[:buyer_id])

      unless buyer
        render json: { message: "Invalid buyer_id" }, status: :bad_request
        return
      end

      ebooks_ids = purchase_params[:ebooks_ids]

      if ebooks_ids.blank?
        render json: { message: "No ebooks selected for purchase." }, status: :bad_request
        return
      end

      Purchase.transaction do
        ebooks_ids.each do |ebook_id|
          Purchase.create!(buyer_id: buyer.id, ebook_id: ebook_id)
        end
      end

      # Email for the buyer
      @user = buyer
      PurchaseMailer.with(user: @user).purchase_email.deliver_now

      # Email for the seller(s)
      PurchaseMailer.with(user: @user).notify_author_of_sale_fee.deliver_now

      render json: { message: "Thank you for your purchase", purchase: @purchase }, status: :created

    rescue ActiveRecord::RecordInvalid => e
        render json: { message: "Purchase failed: #{e.message}" }, status: :unpr
    end
    private

    def purchase_params
      params.permit(:buyer_id, ebooks_ids: [])
    end
end

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

      # Email the buyer
      @user = buyer
      PurchaseMailer.with(user: @user).purchase_email.deliver_later

      # Email the sellers with details
      notify_authors_of_sale_fee(@user)

      render json: { message: "Thank you for your purchase", purchase: @purchase }, status: :created

    rescue ActiveRecord::RecordInvalid => e
        render json: { message: "Purchase failed: #{e.message}" }, status: :unpr
    end


    private

    def notify_authors_of_sale_fee(user)
        # Get last order timestamp from this buyer
        last_purchase_minute = Purchase
          .where(buyer_id: user.id)
          .order(created_at: :desc)
          .limit(1)
          .pluck(:created_at)
          .first
          &.beginning_of_minute

        ebooks_ids_from_last_order = if last_purchase_minute.nil?
                                        Purchase.where(buyer_id: user.id).pluck(:ebook_id)
        else
                                        Purchase.where(buyer_id: user.id)
                                                .where(created_at: last_purchase_minute..last_purchase_minute.end_of_minute)
                                                .pluck(:ebook_id)
        end

        # Load all ebooks from the order into memory
        ebooks = Ebook.where(id: ebooks_ids_from_last_order)
        ebook_by_seller = calculate_seller_fees(ebooks)

        puts "ebook_by_seller #{ebook_by_seller}"

        sellers = User.where(id: ebook_by_seller.keys)

        ebook_by_seller.each do |seller_id, value|
          seller = sellers.find_by(id: seller_id)
          puts "seller #{seller}"

          fee_details = value[:details]
          puts "fee_details #{fee_details}"

          total_fee = value[:total_fee]
          puts "total_fee #{total_fee}"

          PurchaseMailer.with(seller: seller, fee_details: fee_details, total_fee: total_fee).notify_author_of_sale_fee.deliver_later
        end
    end

    def calculate_seller_fees(ebooks)
        ebook_by_seller = {}
        ebooks.each do |ebook|
            ebook_by_seller[ebook.seller_id] ||= { total_fee: 0, details: [] }

            ebook_by_seller[ebook.seller_id][:total_fee] += (ebook.price * ebook.seller_fee).round(2)

            ebook_by_seller[ebook.seller_id][:details] << "#{ebook.title}(#{ebook.id}) fee:  #{ebook.price}$ x #{ebook.seller_fee * 100}% = #{(ebook.price * ebook.seller_fee).round(2)}$"
        end
        ebook_by_seller
    end

    def purchase_params
      params.permit(:buyer_id, ebooks_ids: [])
    end
end

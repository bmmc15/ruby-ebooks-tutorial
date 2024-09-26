class Api::V1::EbooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    ebooks = Ebook.all.order(created_at: :desc)
    render json: ebooks
  end

  def show
    ebook = Ebook.find_by(id: params[:id])
    
    if ebook
      render json: ebook
    else
      render json: { error: "Ebook not found" }, status: :not_found
    end
  end

  def create

    @ebook = Ebook.new(ebook_params)
    if @ebook.save
      render json: { message: 'Ebook created successfully', ebook: @ebook }, status: :created
    else
      render json: { error: 'Invalid ebook creation', details: @ebook.errors.full_messages }, status: :unprocessable_entity
    end

  rescue ArgumentError => e
    render json: { error: 'Invalid status', details: 'Status must be one of: draft, pending, live' }, status: :bad_request
  end

  def update
    ebook = Ebook.find_by(id: params[:id])

    if ebook
      if ebook.update(ebook_params)
        render json: { message: 'Ebook updated successfully', ebook: ebook }, status: :ok
      else
        render json: { error: 'Invalid ebook update', details: ebook.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Ebook not found' }, status: :not_found
    end

  rescue ArgumentError => e
    render json: { error: 'Invalid status', details: 'Status must be one of: draft, pending, live' }, status: :bad_request
  end

  def destroy
    ebook = Ebook.find_by(id: params[:id])
  
    if ebook
      ebook.destroy
      render json: { message: 'Ebook deleted successfully' }, status: :ok
    else
      render json: { error: 'Ebook not found' }, status: :not_found
    end
  end

  private
  def ebook_params
    params.permit(:title, :description, :price, :status, :seller_id, :seller_fee, :pdf_review)
  end
end
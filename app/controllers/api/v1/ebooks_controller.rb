class Api::V1::EbooksController < BaseController
  before_action :authorized
  after_action :track_action

  def index
    tag_names = JSON.parse(params[:tags] || '[]')
    seller_id = params[:seller_id]
  
    ebooks = Ebook.joins(:tags)
  
    if tag_names.present?
      ebooks = ebooks.where(tags: { name: tag_names }).distinct
    end
  
    if seller_id.present?
      ebooks = ebooks.where(seller_id: seller_id)
    end
  
    ebooks = ebooks.order(created_at: :desc)
  
    render json: ebooks.as_json(methods: [:pdf_url, :ebook_cover_url])
  end

  def show
    ebook = Ebook.find_by(id: params[:id])

    if ebook
      render json: ebooks.as_json(methods: [ :pdf_url, :ebook_cover_url ])
    else
      render json: { error: "Ebook not found" }, status: :not_found
    end
  end

  def create
    @ebook = Ebook.new(ebook_params)
    @ebook.pdf.attach(params[:pdf])

    tag_names = JSON.parse(params[:tags] || '[]')

    if @ebook.save
      tag_names.each do |name|
        tag = Tag.find_or_create_by(name: name.strip)
        @ebook.tags << tag unless @ebook.tags.include?(tag)
      end
  
      render json: { message: "Ebook created successfully, check here the pdf preview:#{rails_storage_redirect_path(@ebook.pdf)}", ebook: @ebook.as_json(methods: [ :pdf_url, :ebook_cover_url ]) }, status: :created
    else
      render json: { error: "Invalid ebook creation", details: @ebook.errors.full_messages }, status: :unprocessable_entity
    end

  rescue ArgumentError => e
    render json: { error: "Invalid status", details: "Status must be one of: draft, pending, live" }, status: :bad_request
  end

  def update
    ebook = Ebook.find_by(id: params[:id])

    if ebook
      if ebook.update(ebook_params)
        render json: { message: "Ebook updated successfully", ebook: ebook.as_json(methods: [ :pdf_url, :ebook_cover_url ]) }, status: :ok
      else
        render json: { error: "Invalid ebook update", details: ebook.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Ebook not found" }, status: :not_found
    end

  rescue ArgumentError => e
    render json: { error: "Invalid status", details: "Status must be one of: draft, pending, live" }, status: :bad_request
  end

  def destroy
    ebook = Ebook.find_by(id: params[:id])

    if ebook
      ebook.destroy
      render json: { message: "Ebook deleted successfully" }, status: :ok
    else
      render json: { error: "Ebook not found" }, status: :not_found
    end
  end

  def show_pdf
    @ebook = Ebook.find(params[:id])

    if @ebook.pdf.attached?
      redirect_to rails_blob_url(@ebook.pdf, disposition: "inline") # inline para exibir no browser
    else
      render json: { error: "PDF not found" }, status: :not_found
    end
  end

  private
  def ebook_params
    params.permit(:title, :description, :price, :status, :seller_id, :seller_fee, :pdf, :ebook_cover, tags: [])
  end

  def track_action
    ahoy.track "ebooks actions", request.path_parameters
  end
end

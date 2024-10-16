class Api::V1::TagsController < BaseController
  before_action :authorized

  def index
    tags = Tag.pluck(:name)
    render json: tags
  end

end

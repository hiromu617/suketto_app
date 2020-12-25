class Api::TagsController < ApplicationController
  protect_from_forgery

  def show
    @tag = Tag.find_by(id: params[:id])
    render json: @tag
  end

end


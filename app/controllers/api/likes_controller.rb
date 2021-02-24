class Api::LikesController < ApplicationController
  protect_from_forgery

  def index
    @anser = Anser.find(params[:answer_id])
    render @anser.likes
  end
  

  def create
    @like = Like.new(like_params)
    if @like.save
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
  end

  private

  def like_params
    params.fetch(:like, {}).permit(
      :user_id,:answer_id
    )
  end


end


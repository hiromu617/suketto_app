class Api::RepliesController < ApplicationController
  protect_from_forgery

  def index
    @replies = Reply.order('created_at DESC')
    render json: @replies, include: 'user'
  end

  # def show
  #   @reply = reply.find_by(id: params[:id])
  #   render json: @reply, include: 'user'
  # end


  def create
    @reply = Reply.new(reply_params)
    if @reply.save
      render json: @reply
    else
      render json: @reply.errors, status: :unprocessable_entity
    end
  end

  # def update
  #   @reply = reply.find_by(id: params[:id])
  #   if @reply.update(update_params)
  #     render json: @reply
  #   else
  #     render json: @reply.errors
  #   end
  # end

  def destroy
    @reply = Reply.find(params[:id])
    @reply.destroy
  end

  private

  def reply_params
    params.fetch(:reply, {}).permit(
      :user_id,:answer_id, :body
    )
  end


end


class Api::AnswersController < ApplicationController
  protect_from_forgery

  def index
    @answers = Answer.order('created_at DESC')
    render json: @answers, include: 'user'
  end

  def show
    @answer = Answer.find_by(id: params[:id])
    render json: @answer, include: 'user'
  end


  def create
    @answer = Answer.new(answer_params)
    if @answer.save
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def update
    @answer = Answer.find_by(id: params[:id])
    if @answer.update(update_params)
      render json: @answer
    else
      render json: @answer.errors
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy
  end

  private

  def answer_params
    params.fetch(:answer, {}).permit(
      :user_id,:question_id, :title,:body
    )
  end


end


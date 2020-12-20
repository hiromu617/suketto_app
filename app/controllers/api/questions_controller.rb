class Api::QuestionsController < ApplicationController
  protect_from_forgery

  def index
    @questions = Question.order('created_at DESC')
    render json: @questions, include: 'user'
  end

  def show
    @question = Question.find_by(id: params[:id])
    render json: @question, include: 'user'
  end

  def edit
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def update
    @question = Question.find_by(id: params[:id])
    if @question.update(update_params)
      render json: @question
    else
      render json: @question.errors
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
  end

  private

  def question_params
    params.fetch(:question, {}).permit(
      :user_id,:title,:body
    )
  end

  def update_params
    params.fetch(:question, {}).permit(
      :title,:body
    )
  end
end


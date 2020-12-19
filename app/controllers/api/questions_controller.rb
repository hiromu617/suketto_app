class Api::QuestionsController < ApplicationController

  def index
    @questions = Question.order('created_at DESC')
    render json: @questions
  end

  def show
    @question = Question.find_by(id: params[:id])
    render json: @question
  end

  def edit
  end

  def create
    @question = Question.new(question_params)

    if @question.save
      render json: @question
    else
      render json: @question.errors
    end
  end

  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      render :show
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
end


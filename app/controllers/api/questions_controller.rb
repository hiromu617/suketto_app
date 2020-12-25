class Api::QuestionsController < ApplicationController
  protect_from_forgery

  def index
    @questions = Question.order('created_at DESC')
    render json: @questions, include: ['user','answers', 'tags']
  end

  def show
    @question = Question.find_by(id: params[:id])
    render json: @question, include: ['user','answers', 'answers.user', 'tags']
  end


  def create
    @question = Question.new(question_params)
    tag_list = params[:question][:tag_list].map { |i| i[:text]}
    if @question.save
      @question.save_tags(tag_list)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def update
    @question = Question.find_by(id: params[:id])
    tag_list = params[:question][:tag_list].map { |i| i[:text]}
    if @question.update(update_params)
      @question.save_tags(tag_list)
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
      :user_id,:title,:body, :tag_list
    )
  end

  def update_params
    params.fetch(:question, {}).permit(
      :title,:body,:best_answer_id
    )
  end
end


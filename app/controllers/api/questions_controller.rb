class Api::QuestionsController < ApplicationController
  protect_from_forgery
  require 'pagy/extras/headers'
  include Pagy::Backend

  def index
    if params[:tag_id]
      @questions = Question.from_tag(params[:tag_id])
    elsif params[:sort] == 'unsolved'
      @questions = Question.where(best_answer_id: nil).order('created_at DESC')
    elsif params[:sort] == 'solved'
      @questions = Question.where.not(best_answer_id: nil).order('created_at DESC')
    # elsif params[:sort] == 'unanswered'
    #   @questions = Question.where.not(best_answer_id: nil).order('created_at DESC')
    else
      @questions = Question.order('created_at DESC')
    end
    pagy, @questions = pagy(@questions)
    pagy_headers_merge(pagy)
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
    if params[:question][:tag_list]
      tag_list = params[:question][:tag_list].map { |i| i[:text]}
      if @question.update(update_params)
        @question.save_tags(tag_list)
        render json: @question
      else
        render json: @question.errors
      end
    else
      if @question.update(update_params)
        render json: @question
      else
        render json: @question.errors
      end
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
      :title,:body,:best_answer_id, :tag_list
    )
  end
end


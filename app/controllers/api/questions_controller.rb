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
    render json: @question, include: ['user','answers', 'answers.replies.user' , 'answers.user', 'tags', 'answers.likes']
  end


  def create
    @question = Question.new(title: params[:title], body: params[:body], user_id: params[:user_id], video: params[:video])
    if params[:tag_list] != ""
      tag_list = params[:tag_list].split(",")
    end
    if @question.save
      if tag_list 
        @question.save_tags(tag_list)
      end
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # def tag_create
  #   tag_list = tag_params[:tag_list].map { |i| i[:text]}
  #   @question.save_tags(tag_list)
  # end

  def update
    @question = Question.find_by(id: params[:id])
    if params[:tag_list]
      # tag_list = params[:tag_list].map { |i| i[:text]}
      if @question.update(update_params)
        # @question.save_tags(tag_list)
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

  def deleteVideo
    @question = Question.find(params[:id])
    @question.remove_video!
    @question.save
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
  end

  private

  def question_params
    params.permit(
      :user_id,:title,:body, :video, :tag_list
    )
  end

  # def tag_params
  #   params.permit(
  #     :tag_list
  #   )
  # end

  def update_params
    params.permit(
      :title,:body,:best_answer_id, :tag_list, :video
    )
  end
end


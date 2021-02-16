class Api::UsersController < ApplicationController
  protect_from_forgery
  
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find_by(email: params[:email])
    render json: @user
  end

  def showById
    @user = User.find_by(id: params[:id])
    render json: @user, include: ['questions', 'answers', 'questions.answers', 'questions.user',]
  end

  def create
    @user = User.new(user_params)
    # binding.pry
    if @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    # binding.pry
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  # def user_params
  #   params.fetch(:user, {}).permit(
  #     :name, :email, avatar: {}
  #   )
  # end

  def user_params
    params.permit(
      :name, :email, :avatar, :profile
    )
  end

end

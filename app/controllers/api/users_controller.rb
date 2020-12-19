class Api::UsersController < ApplicationController
  protect_from_forgery
  
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find_by(email: params[:email])
    render json: @user
    # render 'show', handlers: 'jbuilder'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.fetch(:user, {}).permit(
      :name, :email
    )
  end

  # def show_params
  #   params.require(:user).permit(:email)
  # end

end

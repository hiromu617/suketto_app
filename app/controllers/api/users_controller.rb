class Api::UsersController < ApplicationController
  protect_from_forgery
  
  def index
    users = User.find_by(uid: params[:uid])
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created 
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.fetch(:user, {}).permit(
      :name, :email, :uid
    )
    # params.require(:user).permit(:name, :email, :uid)
  end
end

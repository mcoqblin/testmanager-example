class Api::FeaturesController < ApplicationController
  before_action :set_feature, only: [:show, :edit, :update, :destroy]

  # GET /features
  def index
    @features = Feature.all
    render :json => @features
  end

  # GET /features/1
  def show
    render :json => @feature
  end

  # POST /features
  def create
    @feature = Feature.new(feature_params)
    if @feature.save
      render :json => @feature
    else
      render :json => "CREATE FAILURE", status: 404
    end
  end

  # PATCH/PUT /features/1
  def update
    if @feature.update(feature_params)
      render :json => @feature
    else
      render :json => @feature, status: 404
    end
  end

  # DELETE /features/1
  def destroy
    if @feature.destroy
      render :json => "DELETE SUCCESS", status: 204
    else
      render :json => "DELETE FAILURE", status: 404
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feature
      @feature = Feature.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def feature_params
      ActiveModelSerializers::Deserialization.jsonapi_parse(params)
      #params.require(:data).require(:attributes).permit(:name)
    end
end

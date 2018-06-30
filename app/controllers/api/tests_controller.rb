class Api::TestsController < ApplicationController
  before_action :set_test, only: [:show, :edit, :update, :destroy]

  # GET /tests
  def index
    @tests = Test.all
    render :json => @tests
  end

  # GET /tests/1
  def show
    render :json => @test
  end

  # POST /tests
  def create
    @test = Test.new(test_params)
    if @test.save
      render :json => @test
    else
      render :json => "CREATE FAILURE", status: 404
    end
  end

  # PATCH/PUT /tests/1
  def update
    if @test.update(test_params)
      render :json => @test
    else
      render :json => @test, status: 404
    end
  end

  # DELETE /tests/1
  def destroy
    if @test.destroy
      render :json => "DELETE SUCCESS", status: 204
    else
      render :json => "DELETE FAILURE", status: 404
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_test
      @test = Test.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def test_params
      ActiveModelSerializers::Deserialization.jsonapi_parse(params)
      #params.require(:data).require(:attributes).permit(:name, :state, :feature_id)
    end
end

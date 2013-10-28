#Changes Made Tangerine.user.name to string
@Result = Backbone.Model.extend

  url: "result"
  
  # name : currentView.model.get "name"
  # data : currentView.getResult()
  # subtestId : currentView.model.id
  # sum : currentView.getSum()
  #   { correct, incorrect, missing, total }
  #   

  initialize: ( options ) ->
    console.log "Initializa For Result"
    # could use defaults but it messes things up
    if options.blank == true
      console.log "if Options.blank == true Condition"
      @set
        'subtestData' : []
        'start_time'  : (new Date()).getTime()
        'enumerator'  : "Tangerine.user.name"

      @unset "blank" # options automatically get added to the model. Lame.

  add: ( subtestDataElement ) ->
    console.log "Add Function Of Model Result"
    subtestData = @get 'subtestData'
    subtestData['timestamp'] = (new Date()).getTime()
    subtestData.push subtestDataElement
    @save
      'subtestData' : subtestData

  getGridScore: (id) ->
    console.log "getGridScore Function Of Model Result"
    for datum in @get 'subtestData'
      return parseInt(datum.data.attempted) if datum.subtestId == id

  gridWasAutostopped: (id) ->
    console.log "gridWasAutostopped Function Of Model Result"
    for datum in @get 'subtestData'
      return datum.data.auto_stop if datum.subtestId == id
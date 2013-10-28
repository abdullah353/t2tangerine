@Assessment = Backbone.Model.extend
	url: 'assessment'
	initialize: (options={}) ->
		console.log "initialize Assessment Model"

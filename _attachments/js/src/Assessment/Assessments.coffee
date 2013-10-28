@Assessments = Backbone.Collection.extend
	model: Assessment
	url: 'assessment'

	initialize: (options) ->
		console.log "Intialized Assessments Collection"
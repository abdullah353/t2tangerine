@AssessmentView = Backbone.View.extend
	model: Assessment
	initialize: () ->
		@render()
	render: () ->
		console.log "Rendering AssessmentView"
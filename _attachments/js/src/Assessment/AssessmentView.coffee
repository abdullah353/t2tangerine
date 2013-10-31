@AssessmentView = Backbone.View.extend
	tagName: 'table',
	template: null,
	initialize: () ->
		@template =  _.template("<% print('Hello ' + epithet); %>")
	render: () ->
		console.log "Rendering AssessmentView"
		@$el.html( @template({epithet: "stooge"}) )
		@ 
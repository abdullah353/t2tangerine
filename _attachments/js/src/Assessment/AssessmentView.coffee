@AssessmentView = Backbone.View.extend
	tagName: 'table',
	template: null,
	initialize: () ->
		@template =  Handlebars.compile($("#entry-template").html())
	render: () ->
		console.log "Rendering AssessmentView"
		@$el.html( @template(this.collection.toJSON()) )
		@ 
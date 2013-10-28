@Results = Backbone.Collection.extend
	model: Result
	url: "/result"
	db:
		view: "resultsByAssessmentId"
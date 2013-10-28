@Questions = Backbone.Collection.extend

  model : Question
  url   : "question"
  db:
    view: "questionsByAssessmentId"

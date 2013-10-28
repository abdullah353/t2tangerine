@Question = Backbone.Model.extend

  url: "question"

  config:
    types : [ "multiple", "single", "open" ]

  defaults:
    order  : 0
    prompt : "Is this an example question?"
    hint   : "[hint or answer]"

    # main question types
    type : "single"

    # question features
    otherWriteIn : false
    options      : [] # tricky bit, contains `label`,`value` property

    # outside requirements
    linkedGridScore : 0

    # Within subtest requirements
    skipLink        : null
    skipRequirement : null

  initialize: ( options )->
    console.log "Initialized Question Model With Some Defaults Fields"
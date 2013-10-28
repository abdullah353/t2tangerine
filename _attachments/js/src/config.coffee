@Config = {}

@Config = 
	"db_name" : "backbone"
	"design_doc" : "tangerinesam"
#Backbone Configuration
Backbone.couch_connector.config.db_name = Config.db_name;
Backbone.couch_connector.config.ddoc_name = Config.design_doc;
Backbone.couch_connector.config.global_changes = true;
_.templateSettings = 
  interpolate : /\{\{(.+?)\}\}/g

#Configuring jQuery Coundb Plugins
Config.$db  = $.couch.db(Config.db_name)

#Building Config.settings
Config.$db.openDoc "Config", {success: (data) -> Config.config = data}, {async:false}

#Building Config.settings
Config.$db.openDoc "TangerineSettings", {
	success:(data) -> Config.settings = data
	error: (code) ->
    if code == 404
      Config.$db.openDoc "TangerineSettingsDefault", {
        success: (doc) ->
          doc._id = "TangerineSettings"
          doc._rev = undefined
          Config.settings = doc
          Config.$db.saveDoc doc
      }, { async: false }
}, { async: false }


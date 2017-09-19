define([
	'underscore',
	'backbone',
	'marionette',
	'componentmodel'
], function (_, Backbone, Marionette, ComponentModel) {

	var ComponentBase = Backbone.Marionette.CompositeView.extend({
		parent: null,
		children: [],
		validation: {},
		value: null,
		initialize: function (options) {
		    this.__preInitialize(this);
			this.on('render', function (e) {
				var that = this;
				var components = this.model.get('components');

				if (components != undefined && components.length > 0) {
					//if (App.components == undefined || App.components == null)
					//    App.components = [];
				    // Localize or create a new JavaScript Template object.
					App.components = window.componentCache = window.componentCache || {};

					_.each(components, function (item) {
						that.$el.append('<div id="' + item.componentId + '"></div>');
						
						var componentClass;						
						
						//if (App.components[item.type] == null) {
							require(['/Scripts/ColonyCMS/_js/src/component/' + item.type + '.js'], function (type) {
								componentClass = type;
								
								App.components[item.type] = componentClass;
								that.__loadComponent(that, item, componentClass);
							});
						//}
						//else
						//{
						//    componentClass = App.components[item.type];
						//    that.__loadComponent(that, item, componentClass);
						//}
					});
				}
				this.stickit();
			});
			this.__postInitialize(this);
		},
		__loadComponent: function (that, item, componentClass) {
			if (componentClass != undefined) {
				var model = new ComponentModel(item);
				that.__mappings(item, model);
				var component = new componentClass({ model: model, parent: that });
				$('div#' + item.componentId, '.content').replaceWith(component.render().el).fadeIn('fast');
			}
		},
		__mappings: function (item, model) {
		    //var cache = App.Session.get(window.location.toString());
			if (item.map) {
				_.each(item.map, function (mapping) {
					if (mapping.source.indexOf('<%') >= 0) {
					    try {
							model.set(mapping.friendlyName.toLowerCase(), _.template(mapping.source)());
						}
						catch (err) {
							model.set(mapping.friendlyName.toLowerCase(), '');
						}
					} else if (mapping.source.indexOf('.') >= 0) {
						var dataparts = mapping.source.split('.');
						if (dataparts.length == 2) {
							if (dataparts[0] == 'querystring') {
								model.set(mapping.friendlyName.toLowerCase(), App.QueryString[dataparts[1]]);
							}
							//else if (dataparts[0] == 'cache' && cache != null && cache != undefined) {
							//    model.set(mapping.friendlyName.toLowerCase(), cache[dataparts[1]]);
							//}
							else if (App.data && App.data[dataparts[0]] != null && App.data[dataparts[0]][dataparts[1]] != null) {
								model.set(mapping.friendlyName.toLowerCase(), App.data[dataparts[0]][dataparts[1]].toString());
							}
							else if (mapping.default != undefined) {
								model.set(mapping.friendlyName.toLowerCase(), mapping.default);
							}
							else {
								model.set(mapping.friendlyName.toLowerCase(), '');
							}
								
						}
					} else {
						model.set(mapping.friendlyName.toLowerCase(), App.data[mapping.source]);
					}
				});									
			}
		},
		mapEventNames: function (EventName) {
			return null;
		},
		__behaviourEvent: function (e) {
		    e.preventDefault();
		    var current = e.target;
		    var mappedEvent = this.mapEventNames(e.type);
		    var origMappedEvent = mappedEvent;
			if (mappedEvent === "submit") {
			    if ($(current).data('submitter') != null && $(current).data('submitter') != undefined && $(current).data('submitter') != '')
			        mappedEvent = $(current).data('submitter');
			}
			if (!mappedEvent) {
				console.error("Event '" + e.type + "' has not been mapped");
				return false;
			}
			if (_.indexOf(_.pluck(App.messages, "trigger"), mappedEvent) == -1) {
			    if (origMappedEvent === "submit")
			        mappedEvent = "submit";
			}
			if (_.indexOf(_.pluck(App.messages, "trigger"), mappedEvent) == -1)
				return false;
			var currentMessage = App.messages[_.indexOf(_.pluck(App.messages, "trigger"), mappedEvent)];
			switch (origMappedEvent) {
			    case "submit":
					if (this.$el.closest('form').valid()) {
			            App.vent.trigger('colony:beforesubmit');
			            this.__sendMessage("submit", new Date().getTime(), currentMessage.behaviourId, this.componentId, currentMessage.message, this.getMessageData(), this.__messageResponse, currentMessage.success, this);
			        }			        
					else
					{
					    if ($('.alertInfo.error').length > 0)
					    {
					        $('html,body').animate({ scrollTop: ($('.alertInfo.error').position().top - $('#topnav').outerHeight()) }, 300, "easeOutBounce");
					    }
					}
					return false;
					break;
				case "delete":
					this.__sendMessage("delete", new Date().getTime(), currentMessage.behaviourId, this.componentId, currentMessage.message, this.componentId, this.__messageResponse, currentMessage.success, this);
					return false;
					break;
			    case "updateorder":
			        return false;
			        break;
			}
		},
		__messageResponse: function (trigger, data, onSuccess, that) {
		    console.log(data);
			if (data.success == true && !data.data.validationErrors) {
				if (onSuccess != null && onSuccess != undefined && onSuccess.indexOf("redirect:") >= 0) {
				    var redirectTo = _.template(onSuccess.substring(9))({ data: data });
				    
				    var newFragment = Backbone.history.getFragment(redirectTo);
				    if (Backbone.history.fragment == newFragment) {
				        // need to null out Backbone.history.fragement because 
				        // navigate method will ignore when it is the same as newFragment
				        Backbone.history.fragment = null;
				        Backbone.history.navigate(newFragment, true);
				    }
					else {
				        App.Router.navigate(redirectTo, true);
				    }
				}
				else if (onSuccess != null && onSuccess != undefined && onSuccess.indexOf("reload") >= 0) {
				    window.location.reload();
				}
				else if (onSuccess != null && onSuccess != undefined && onSuccess.indexOf("refresh") >= 0) {
				    var model = new ComponentModel(data);
				    that.__mappings(data.data, model);
				    that.render();
				}
				else if (onSuccess != null & onSuccess != undefined && onSuccess.indexOf("execute:") >= 0) {
				    var func = onSuccess.substring(8);
				    if (func != null && func != undefined && func != "") {
				        window[func].apply(that, [data]);
				    }
				}
				App.Colony.setStatusMessage('Your content has saved successfully', 'confirmation');
			}			    
			else if (data.success == true && data.data.validationErrors)
			{
			    for (var i = 0; i < data.data.validationErrors.length; i++)
			    {
			        $('#' + data.data.validationErrors[i].memberNames[0]).before('<div for="' + data.data.validationErrors[i].memberNames[0] + '" class="alertInfo error">' + data.data.validationErrors[i].errorMessage + '</div>');
			    }
			    if ($('.alertInfo.error').length > 0) {
			        $('html,body').animate({ scrollTop: ($('.alertInfo.error').position().top - $('#topnav').outerHeight()) }, 300, "easeOutBounce");
			    }
			}
			else if (data.success == false) {
				App.Colony.setStatusMessage('There was a problem saving your content.  Please see javascript console for details of the error.', 'error');
				console.error(data.data);
			}
		},
		__sendMessage: function (trigger, eventTimeStamp, behaviourId, componentId, message, messageParams, delegatedResponse, onSuccess, that) {
			var formData = _.extend(messageParams, { trigger: trigger, eventTimeStamp: eventTimeStamp, componentId: componentId });
			console.log(formData);
			var params = '';
			if (App.QueryString != undefined) {
				params = $.param(App.QueryString);
				if (params.length > 0)
					params = '&' + params;
			}
			
			$.ajax({
				url: "/api/behaviours/?behaviourId=" + behaviourId + "&message=" + message + params,
				type: "POST",
				data: formData,
				success: function (d) {
					delegatedResponse(trigger, d, onSuccess, that);
				},
				error: function () {
					console.error("Component Error: " + componentId + " Event '" + trigger + "' failed to respond");
				}
			});
		},
		multiPluck: function (collection, mappings) {
		    //console.log(collection);
			var returnValue = _.map(collection, function (item) {
				var currentRow = {};
				_.each(mappings, function (mapping) {
					if (mapping.source.indexOf('<%') >= 0) {
						try {
							currentRow[mapping.friendlyName] = _.template(mapping.source)(item);
						}
						catch (err) {
							currentRow[mapping.friendlyName] = ''
							//Do nothing.  Leave field blank.
						}
					}
					else {
						currentRow[mapping.friendlyName] = item[mapping.source];
					}
					//console.log(mapping);
					//console.log(currentRow);
				});
                if (!currentRow["id"])
				    currentRow["id"] = item["id"];
				return currentRow;
			});
			//console.log(returnValue);
			return returnValue;
		},
		__preInitialize: function (self) {

		},
		__postInitialize: function (self) {

		},
		getMessageData: function () {
			return "";
		},
		templateHelpers: {
			labelhelper: function () {
				if (this.label) {
					
					if (this.validation && this.validation.required && this.validation.required == true) {
						return this.label + '<span class="required">required</span>';
					}
					else
						return this.label;
				}
				else
					return "";
			},
			helpTextHelper: function () {
				if (this.helptext) {
			        return '<div class="alertInfo message">' + this.helptext + '</div>';
			    }
			    return '';
			},
			validationClasses: function () {
				if (this.validation) {
					var rules = "";
					_.each(this.validation, function (item, key) {
						rules += key + '="' + item + '" ';
					});
					return rules;
				}
				return "";
			},
			checkedHelper: function () {
				var val = '';
				if (this.value != undefined)
					val = this.value.toString();
				if (val == "true" || val == "1")
					return true;
				return false;
			}
		},
		onBeforeClose: function () {
		    App.unsubscribe(this.id);
		}
	});
	return ComponentBase;
});
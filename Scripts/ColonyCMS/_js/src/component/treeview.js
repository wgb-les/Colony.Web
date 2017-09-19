define([
	'backbone',
	'marionette',
	'componentbase'
], function (Backbone, Marionette, ColonyBase) {
	var that;
	// The recursive tree view
	var TreeView = Backbone.Marionette.CompositeView.extend({
		tagName: "li",
		itemTemplate: null,
		sortable: true,
		events: {
			"click a.treeview-node": "expandThis"
		},

		initialize: function (options) {
			// grab the child collection from the parent model
			// so that we can render the collection as children
			// of this parent node
			this.collection = this.model.nodes;
			var self = this;
			this.template = 'treeview/treenode';
			this.itemTemplate = 'treeview/treenode';
		},

		appendHtml: function (cv, iv) {
			cv.$("ul:first").append(iv.el);
		},
		onRender: function () {
			if (_.isUndefined(this.collection)) {
				this.$("ul:first").remove();
			}
			if (that != null && that != undefined) {
				var messages = _.where(that.model.get('messages'), { 'message': 'UpdateOrder' });
				if (messages.length > 0) {

					var fixHelper = function (e, ui) {
						ui.children().each(function () {
							$(this).width($(this).width());
						});
						return ui;
					};
					this.$('ul').sortable({
						helper: fixHelper,
						items: '>li',
						toleranceElement: '>a',
						connectWith: 'ul',
						tolerance: 'pointer',
						forceHelperSize: true,
						forcePlaceholderSize: true,
						nested: 'ul',
						start: function (e, ui) {
							ui.helper.css('border', '1px solid #e7e7e7');
						},
						update: function (e, ui) {
							$(ui.item).css('border', '0px');
							$(ui.item).css('border-top', '1px solid #e7e7e7');
							$(ui.item).css('background-color', '#ffff99');
							var currentMessage = messages[0];
							that.__sendMessage("sort", new Date().getTime(), currentMessage.behaviourId, that.componentId, currentMessage.message, { entityId: $(ui.item).children('a').attr('id'), insertBeforeEntityId: $(ui.item).next('li').children('a').attr('id'), parentId: $(ui.item).parents('ul').siblings('a').attr('id') || 0 }, that.__messageResponse, currentMessage.success, that);
							$(ui.item).animate({ 'background-color': '#ffffff' }, 2000, 'linear', function () { });
						}
					}).disableSelection();
				}
			}
			this.$el.children('a.treeview-node').css({ 'padding-left': this.model.get('depth') + 'em' });
			if (!this.model.hasChildren()) {
				this.$el.children('a.treeview-node').children('.icon').css({ 'background-image': 'none' });
			}
		},
		getTemplate: function () {
			return this.model.collection.itemTemplate;
		},

		expandThis: function (e) {
			e.preventDefault();
			if ($(e.currentTarget).attr('id') == this.$el.children('a').attr('id')) {
				if (!this.$el.hasClass('expanded')) {
					this.model.expandThis();
					if (this.model.nodes != null && this.model.nodes != undefined) {
						if (this.model.nodes.length > 0) {
							this.collection = this.model.nodes;
							this.render();
						}
					}
				}
				else {
					this.model.nodes = [];
					this.collection = this.model.nodes;
					this.render();
				}
				if (this.collection == null || this.collection == undefined || this.collection.length == 0) {
					this.$("ul:first").remove();
				}
				this.$el.toggleClass('expanded');
			}
		},
		itemViewOptions: function (model, index) {
			model.set('depth', this.model.get('depth') + 1);
			return {
				"model": model,
				"template": this.itemTemplate,
				"collection": model.get('collection')
			};
		}
	});

	// The tree's root: a simple collection view that renders 
	// a recursive tree structure for each item in the collection
	var TreeRoot = Backbone.Marionette.CollectionView.extend({
		tagName: "ul",
		className: "treeview-hierarchy",
		itemView: TreeView,
		itemTemplate: null,
		initialize: function (options) {
			this.itemTemplate = options.itemTemplate;
			this.render();
		},
		itemViewOptions: function (model, index) {
			model.set('depth', 0);
			return {
				"model": model,
				"template": this.itemTemplate
			};
		}
	});


	TreeNode = Backbone.Model.extend({
		expandThis: function () {
			var nodes = expandNode(this.collection.rootData, this.get("id"), this.collection.parentIdentifier); //this.get("nodes");
			if (nodes) {
				this.nodes = new TreeNodeCollection(nodes, this.collection.rootData, this.collection.itemTemplate, this.collection.parentIdentifier);
				this.unset("nodes");
			}
		},
		hasChildren: function () {
			var nodes = expandNode(this.collection.rootData, this.get("id"), this.collection.parentIdentifier); //this.get("nodes");
			return (nodes.length > 0);
		}

	});

	TreeNodeCollection = Backbone.Collection.extend({
		model: TreeNode,
		rootData: null,
		itemTemplate: null,
		parentIdentifier: null,
		initialize: function (coll, data, itemTemplate, parentIdentifier) {
			this.rootData = data;
			this.collection = coll;
			this.itemTemplate = itemTemplate;
			this.parentIdentifier = parentIdentifier;
		}
	});

	function expandNode(data, parentId, parentIdentifier) {
		//var childNodes = [];
		//if (data != undefined && data != null) {
		//	for (var i = 0; i < data.length; i++) {
		//	    if (data[i][parentIdentifier] == null || data[i][parentIdentifier] == undefined)
		//		    data[i][parentIdentifier] = 0;
		//		if (data[i][parentIdentifier] == parentId) {
		//			childNodes.push(data[i]);
		//		}
		//	}
		//	return childNodes;
		//}
		return _.filter(data, function (item) { return ((item[parentIdentifier] == null || item[parentIdentifier] == undefined) ? 0 : item[parentIdentifier]) == parentId; });
	}

	Hierarchy = ColonyBase.extend({
		className: "field hierarchy",
		tagName: 'div',
		template: 'empty',
		treeView: null,
		tree: null,
		parentIdentifier: 'parentId',
		initialize: function () {
			this.parentIdentifier = this.model.get('parentIdentifier') || 'parentId';
			this.tree = new TreeNodeCollection(
				expandNode(
					window.App.data[this.model.get('dataCollection')],
					0,
					this.parentIdentifier
				),
				window.App.data[this.model.get('dataCollection')],
				_.template(generateRowTemplate(this.model.get('map'), this.model.get('actions')))
				, this.parentIdentifier);
			this.treeView = new TreeRoot({
				collection: this.tree,
				itemTemplate: _.template(generateRowTemplate(this.model.get('map'), this.model.get('actions')))
			});
		},
		onRender: function () {
			that = this;
			this.treeView.render();
			this.$el.empty();
			this.$el.append('<div class="hierarchy-header"><span class="title">Title</span><span class="actions">Actions</span>');
			this.$el.append(this.treeView.$el);
			$('.tooltipster').tooltipster({
				fixedWidth: 200
			});
			this.$el.find('.icon-link').click(function (e) {
				e.preventDefault();
				var iframe = $('<div style="width: 100%; height: 100%;"><iframe src="' + $(this).attr('href') + '" width="100%" height="100%" border="0" style="width: 100%; height: 100%; border: none; padding: 0 0 0 0; margin: 0 0 0 0;"></iframe></div>').dialog({
					width: $(window).width() * 0.75,
					height: $(window).height() * 0.75,
					title: 'Preview Page',
					modal: true
				});
			});
			var messages = _.where(that.model.get('messages'), { 'message': 'UpdateOrder' });
			if (messages.length > 0) {
				var fixHelper = function (e, ui) {
					ui.children().each(function () {
						$(this).width($(this).width());
					});
					return ui;
				};
				this.$('ul').sortable({
					helper: fixHelper,
					items: '>li',
					toleranceElement: '>a',
					connectWith: 'ul',
					tolerance: 'intersect',
					forceHelperSize: true,
					forcePlaceholderSize: true,
					nested: 'ul',
					start: function (e, ui) {
						ui.helper.css('border', '1px solid #e7e7e7');
					},
					update: function (e, ui) {
						$(ui.item).css('border', '0px');
						$(ui.item).css('border-top', '1px solid #e7e7e7');
						$(ui.item).css('background-color', '#ffff99');
						var currentMessage = messages[0];
						that.__sendMessage("sort", new Date().getTime(), currentMessage.behaviourId, that.componentId, currentMessage.message, { entityId: $(ui.item).children('a').attr('id'), insertBeforeEntityId: $(ui.item).next('li').children('a').attr('id'), parentId: $(ui.item).parents('ul').siblings('a').attr('id') || 0 }, that.__messageResponse, currentMessage.success, that);
						$(ui.item).animate({ 'background-color': '#ffffff' }, 2000, 'linear', function () { });
					}
				}).disableSelection();
			}
		}
	});

	function generateRowTemplate(mapping, actions) {
		var s = "";
		s += '<a href="javascript:void(0);" id="<%=id%>" class="treeview-node"><span class="icon"></span>';
		_.each(mapping, function (i) {
			s += '<span class="title"><%=' + i.source + '%></span>';
		});
		s += '</a><span class="hierarchy-actions">';
		_.each(actions, function (i) {
			s += '<a href="' + i.url + '" class="tooltipster icon-large no-text icon-' + i.icon + '" title="' + i.name + '"><span>' + i.name + '</span></a>';
		});
		s += '</span><ul></ul>';
		return s;
	}

	return Hierarchy;
});
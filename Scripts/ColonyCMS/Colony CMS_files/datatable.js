define([
	'backbone',
	'marionette',
	'componentbase',
	'backbone.datagrid'
], function(Backbone, Marionette, ColonyBase) {
	var model = Backbone.Model.extend({});
	var collection = Backbone.Collection.extend({ model: model });
	var that;
	var Pagination = Backbone.Datagrid.Pagination = Backbone.View.extend({
		className: 'pagination pagination-centered',

		events: {
			'click li:not(.disabled) a': 'page',
			'click li.disabled a': function (e) { e.preventDefault(); }
		},

		initialize: function () {
			this.pager = this.options.pager;
		},

		render: function () {
			var pg = window.datagrid1.pager;
			if (pg.get('totalPages') > 0) {

				var ulMarkup = _.template('<span>Showing page <%=pager.get("currentPage")%> of <%=pager.get("totalPages")%></span>&#160;&#160;<ul style="display: inline-block"></ul>')({ pager: pg });
				var $pager = $(ulMarkup), $li;
				var $ul = $pager.filter('ul');
				$li = $('<li class="first"><a href="#">&lt;&lt;</a></li>');
				if (!pg.hasPrev()) {
					$li.addClass('disabled');
				}
				$ul.append($li);

				$li = $('<li class="prev"><a href="#">&lt;</a></li>');
				if (!pg.hasPrev()) {
					$li.addClass('disabled');
				}
				$ul.append($li);

				if (pg.hasTotal()) {
					for (var i = 1; i <= pg.get('totalPages') ; i++) {
						if ((i > parseInt(pg.get('currentPage')) - 5) &&
							(i < parseInt(pg.get('currentPage')) + 5)) {
							$li = $('<li></li>');
							if (i == pg.get('currentPage')) {
								$li.addClass('active');
							}
							$li.append('<a href="#">' + i + '</a>');
							$ul.append($li);
						}
					}
				}

				$li = $('<li class="next"><a href="#">&gt;</a></li>');
				if (!pg.hasNext()) {
					$li.addClass('disabled');
				}
				$ul.append($li);
				$li = $('<li class="last"><a href="#">&gt;&gt;</a></li>');
				if (!pg.hasNext()) {
					$li.addClass('disabled');
				}
				$ul.append($li);
				this.$el.html($pager);
			}
			else {
				this.$el.html('');
			}


			return this;
		},

		page: function (event) {
			var $target = $(event.target), page;
			if ($target.parent().hasClass('prev')) {
				this.pager.prev();
			} else if ($target.parent().hasClass('next')) {
				this.pager.next();
			} else if ($target.parent().hasClass('first')) {
				this.pager.page(1);
			} else if ($target.parent().hasClass('last')) {
				this.pager.page(this.pager.get('totalPages'));
			}
			else {
				this.pager.page(parseInt($(event.target).html(), 10));
			}
			this.render();
			return false;
		}
	});

	var Row = Backbone.Datagrid.Row = Backbone.View.extend({
		tagName: 'tr',

		initialize: function () {
			console.log(this.model);
			this.columns = this.options.columns;
			this.model.on('change', this.render, this);
		},

		render: function () {
			this.$el.empty();
			_.each(this.columns, this.renderCell, this);
			return this;
		},

		renderCell: function (column) {
			var cellView = this._resolveCellView(column);
			this.$el.append(cellView.render().el);
		},

		_resolveCellView: function (column) {
			var options = {
				model: this.model,
				column: column
			};
			if (this.options.header || column.header) {
				options.tagName = 'th';
			}
			var cellClassName = column.cellClassName;
			if (_.isFunction(cellClassName)) {
				cellClassName = cellClassName(this.model);
			}
			options.className = cellClassName;


			var view = column.view || Cell;

			// Resolve view from string or function
			if (typeof view !== 'object' && !(view.prototype && view.prototype.render)) {
				if (_.isString(view)) {
					options.callback = _.template(view);
					view = CallbackCell;
				} else if (_.isFunction(view) && !view.prototype.render) {
					options.callback = view;
					view = CallbackCell;
				} else {
					throw new TypeError('Invalid view passed to column "' + column.title + '".');
				}
			}

				// Resolve view from options
			else if (typeof view === 'object') {
				_.extend(options, view);
				view = view.type;
				if (!view || !view.prototype || !view.prototype.render) {
					throw new TypeError('Invalid view passed to column "' + column.title + '".');
				}
			}

			return new view(options);
		}
	});


	var DataTable = ColonyBase.extend({
		template: 'datatable',
		className: 'dataTable',
		sortable: true,
		initialize: function() {
			this.id = this.model.get('componentId');
		},
		onRender: function() {
			that = this;
			that.collection = new collection(that.multiPluck(window.App.data[that.model.get('dataCollection')], that.model.get('map')));
			window.datagrid1 = new Backbone.Datagrid({
				collection: that.collection,
				inMemory: true,
				paginated: true,
				footerControls: {
					left: {
						control: Pagination,
						full: true
					}
				},
				perPage: 10
			});
			window.datagrid1.columns.push({
				title: 'Actions',
				property: 'Actions',
				view: _.template(that.generateActionsColumn(that.model.get('actions'))),
				cellClassName: 'datatable-actions',
				sortable: false
			});
			//_.each(window.datagrid1.columns, function (col) {
			//    console.log(col);
			//});
			delete window.datagrid1.columns[window.datagrid1.columns.length - 2];
			for (var i = 0; i < window.datagrid1.columns.length; i++) {
				if (window.datagrid1.columns[i] != undefined && window.datagrid1.columns[i].property.substring(0, 1) === "_")
					delete window.datagrid1.columns[i];
			}
			window.datagrid1.render();
			// Return a helper with preserved width of cells
			var fixHelper = function (e, ui) {
				ui.children().each(function () {
					$(this).width($(this).width());
				});
				return ui;
			};
			this.$el.html(window.datagrid1.el);
			var messages = _.where(that.model.get('messages'), { 'message': 'UpdateOrder' });
			if (messages.length > 0) {
				var fixHelper = function (e, ui) {
					ui.children().each(function () {
						$(this).width($(this).width());
					});
					return ui;
				};

				this.$el.children("div").children("table").children("tbody").sortable({
					helper: fixHelper,
					start: function (e, ui) {
						ui.helper.css({'border': '1px solid #e7e7e7', 'background-color': '#ffffff' });
					},
					update: function (e, ui) {
						$(ui.item).css('border', '0px');
						$(ui.item).css('background-color', '#ffff99');
						var currentMessage = messages[0];
						that.__sendMessage("sort", new Date().getTime(), currentMessage.behaviourId, that.componentId, currentMessage.message, { entityId: $(ui.item).attr('id'), insertBeforeEntityId: $(ui.item).next('tr').attr('id') }, that.__messageResponse, currentMessage.success, that);
						$(ui.item).animate({ 'background-color': '#ffffff' }, 2000, 'linear', function () { });
					}
				}).disableSelection();
			}
			
			//    this.$('ul').sortable({
			//        helper: fixHelper,
			//        items: '>li',
			//        toleranceElement: '>a',
			//        connectWith: 'ul',
			//        tolerance: 'intersect',
			//        forceHelperSize: true,
			//        forcePlaceholderSize: true,
			//        nested: 'ul',
			//        start: function (e, ui) {
			//            ui.helper.css('border', '1px solid #e7e7e7');
			//        },
			//        update: function (e, ui) {
			//            $(ui.item).css('border', '0px');
			//            $(ui.item).css('border-top', '1px solid #e7e7e7');
			//            $(ui.item).css('background-color', '#ffff99');
			//            var currentMessage = messages[0];
			//            that.__sendMessage("sort", new Date().getTime(), currentMessage.behaviourId, that.componentId, currentMessage.message, { entityId: $(ui.item).children('a').attr('id'), insertBeforeEntityId: $(ui.item).next('li').children('a').attr('id'), parentId: $(ui.item).parents('ul').siblings('a').attr('id') || 0 }, that.__messageResponse, currentMessage.success);
			//            $(ui.item).animate({ 'background-color': '#ffffff' }, 2000, 'linear', function () { });
			//        }
			//    }).disableSelection();
			//}

			$('.tooltipster').tooltipster({
				fixedWidth: 200
			});
		},
		generateActionsColumn: function (items) {
			var s = '';		    
			_.each(items, function (i, ix) {
				if (i.type == "checkbox")
				{
					
					s += '<div class="field checkbox " style="margin: 0 0 15px 0; padding: 0 0 0 0; border: none;">';
					s += '<input type="checkbox" name="' + i.id + '" id="' + i.id + '_<%=id%>" value="<%=id%>" />';
					s += '<label for="' + i.id + '_<%=id%>"><span></span></label>';
					s += '</div>';			        
				}
				else
				{
					s += '<a href="' + i.url + '" class="tooltipster icon-large no-text icon-' + i.icon + '" title="' + i.name + '"><span>' + i.name + '</span></a>';
				}
			});
			return s;
		}
	});
	
	return DataTable;	
});
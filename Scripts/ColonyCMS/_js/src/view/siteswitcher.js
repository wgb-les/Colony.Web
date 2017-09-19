define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {

	var SiteModel = Backbone.Model.extend({});
	var SiteCollection = Backbone.Collection.extend({ model: SiteModel });
	
	var SiteView = Backbone.Marionette.ItemView.extend({
		tagName: 'option',
		template: 'empty',
		onRender: function () {
			this.$el.attr('value', this.model.get('id'));
			this.$el.text(this.model.get('name'));
		}
	});
	
	var SiteSwitcher = Backbone.Marionette.CompositeView.extend({
		itemView: SiteView,
		tagName: 'label',
		template: 'siteswitcher',
		id: 'siteSelectorDropdown',
		//initialize: function(options) {
		//    this.collection = new SiteCollection(options.data);
		//    var that = this;
		//    App.vent.on('colony:currentsiteidupdated', function () {
		//        console.log('site id updated');
		//        that.render();
		//    });
		//},
		//onRender: function () {
		//    this.$el.parent().css('display', 'inline-block');
		//},
		initialize: function() {
			var that = this;
			App.vent.on('colony:currentsiteidupdated', function (e) {
				that.$('select').val(App.Colony.currentSiteId);
			});		    
		},
		appendHtml: function (collectionView, itemView, index) {
			collectionView.$el.find('select').append(itemView.el);
		},
		onRender: function () {
			this.$('select').val(App.Colony.currentSiteId);
			this.$('select').change(function (e) {
				App.Colony.setCurrentSiteId($(this).val());
			});
		}
	});
	
	return SiteSwitcher;
});
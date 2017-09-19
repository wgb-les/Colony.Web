define([
	'backbone',
	'marionette',
	'formcomponent',
	'pageheading',
	'siteswitcher',
	'languageswitcher',
	'navigation',
	'src/view/status'
], function(Backbone, Marionette, FormComponent, PageHeading, SiteSwitcher, LanguageSwitcher, Navigation, Status) {
	var ColonyApplicationLayout = Backbone.Marionette.Layout.extend({
		template: 'layout/application',
		regions: {
			regionUserInfo: '#colonyUser', // Will contain any user controls (login/logout).
			regionContent: '#content', // Will contain the page content.
			regionNavigation: '#nav', // CMS Left-hand Navigation
			//regionLanguageSwitcher: '#topnav #languageSelector', // CMS Language Selector dropdown
			regionSiteSwitcher: '#topnav #siteSelector', // CMS Site Selector dropdown
			regionNotifications: '#colonyInbox', // CMS Inbox button/dropdown
			//regionSettings: '#colonySettings', // CMS Settings button/dropdown
			regionSearch: '', // CMS Search
			regionTabs: '', // CMS Tab bar
			regionPageHeading: '#pageHeading', // CMS Page Heading
			regionBreadcrumb: '', // CMS breadcrumb trail
			regionInfo: '#statusBar' // Contains any info messages.
		},
		onRender: function () {
			this.onModelSet();
			this.model.bind("change", this.onModelSet);
			var that = this;
			var SwitcherModel = Backbone.Model.extend({});
			var SwitcherCollection = Backbone.Collection.extend({ model: SwitcherModel });
			this.regionSiteSwitcher.show(new SiteSwitcher({ collection: new SwitcherCollection(App.Colony.getSites()) }));
			that.renderNavigation(that);
			App.vent.on('colony:currentsiteidupdated', function () {
				that.renderNavigation(that);
				App.Router.navigate(window.location.hash.replace(/siteId=\d+/gi,'siteId='+App.Colony.currentSiteId), { trigger: true });
			});
		},
		renderNavigation: function (that) {
			var nav = sessionStorage.getItem('navigation');
			var NavModel = Backbone.Model.extend({});
			var NavCollection = Backbone.Collection.extend({ model: NavModel });

			if (!nav) {
				$.ajax({
					url: '/Scripts/ColonyCMS/navigation.json',
					dataType: 'json',
					async: false,
					success: function (d) {
						var navObj = d.leftnav;
						nav = JSON.stringify(navObj);
						sessionStorage.setItem('navigation', nav);
					}
				});
			}
			that.regionNavigation.show(new Navigation({ collection: new NavCollection(JSON.parse(nav)) }));
		},
		onModelSet: function() {
			var that = this;
			var ComponentModel = Backbone.Model.extend({});
			App.data = that.model.get('data');
			var page = that.model.get('page');
			if (page)
				App.messages = page.messages;
			else
				this.model.set('label', '');
			var PageHeadingModel = Backbone.Model.extend({});
			that.regionPageHeading.show(new PageHeading({ model: new PageHeadingModel(page) }));
			that.regionContent.show(new FormComponent({ model: new ComponentModel({ components: that.model.get('componentContainer') }) }));
			that.regionInfo.show(new Status());
			that.$('#colonyUser span').html(App.Colony.getCurrentUser().firstName + ' ' + App.Colony.getCurrentUser().lastName);
			var logout = $('<a href="#" title="logout"> (Log out)</a>');
			that.$('#colonyUser span').append(logout);
			logout.click(function (e) { e.preventDefault(); App.Colony.logout(); return false; });
			
		}
	});	
	
	return ColonyApplicationLayout;
});

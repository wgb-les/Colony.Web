define(['jquery'], function () {
	var rootUrl = '';
	var _private = {

		statusMessage: '',
		sites: [],
		languages: [],
		currentUser: null

	};

	function getSitesInternal() {
		$.ajax({
			url: rootUrl + '/api/behaviours/?behaviourId=CmsListSite&message=ListSites',
			method: 'POST',
			async: false,
			success: function (data) {
				_private.sites = data.data.listSites;
			}
		});
	}

	function getLanguagesInternal() {
		$.ajax({
			url: rootUrl + '/api/behaviours/?behaviourId=CmsListSite&message=ListLanguages',
			method: 'POST',
			async: false,
			success: function (data) {
				_private.languages = data.data.listLanguages;
			}
		});
	}

	function setStatusMessageInternal(message) {
		_private.status = message;
		if (_private.status != '')
			App.vent.trigger('colony:statusmessageupdated');
	}

	function getStatusMessageInternal() {
		return _private.status;
	}

	function setCurrentSiteIdInternal(siteId) {
		Context.currentSiteId = siteId;
		App.vent.trigger('colony:currentsiteidupdated');
	}

	function isAuthenticatedInternal() {
		$.ajax({
			type: 'POST',
			url: rootUrl + "/members/authentication/getloggedinuserajax",
			success: function (data) {
				if (data.success) {
					_private.currentUser = data.user;
				}
				else {
					_private.currentUser = null;
				}
			},
			async: false
		});
		return (_private.currentUser != null);
	}

	function logOutInternal() {
		$.ajax({
			type: 'POST',
			url: rootUrl + "/members/authentication/logoutajax",
			async: false,
			success: function (data) {
				if (data.success) {
					_private.currentUser = null;

					App.vent.trigger('colony:loginevent');
				}
			}
		});
	}

	function loginInternal(formData) {
		var loggedIn = false;
		$.ajax({
			url: rootUrl + "/members/authentication/LoginAjax", 
			method: 'POST',
			async: false,
			data: formData, 
			success: function (data) {
				if (data.success == true && data.user) {
					_private.currentUser = data.user;
					App.vent.trigger('colony:loginevent');
					loggedIn = true;
				}
			}
		});

		return loggedIn;
	}

	var Context = {};
	Context.currentSiteId = 1;
	Context.currentLanguageId = 1;

	Context.id = 100;

	Context.getSites = function () {
		if (_private.sites == undefined || _private.sites == null || _private.sites.length == 0) {
			getSitesInternal();
		}
		//else
		//{
		//    $(document).trigger('colony:sitesloaded');
		//}
		return _private.sites;
	};

	Context.getLanguages = function () {
		
		if (_private.languages == undefined || _private.languages == null || _private.languages.length == 0) {
			getLanguagesInternal();
		}
		//else
		//{
		//    $(document).trigger('colony:languagesloaded');
		//}
		return _private.languages;
	};

	Context.setStatusMessage = function (message) {
		setStatusMessageInternal(message);
	}

	Context.getStatusMessage = function () {
		return getStatusMessageInternal();
	}

	Context.setCurrentSiteId = function (siteId) {
		setCurrentSiteIdInternal(siteId);
	}

	Context.getCurrentUser = function () {
		if (_private.currentUser)
			return _private.currentUser;
		return { name: "" };
	}

	Context.setCurrentUser = function (user) {
		_private.currentUser = user;
		Context.IsAuthenticated = (_private.currentUser != null);
	}

	Context.logout = function () {
		if (_private.currentUser != null)
			logOutInternal();
	}

	Context.login = function (formData) {
		var loggedIn = loginInternal(formData);
		return loggedIn;
	}

	Context.init = function () {
		Context.IsAuthenticated = isAuthenticatedInternal();
		//getSitesInternal();
		//getLanguagesInternal();
	}
	
	return Context;
});
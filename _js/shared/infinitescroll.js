/*

page

Used to denote the current page of data.  Defaults to 1


perPage

Used to denote the number of items per page.  Defaults to 10


remoteDataType

Defines the expected data type to be returned from the server.  One of the values ['html'|'xml'|'json'].  Defaults to 'json'


jsonDataTemplate

If remoteDataType is set to JSON, this template will be used to render the output in the container.  Expects an underscore template.


ajaxLoaderJQuery 

A JQuery object used to display an AJAX loader for long running processes.


ajaxDataDelegate

Delegate to retrieve the data to pass for the AJAX request (if any). 



*/
var imageLoaderBlankState = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var InfiniteScroll = function(container, ajaxUrl, perPage, append, remoteDataType, ajaxLoader, ajaxDataDelegate) {
    var page;
    /*
        Validation rules
    */
    if (remoteDataType != "json" &&
        remoteDataType != "xml" &&
        remoteDataType != "html")
        remoteDataType = null;

    if (perPage < 1)
        perPage = 10;

    /*
        Defaults
    */

    this.container = container || $("#infinite-scroll-container");
    this.ajaxLoader = ajaxLoader || $('<div class="infinite-scroll-loader"></div>');
    this.ajaxDataDelegate = ajaxDataDelegate;
    this.page = 2;
    this.perPage = perPage || 10;
    this.remoteDataType = remoteDataType || "json";
    this.append = append || true;
    this.ajaxUrl = ajaxUrl;

    var internal = {
        scrolltrigger: 0.8,
        disable: false,
        append: true,
        previousScrollX: 0,
        previousScrollY: 0,
        disableScroll: false,
        ajaxData: null,
        container: null,
        ajaxLoader: null,
        init: function(main) {
            var self = this;
            self.ajaxData = main.ajaxDataDelegate();
            self.container = main.container;
            self.ajaxLoader = main.ajaxLoader;
            self.append = main.append;
            var images = main.container.find("img");
            for (var i = 0; i < images.length; i++) {
                self.placeholderStart(images[i]);
            }
            $(window).on("scroll", function(e) {
                var scrollDir = self.getScrollDirection(this);
                if (scrollDir.Y === "down" && !self.disableScroll && !self.disable) {
                    self.disableScroll = true;
                    var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
                    if ((wintop / (docheight - winheight)) > self.scrolltrigger) {
                        self.triggerAjax(main, self.container);
                    }

                    setTimeout(function() { self.disableScroll = false; }, 1000);
                }
            });
        },
        getScrollDirection: function(scrollElem) {
            var self = this;
            var currentScrollTop = $(scrollElem).scrollTop();
            var currentScrollLeft = $(scrollElem).scrollLeft();
            var scrollDirectionX, scrollDirectionY;

            if (currentScrollTop > self.previousScrollY)
                scrollDirectionY = "down";
            else if (currentScrollTop < self.previousScrollY)
                scrollDirectionY = "up";
            if (currentScrollLeft > self.previousScrollX)
                self.scrollDirectionX = "right";
            else if (currentScrollLeft < self.previousScrollX)
                scrollDirectionX = "left";

            self.previousScrollY = currentScrollTop;
            self.previousScrollX = currentScrollLeft;

            return { X: scrollDirectionX, Y: scrollDirectionY };
        },
        placeholderStart: function(img) {
            var src = img.src;
            $(img).data("src", src);
            img.src = "/_images/placeholders/img-loader.gif";
            var imagePlaceholder = new Image();
            imagePlaceholder.src = src;
            imagePlaceholder.onload = function() {
                $(img).fadeOut("fast", function() {
                    $(img).attr("src", $(img).data("src"));
                    $(img).fadeIn("fast");
                });
            };
            imagePlaceholder.onerror = function() {
                $(img).fadeOut("fast", function() {
                    $(img).attr("src", $(img).data("src"));
                    $(img).fadeIn("fast");
                });
            };
        },
        //ajax: ajaxDelagate,
        //ajaxTimeout: 30000,
        //url: ajaxUrl,
        triggerAjax: function(main, container) {
            var self = this;
            //this.disable = null;
            var loader = self.ajaxLoader.clone();
            container.append(loader);
            loader.show();

            var url = main.ajaxUrl + "?page=" + main.page + "&perPage=" + main.perPage;
            var data = main.ajaxDataDelegate();
            if (data !== self.ajaxData)
                self.append = false;
            self.disable = $.ajax({
                url: url,
                type: "POST",
                data: data,
                success: function(data) {
                    loader.fadeOut().remove();
                    self.disable = null;
                    if (!self.append) {
                        container.html(data);
                    } else {
                        container.append(data);
                    }

                    var images = container.find("img");
                    for (var i = 0; i < images.length; i++) {
                        self.placeholderStart(images[i]);
                    }
                    main.page++;
                },
                error: function() {
                    loader.fadeOut().remove();
                    self.disable = null;
                }
            });
        }
    };

    internal.init(this);
    return this;
};
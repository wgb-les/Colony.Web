define([
	'backbone',
	'marionette',
	'componentbase',
	'backbone.datagrid'
], function (Backbone, Marionette, ColonyBase) {
    var model = Backbone.Model.extend({});
    var collection = Backbone.Collection.extend({ model: model });
    var that;
    var Pagination = Backbone.Datagrid.Pagination = Backbone.View.extend({
        className: 'pagination pagination-centered',

        events: {
            'click li:not(.disabled) a': 'page',
            'click li.disabled a': function (e) { e.preventDefault(); },
            'change select': function (e) {
                this.pager.set('perPage', $(e.target).val());
                this.pager.page(1);
                this.render();
                $(document).trigger('datatable:page');
            }
        },

        initialize: function () {
            this.pager = this.options.pager;
        },

        render: function () {
            var pg = window.datagrid1.pager;
            if (pg.get('total') > 10) {
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
                if (pg.get('total') > 10) {
                    var perPage = $('<div class="pager-perpage"><label for="perPage">Items to show per page: </label><select id="perPage"></select></div>');
                    for (var i = 10; i < (pg.get('total') + 9) && i < 101; i = i + 10) {
                        perPage.children('select').append('<option value="' + i.toString() + '">' + i.toString() + '</option>');
                    }
                    perPage.children('select').val(pg.get('perPage'));
                    this.$el.append(perPage);
                }
            }
            else {
                this.$el.html('');
            }

            return this;
        },

        page: function (event) {
            var $target = $(event.target), page;
            console.log($target);
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
                this.pager.page(parseInt($(event.target).html()), this.pager.get('perPage') || 10);
            }
            this.render();
            $(document).trigger('datatable:page');
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
        datacollection: [],
        initialize: function () {
            var that = this;
            that.id = that.model.get('componentId');

            App.subscribe(that.id, function (key) { if (key == that.model.get('dataCollection')) that.render() });
        },
        onRender: function () {
            that = this;
            that.datacollection = new collection(that.getCollection(that, that.model.get('dataCollection'), that.model.get('map')));

            window.datagrid1 = new Backbone.Datagrid({
                collection: that.datacollection,
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
            delete window.datagrid1.columns[window.datagrid1.columns.length - 1];
            if (that.model.get('actions')) {
                window.datagrid1.columns.push({
                    title: 'Actions',
                    property: 'Actions',
                    view: _.template(that.generateActionsColumn(that.model.get('actions'))),
                    cellClassName: 'datatable-actions',
                    sortable: false
                });
            }

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

            if (this.model.get('multiActions')) {
                var gButtons = '<tr><th colspan="' + (window.datagrid1.columns.length - 2) + '">Multiple Actions</th><td style="margin-left: auto; margin-right: auto ">';
                gButtons += that.generateMultiActionCell(that.model.get('multiActions')) + '</td></tr>';
                this.$el.find('table').append(gButtons);
                this.$el.find('a.multiaction').each(function () {
                    var messageHandler = this.attributes['data-messagehandler'].nodeValue;
                    var confirmMessage = this.attributes['data-confirmmessage'].nodeValue;
                    var checkId = this.attributes['data-checkid'].nodeValue;
                    var behaviourId = this.attributes['data-behaviourid'].nodeValue;

                    this.onclick = function (e) {
                        if (confirm(confirmMessage)) {
                            $('input:checked[name=' + checkId + ']').each(function () {

                                var id = this.value;
                                var callback = that.multiactionCallback;

                                var dataOverride = null;
                                if (typeof (this.attributes['data-override'] != 'undefined')) {
                                    dataOverride = this.attributes['data-override'].nodeValue;
                                    that.__sendMessage(messageHandler, new Date().getTime(), behaviourId, that.componentId, messageHandler, dataOverride, callback, "", that);
                                } else {
                                    that.__sendMessage(messageHandler, new Date().getTime(), behaviourId, that.componentId, messageHandler, "id=" + id, callback, "", that);
                                }
                            });
                        }
                    }
                })

            }

            if (this.model.get('csvMap')) {

                var tfoot = $('<tfoot><tr><th colspan="100%"></th></tr></tfoot>');
                var button = $('<a href="#" class="pull-right icon-download-alt" title="Export the data in this table as a CSV file"><span></span>Export CSV</a>');
                this.$el.find('table').append(tfoot);
                tfoot.find('th').append(button);
                button.on('click', function (e) { e.preventDefault(); that.exportCsv(that); return false; });
            }

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
                        ui.helper.css({ 'border': '1px solid #e7e7e7', 'background-color': '#ffffff' });
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
            $(document).on('click', '.datatable-actions a[data-trigger]', function (e) {

                var currentMessage = _.where(that.model.get('messages'), { 'trigger': $(this).data('trigger') })[0];

                if (currentMessage != null) {
                    e.preventDefault();
                    that.__sendMessage("sort", new Date().getTime(), currentMessage.behaviourId, that.componentId, currentMessage.message, { entityId: $(this).parents('tr').attr('id') }, that.__messageResponse, currentMessage.success, that);
                    return false;
                }
            });
            $(document).on('datatable:page', function (e) {
                var messages = _.where(that.model.get('messages'), { 'message': 'UpdateOrder' });
                if (messages.length > 0) {
                    var fixHelper = function (e, ui) {
                        ui.children().each(function () {
                            $(this).width($(this).width());
                        });
                        return ui;
                    };

                    that.$el.children("div").children("table").children("tbody").sortable({
                        helper: fixHelper,
                        start: function (e, ui) {
                            ui.helper.css({ 'border': '1px solid #e7e7e7', 'background-color': '#ffffff' });
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
            });

            $('.tooltipster').tooltipster({
                fixedWidth: 200
            });
        },
        multiactionCallback: function (trigger, data, onSuccess, that) {
            if (data.success == true) {
                location.reload();
            }
        }
        ,
        getCollection: function (that, dataCollectionName, map) {
            if (dataCollectionName.indexOf('.') > 0) {
                var cols = dataCollectionName.split('.');
                var tmp = that.selectCollection(window.App.data, cols[0]);
                for (var i = 1; i < cols.length; i++) {
                    tmp = that.selectCollection(tmp, cols[i]);
                }
                return that.multiPluck(tmp, map);
            }
            else {
                return that.multiPluck(that.selectCollection(window.App.data,dataCollectionName), map);
            }
        },
        selectCollection: function (dataObject, colName) {
            var res;
            var re = /\w+\[(\d+)\]/;
            if ((new RegExp(re)).test(colName)) {
                var colIndex = colName.replace(re, "$1");
                colName = colName.split('[')[0];
                res = dataObject[colName][colIndex];
            } else {
                res = dataObject[colName];
            }
            return res;
        },
        exportCsv: function (that) {
            var collection = that.getCollection(that, that.model.get('dataCollection'), that.model.get('csvMap'));
            that.json2Csv(collection);
        },
        json2Csv: function (JSONData) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var CSV = '';

            //This condition will generate the Label/Header

            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    if (typeof (arrData[i][index]) != "undefined") {
                        row += '"' + arrData[i][index].toString().replace('"', "'").replace(/[\n\r\t]/g, '') + '",';
                    } else {
                        row += '"",';
                    }
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "colony-export-";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += Date.now().toString();

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        generateActionsColumn: function (items) {
            var s = '';
            _.each(items, function (i, ix) {
                if (i.type == "checkbox") {

                    s += '<div class="field checkbox " style="margin: 0 0 5px 0; padding: 0 0 0 0; border: none;">';
                    s += '<input type="checkbox" name="' + i.id + '" id="' + i.id + '_<%=id%>" value="<%=id%>" data-override='+ i.dataOverride +' />';
                    s += '<label for="' + i.id + '_<%=id%>"><span></span></label>';
                    s += '</div>';
                }
                else {
                    s += '<a ' + (i.externalLink == true ? 'target="_blank"' : '') + ' href="' + i.url + '" class="tooltipster icon-large no-text icon-' + i.icon + '" title="' + i.name + '" data-trigger="' + i.trigger + '"><span>' + i.name + '</span></a>';
                }
            });
            return s;
        },
        generateMultiActionCell: function (items) {
            var s = '';
            _.each(items, function (i, ix) {
                s += '<a href="javascript:return false;" class="tooltipster icon-large no-text icon-' + i.icon;
                s += ' multiaction" title="' + i.name + '" data-messageHandler="' + i.messageHandler;
                s += '" data-confirmMessage="' + i.confirmMessage  + '" data-checkId="' + i.checkId + '"';
                s += ' data-behaviourId="' + i.behaviourId + '"><span>'
                s += i.name + '</span></a>';
            })

            return s;
        }
    });

    return DataTable;
});
window.Wg = window.Wg || {};
Wg.Moodboard = Wg.Moodboard || function() {

    var Scrapbook = function(data) {
            this.id = 0;
            this.name = "";
            this.items = data != null ? new ScrapCollection(data.items) : new ScrapCollection();

            for (var prop in data) this[prop] = data[prop];
        },
        ScrapCollection = function(items) {
            var collection = [];

            for (var item in items) {
                collection.push(new Scrap(items[item]));
            }

            return collection;
        },
        Scrap = function(item) {
            this.scrapbookItemId = null,
                this.zIndex = 0,
                this.name = "",
                this.description = "",
                this.imageUrl = "",
                this.top = 0,
                this.left = 0,
                this.height = 0,
                this.width = 0,
                this.rotation = 0,
                this.scrapbookId = null,
                this.skuId = null,
                this.imageAssetId = null,
                this.isOnCanvas = false;

            for (var prop in item) this[prop] = item[prop];
        },
        ScrapList = function(data) {
            this.items = new ScrapCollection(data);
        },
        scraps,
        scrapbook = new Scrapbook();

    function getAngle(el) {
        var tr = el.css("-webkit-transform") ||
            el.css("-moz-transform") ||
            el.css("-ms-transform") ||
            el.css("-o-transform") ||
            el.css("transform") ||
            "fail...";

        // With rotate(30deg)...
        // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
        //console.log('Matrix: ' + tr);

        // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

        var values = tr.split("(")[1];
        values = values.split(")")[0];
        values = values.split(",");
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        // arc sin, convert from radians to degrees, round
        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

        // works!
        //console.log('Rotate: ' + angle + 'deg');
        return angle;
    }

    // Convert from Degrees to Radians
    function degToRad(d) {
        return (d * (Math.PI / 180));
    };

    // Convert from Radians to Degrees
    function radToDeg(r) {
        return (r * (180 / Math.PI));
    };

    // get the matrix from a given angle
    function getMatrix(degree) {
        var cos = Math.cos(degToRad(-degree)),
            sin = Math.sin(degToRad(-degree)),
            mtx = [cos, sin, (-sin), cos];

        return mtx;
    }


}();
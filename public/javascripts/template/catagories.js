var Templates = Templates || {};

(function($, _, Templates, undefined){

    Templates.Categories = function(selector, templateMarkup){
        var $el = $(selector);
        var template = _.template(templateMarkup);

        var changeTriggers = [];

        var data = {
            categories: {}
        };

        var onChange = function(change){
            changeTriggers.push(change);
        };

        var addCategory = function(category){
            var id = _.uniqueId();
            data.categories[id] = {text: category};

            updateColors();
            changed();
            render();
        };

        var editCategory = function(id, category){
            data.categories[id].text = category;
            changed();
        };

        var removeCategory = function(id){
            delete data.categories[id];
            render();
            changed();
        };

        var updateColors = function(){
            var colors = Colors.nUniqueHslColors(Object.keys(data.categories).length+1);
            var n = 0;
            $.each(data.categories, function(i, category){
                var c = colors[++n];
                var color = 'hsl('+c.h+','+c.s+'%,'+c.l+'%)';
                category.backgroundColor = color;
                category.color = (c.h < 200 || c.s < 90) ? 'black': 'white';
                if(c.l < 15){
                    category.color = 'white';
                }
            });
        };

        var render = function() {
            $el.html(template(data));
        };

        var changed = function(){
            _.each(changeTriggers, function(trigger){
                if(typeof trigger == "function")
                    trigger(data);
            })
        };

        return {
            $el: $el,
            data: data,
            onChange: onChange,
            addCategory: addCategory,
            editCategory: editCategory,
            removeCategory: removeCategory
        }
    };

})($, _, Templates);
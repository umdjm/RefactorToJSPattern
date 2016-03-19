$(function(){

    var Passages = function() {
        var el = '#passage-container';
        var $el = $(el);
        var template = _.template($('#passage-template').html());

        var data = {};

        var onCategoryChange = function(categories){
            data.categories = categories;
            render();
        };

        var render = function() {
            $el.html(template(data));
        };

        return {
            onCategoryChangeListener:onCategoryChange
        }
    };

    var Categories = function(){
        var el = '#categories-container';
        var $el = $(el);
        var template = _.template($('#category-template').html());

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
                var color = 'hsl('+c.h+','+c.s+'%,'+c.l+'%)'
                category.backgroundColor = color;
                category.color = (c.h < 200 || c.l > 70 || c.s < 90)? 'black': 'white';
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
            el: el,
            $el: $el,
            data: data,
            onChange: onChange,
            addCategory: addCategory,
            editCategory: editCategory,
            removeCategory: removeCategory
        }
    };

    var categories = Categories();
    var passages = Passages();

    categories.onChange(function(data){
        passages.onCategoryChangeListener(data.categories)
    });

    var $categoriesList = $('#categories-list');

    categories.$el
        .delegate('.add-category', 'click', function(e){
            e.preventDefault();
           categories.addCategory('')
        });

    categories.$el
        .delegate('p .remove', 'click', function(e){
            e.preventDefault();
            var id = $(this).parents('p').attr('id');
            categories.removeCategory(id);
            return false;
        });

    categories.$el
        .delegate('input.category-text', 'keyup', function(){
            var id = $(this).parents('p').attr('id');
            var value = $(this).val();
            categories.editCategory(id, value);
        });

    categories.addCategory('new');

});
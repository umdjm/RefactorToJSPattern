var Templates = Templates || {};

(function($, _, Templates, undefined){

    Templates.Passages = function(selector, htmlTemplate) {
        var $el = $(selector);
        var template = _.template(htmlTemplate);

        var data = {};

        var onCategoryChange = function(categories){
            data.categories = categories;
            render();
        };

        var highlightSelectionById = function(id, range){
            var selector = document.createElement('span');
            var background = data.categories[id].backgroundColor;
            var color = data.categories[id].color;

            $(selector)
                .css('border-bottom', '5px solid '+ background)
                .css('color', '#666')
                .css('background-color', '#ebe');

            range.surroundContents(selector);
        };

        var render = function() {
            $el.html(template(data));
        };

        return {
            $el: $el,
            onCategoryChangeListener:onCategoryChange,
            highlightSelectionById: highlightSelectionById
        }
    };

})($, _, Templates);
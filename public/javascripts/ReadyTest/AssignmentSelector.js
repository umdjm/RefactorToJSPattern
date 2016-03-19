var ReadyTest = ReadyTest || {};

(function(ReadyTest){

    ReadyTest.AssignmentSelector = function(selector, model, templateHtml){

        var $el = $(selector);
        var template = _.template(templateHtml);

        var data = {
            id: 1,
            hidden: true,
            grades: [3, 4, 5],
            model: model.data()
        };

        var delegate = function(selector, type, func){
            $el.delegate(selector, type, func);
        };

        var toggleHidden = function(){
            data.hidden = !data.hidden;
            render();
        };

        var onChange = function(obj){
            data.model = obj;
            render();
        };

        var render = function(){
            $el.html(template(data))
        };

        model.onChange(onChange);

        render();

        return {
            delegate: delegate,
            toggleHidden: toggleHidden
        };
    };
})(ReadyTest);
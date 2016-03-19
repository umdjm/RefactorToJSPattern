$(function() {
    var assignmentSelectorModel = EventModel({
        grade: 3,
        startDate: '2012-01-14',
        endDate: '2015-01-14'
    });

    var template = $('#ready-test-assignment-selector-template').html();

    var assignmentSelectors = _.map(['#student-1', '#student-2', '#student-3'], function(selector){
        var ctrl = AssignmentSelectorController (selector, assignmentSelectorModel, template);
        AssignmentSelectorBinding(ctrl, assignmentSelectorModel);
    });
});

function AssignmentSelectorController(selector, model, templateHtml){

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
}

function AssignmentSelectorBinding(assignmentSelector, model) {

    assignmentSelector.delegate('button#student-1-assignment-selector-button', 'click', function () {
        assignmentSelector.toggleHidden()
    });

    assignmentSelector.delegate('.assignment-selector .grades button', 'click', function (event) {
        event.preventDefault();
        var $button = $(this);
        model.set('grade', $button.text())
    });

    assignmentSelector.delegate('input[name="start-date"]', 'blur', function () {
        var $input = $(this);
        model.set('startDate', $input.val())
    });

    assignmentSelector.delegate('input[name="end-date"]', 'blur', function () {
        var $input = $(this);
        model.set('endDate', $input.val())
    });

    assignmentSelector.delegate('input[name="tests"]', 'change', function () {
        var $input = $(this);
        model.set('tests', $input.val());
    })
}

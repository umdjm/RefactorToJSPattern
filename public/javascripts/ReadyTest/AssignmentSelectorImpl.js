$(function() {
    var assignmentSelectorModel = Model({
        grade: 3,
        startDate: '2012-01-14',
        endDate: '2015-01-14'
    });

    var assignmentSelectors = _.map(['#student-1', '#student-2', '#student-3'], function(selector){
        return AssignmentSelectorImpl(selector, assignmentSelectorModel)
    });
});

function AssignmentSelectorImpl(selector, model) {
    var template = $('#ready-test-assignment-selector-template').html();

    var assignmentSelector = ReadyTest.AssignmentSelector(selector, model, template);

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

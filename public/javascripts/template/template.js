$(function(){
    var categoriesTemplate = $('#category-template').html();
    var categories = Templates.Categories('#categories-container', categoriesTemplate);

    var passagesTemplate = $('#passage-template').html();
    var passages = Templates.Passages('#passage-container', passagesTemplate);

    categories.onChange(function(data){
        passages.onCategoryChangeListener(data.categories)
    });

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

    passages.$el
        .delegate('.select-button', 'click', function(){
            var $this = $(this);
            var selection = getSelection();
            if(selection.rangeCount > 0) {
                var id = $this.data('id');
                var range = selection.getRangeAt(0);

                passages.highlightSelectionById(id, range);
            }
        });

    categories.addCategory('new');

});
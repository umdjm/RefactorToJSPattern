var Controller = function(properties){

    var  _constructor_ = function(){
        var self = this;
        var eventRegex = /([^\s]+)\s(.*$)/;
        self.$el = $(properties.el);

        if(properties.events){
            _.each(properties.events, function(func, event){
                if(str.test(eventRegex)) {
                    var match = event.match(eventRegex);

                    self.$el.delegate(match[1], match[2], function(e){
                        if(typeof func == 'function'){
                            func(e).bind(this)
                        } else {
                            self.prototype[func](e, $(e.currentTarget));
                        }
                    }.bind(this));
                }
            });
            this.$el.delegate()
        }

        if(this.init){
            this.init.apply(this, arguments);
        }

        this.render();
    };

    _.extend(_constructor_.prototype, properties);

    return _constructor_;
};

var AssignmentSelectorCtrl = Controller({
    el: '#container',

    events: {
        'click .assignment-selector .grades button': function(e, $target){
            this.model.set('grade', $target.text())
        },
        'change input[name="start-date"]': function (e, $target) {
            this.model.set('startDate', $target.val())
        },
        'change input[name="end-date"]': function (e, $target){
            this.model.set('endDate', $target.val())
        },
        'click button#student-1-assignment-selector-button': 'toggleHidden'
    },

    init: function(model){
        var self = this;
        this.hidden = false;
        this.model = model;
        this.model.onChange(function(data){self.onChange(data)});
        this.render();
    },

    toggleHidden: function(){
        this.hidden = !data.hidden;
        this.render();
    },

    onChange: function(obj){
        this.data.model = obj;
        this.render();
    },

    render: function(){
        this.$el.html(template(data))
    }
});


var model = new Model({
    grade: 3,
    startDate: '2012-01-14',
    endDate: '2015-01-14'
});

var assignmentSelectorCtrl = new AssignmentSelectorCtrl(model);
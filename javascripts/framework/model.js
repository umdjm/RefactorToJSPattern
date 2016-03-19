var Model = function(properties){
    var changeListeners = [];
    var data = _.extend({}, properties);

    function get(property){
        return data[property];
    }

    function set(property, value){
        data[property] = value;
        triggerChange();
    }

    function triggerChange() {
        _.each(changeListeners, function(listener){
            listener(data);
        })
    }

    function onChange(listener){
        changeListeners.push(listener);
    }

    return {
        onChange: onChange,
        set: set,
        get: get
    }
};
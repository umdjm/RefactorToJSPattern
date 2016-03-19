var Model = function(properties){
    var changeListeners = [];
    var _data = _.extend({}, properties);

    function get(property){
        return _data[property];
    }

    function set(property, value){
        _data[property] = value;
        triggerChange();
    }

    function triggerChange() {
        _.each(changeListeners, function(listener){
            listener(_data);
        })
    }

    function onChange(listener){
        changeListeners.push(listener);
    }

    function data() {
        return _data;
    }

    return {
        data: data,
        onChange: onChange,
        set: set,
        get: get
    }
};
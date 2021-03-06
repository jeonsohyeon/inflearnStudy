function _filter(list, predi){
    var new_list = [];
    _each(list, function(val){
        if(predi(val)) new_list.push(val)
    })
    return new_list;
}
function _map(list, mapper){
    var new_list = [];
    _each(list, function(val, key){
        new_list.push(mapper(val, key));
    })
    return new_list;
}

function _each(list, iter){
    var keys = _keys(list);
    for(var i=0; i< len = keys.length; i++){
        iter(list[keys[i]], keys[i])
    }
    return list
}

function _curry(fn){
    return function(a, b){
        return (arguments.length == 2) ? fn(a,b) : function(b){ return fn(a, b) }
    }
}

function _curryr(fn){
    return function(a, b){
        return (arguments.length == 2) ? fn(a,b) : function(b){ return fn(b, a) }
    }
}

var _get = _curryr(function(obj, key){
    return obj === null ? undefined : obj[key]
})


var slice = Array.prototype.slice;
function _rest(list, num){
    return slice.call(list, num || 1)
}

function _reduce(list, iter, memo){
    if(arguments.length == 2){
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function(val){
        memo = iter(memo, val)
    })
    return memo;
}

function _pipe(){
    var fns = arguments;
    return function(arg){
        return _reduce(fns, function(arg, fn){
            return fn(arg)
        }, arg)
    }
}

function _go(){
    var fns = _rest(arguments)
    return _pipe.apply(null, fns)(arg)
} 

var _map = _curryr(_map),
    _filter = curryr(_filter)
    
function _is_object(obj){
    return typeof obj == 'object' && !!obj;
}
function _keys(obj){
    return _is_object(obj) ? Object.keys(obj) : [];
}

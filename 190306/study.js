const users = [
    { id : 1, name : 'ID', age : 36},
    { id : 2, name : 'ID2', age : 32},
    { id : 3, name : 'ID3', age : 32},
    { id : 4, name : 'ID4', age : 27},
    { id : 5, name : 'ID5', age : 25}
]

function _filter(list, checkValue){
    let newList = [];
    for(let i = 0; i<list.length; i++){
        if(checkValue(list[i])){
            newList.push(list[i])
        }
    }
    return newList
}

function _map(list, mapper){
    let newList = [];
    for(let i = 0; i<list.length; i++){
        newList.push(mapper(list[i]))
    }
    return newList;
}

let over30 = _filter(users, function(users){return users.age > 30})
let names = _map(over30, function(users){
    return users.name;
})
let ages = _map(over30, function(users){
    return users.age;
})
console.log(over30, names, ages)

//보다 안정성 높게 변경
let over30_name =_map(
    _filter(users, function(users){return users.age >= 30}),
    function(users) { return users.name}
)

//_filter, _map 코드 중복 제거 & 디벨롭

function _each(list, iter){
    let keys = _keys(list); //배열이 아니어도 keys 가 뽑히게 되므로.
    let len = keys.length;
    for(let i = 0; i < len; i++){
        iter(list[keys[i]]) //array 나 key value 나 루프가 가능함.
    }
    return list;
}

function _filter2(list, predi){
    let newList = [];
    _each(list, function(val){
        if(predi(list[i])) newList.push(val)
    })
    return newList;
}

function _map2(list, mapper){
    let newList = [];
    _each(list, function(val){
        newList.push(mapper(val))
    })
    return newList;
}

//es6 의 map, filter 메서드. 객체 상태에 따라 결과가 달라짐. 다형성에 대한 어려움이 존재 

// [1,2,3,4].map(function(val){
//     return val * 2;
// })

// [1,2,3,4].filter(function(val){
//     return val % 2;
// })

//document.querySelectorAll('') 과 같은 유사배열일 경우, _map 의 함수에서라면 length 만큼 for 문을 돌기 때문에 결과가 나타날 수 있음.
//데이터가 있기 전부터 함수가 존재하기 때문에. 객체 지향인 경우 해당 객체가 생겨야 기능을 수행할 수 있으나 함수 지향인 경우 데이터가 없더라도 평가 시점이 상대적으로 훨씬 유연해진다.
let nodeName = _map2(document.querySelectorAll('*'), function(node){
     return node.nodename;
    }
)

//내부 다형성.
//함수 내의 보조함수(콜백)가 다형성을 책임진다. 

_map2([1,2,3,4], function(v){
    return v + 10;
})


//curry 커링.
function _curry(fn){
    return function(a,b){
        return arguments.length == 2 ? fn(a,b) : function(b){return fn(a,b)}
    }
}

function _curryr(fn){
    return function(a,b){
        return arguments.length == 2 ? fn(a,b) : function(b){return fn(b,a)}
    }
}

var _get = _curryr(function(obj, key){
    return obj == null ? undefined : obj[key];
})

//_reduce : 재귀. 원 자료와 다른 새로운 자료 반환.
var slice = Array.prototype.slice;
function _rest(list, num){
    return slice.call(list, num || 1);
}
function _reduce(list,iter,value){
    if(arguments.length == 2){
        value = list[0];
        list = _rest(list);
    }
    _each(list, function(val){
        value = iter(value, val)
    })
    return value
}

// console.log(
//     _reduce([1,2,3], function(){
//         return a + b;
//     }, 0)
// )

//파이프라인 만들기.
//파이프 : 함수를 연속적으로 실행할수 있게 해줌. 보다 추상화된 레벨의 reduce.
function _pipe(){
    let fns = arguments;
    return function(arg){
        return _reduce(fns, function(arg, fn){
            return fn(arg);
        }, arg)
    }
}

var p = _pipe(
    function(a) { return a + 1 },
    function(a) { return a * 2}
); 

//go : 즉시 실행되는 함수.
function _go(){
    let fns = _rest(arguments)
    return _pipe.apply(null, fns)(arg);
}

var _map = _curryr(_map),
    _filter2 = _curryr(_filter2);


//외부 다형성 높이기
//null 을 넣어도 에러가 나지 않도록 변경.
_each(null, console.log)
_map2(null, function(v) { return v })
_filter2(null, function(v) { return v })
_go(null,
    _filter2(function(v) {return v % 2}),
    _map2(function(v) {return v}),
    console.log
)

//Object.keys 는 키를 뽑아주는데 배열을 넣어도 키를 뽑아주고, null 을 넣으면 에러가 난다.
Object.keys({ name : 'ID', age : 33 })
_keys(null);
_keys([1,2,3,4]);

function _is_object(obj){
    return typeof obj == 'object' && !!obj;
}
function _keys(obj){
    return _is_object(obj) ? Object.keys(obj) : [];
}

//array 가 아니면서 key value 상으로 루프를 돌만한 데이터 구성

_each({
    13 : 'i',
    19 : 'd',
    29 : 'id'
}, function(name) {
    console.log(name);
})
//이 객체에는 length 가 없으므로 아무런 일도 일어나지 않지만 _keys 를 _each 에 넣어 개선하면 정상적으로 동작하게 된다.

const users = [
    { id : 1, name : 'ID', age : 36},
    { id : 2, name : 'ID2', age : 32},
    { id : 3, name : 'ID3', age : 32},
    { id : 4, name : 'ID4', age : 27},
    { id : 5, name : 'ID5', age : 25}
]


//for 문의 조건부만 다른 경우.
// var temp_users = [];
// for(var i=0; i<users.length; i++){
//     if(users[i].age >= 30){
//         temp_users.push(users[i])
//     }
// }
// var temp_users = [];
// for(var i=0; i<users.length; i++){
//     if(users[i].age < 30){
//         temp_users.push(users[i])
//     }
// }

// var names = [];
// for(var i=0;i<temp_users.length; i++){
//     names.push(temp_users[i].name);
// }

// var ages = [];
// for(var i=0;i<temp_users.length; i++){
//     ages.push(temp_users[i].age);
// }

//_filter
//추상화의 단위는 함수(predi)를 이용.
//predi 함수를 실행하는데, users[i] 의 값을 받아서 실행함.
//변형된 새로운 값을 리턴
// function _filter(list, predi){
//     var new_list = [];
//     for(var i=0; i<list.length; i++){
//         if(predi(list[i])){
//             new_list.push(list[i])
//         }
//     }
//     return new_list;
// }

// _filter(users, function(user){return user.age >= 30})
// _filter([1,2,3,4], function(num){return !(num % 2)})

//_map
// function _map(list, mapper){
//     var new_list = [];
//     for(var i=0; i<list.length; i++){
//         new_list.push(mapper(list[i]));
//     }
//     return new_list;
// }

// var over_30 = _filter(users, function(user){return user.age >= 30});
// _map(over_30, function(user){
//     return user.name;
// })
// _map([1,2,3], function(num){ return num * 2 })

//대입문을 없애고 함수를 중첩하여 코드를 간편하게 만듦.
//중간에 데이터가 변동될 여지가 없어서 보다 안정적인 코드임.
// _map(
//     _filter(users, function(user){return user.age >= 30},
//     function(user){ return user.age })
// )

//_each 로 인해 필터와 맵의 중복을 제거한다.
function _filter(list, predi){
    var new_list = [];
    _each(list, function(val){ //iter
        if(predi(val)) new_list.push(val)
    })
    return new_list;
}
function _map(list, mapper){
    var new_list = [];
    _each(list, function(val){ //iter
        new_list.push(mapper(val));
    })
    return new_list;
}

//each 는 단순히 리스트를 돌려줌.
var _length = _get('length'); //null 을 넣어도 에러나지 않도록 수정함. get 으로 length 값을 가져옴.
function _each(list, iter){
    var keys = _keys(list); //array 가 들어오든 key value 가 들어오든.
    for(var i=0; i< len = keys.length; i++){
        iter(list[keys[i]])
    }
    return list
}

/*
이미 있는 .map, .filter 와 같은 경우 순수 함수가 아니라 메서드이며
객체 상태에 따라 결과가 달라진다.
메서드는 객체지향 프로그램이기 때문에 해당 클래스에 정의되어 있어서
해당 클래스 인스턴스에만 사용이 가능하다.

그런데 자바스크립트에는 유사배열 객체가 있다.(제이쿼리 객체, document.querySelectorAll() 결과 등)
때문에 다형성에서 이슈가 생김.

하지만 _map 으로 작업하게 되면 유사배열에도 사용이 가능하다.
length 가 있고 값이 있는 키밸류가 있는 객체는 _map 이 작동되어 다형성이 높게 작업가능하다.

객체지향에서는 해당하는 객체가 있어야 기능을 수행할 수 있지만
함수는 먼저 존재하기에 데이터가 없어도 평가 시점이 상대적으로 유연해진다.
그래서 더 유연해진다.

외부의 다형성은 array_like, arguments, document.querySelectorAll 등으로 들어와도 다 되도록 했고
내부의 다형성은 predi, iter, mapper 같은 보조함수가 책임진다.

커링 : 함수에 인자를 하나씩 적용하다가 필요 인자가 모두 채워지면 함수 본체가 작동되는 것. ***

*/

function _curry(fn){
    return function(a, b){
        return (arguments.length == 2) ? fn(a,b) : function(b){ return fn(a, b) }
    }
}
// a 에 대한 인자를 받고
// b 에 대한 인자를 받으면
// b 함수의 결과로 fn(a, b)를 실행한다.


var add = _curry(function(a,b){
    return a+b;
});

var add10 = add(10); //아직 실행안됨. 여기엔 함수가 들어있음.

add10(5); //15 //두번째 인자가 들어왔기 때문에 본체 함수인 a+b 가 실행됨.
add(5)(3); //8 //두번째 인자가 즉시 들어왔기에 본체 함수인 a+b 가 실행됨.

//커링은 원하는 시점까지 미뤄두다가 평가하는 것.

var sub = _curryr(function(a,b){
    return a - b;
});

sub(10, 5) //10-5
var sub10 = sub(10);
sub10(5) //5-10


//동일 동작이지만 왼쪽->오른쪽이 아닌 오른쪽->왼쪽 방향으로 가게끔 만듦.
function _curryr(fn){
    return function(a, b){
        return (arguments.length == 2) ? fn(a,b) : function(b){ return fn(b, a) }
    }
}


//get 오브젝트 값을 안전하게 참조함. 오브젝트가 키로 접근하는게 애매할때 오류안나게.
// function _get(obj, key){
//     return obj === null ? undefined : obj[key]
// }

// var user1 = users[0];
// _get(user1, 'name');
// _get(user1, 'name2'); //값이 없어서 undefined 를 반환함. 오류가 나지 않음.

var _get = _curryr(function(obj, key){
    return obj === null ? undefined : obj[key]
})

//curryr 을 사용하면 하면

var get_name = _get('name');
// get_name(user1)
// get_name(user2)

//이런식으로도... get 자체가 키를 가져오게 되면서. 다양하게 변경이 가능하다.

//이전 코드를 좀더 간단하게 써보면.
_map(_filter(users, function(user){return user.age >= 30}, _get('age')))


//슬라이스 해주는거.
var slice = Array.prototype.slice;
function _rest(list, num){
    return slice.call(list, num || 1) //넘겨준 값 없으면 기본값 1
}

function _reduce(list, iter, memo){
    if(arguments.length == 2){ //초기값이 없을 경우 초기값을 0번째로 넣어주고 그 값을 제외한 새로운 배열을 리스트로 반환해야 한다.
        memo = list[0];
        //list = list.slice(1); //array 메소드라서 고침
        list = _rest(list);
    }
    _each(list, function(val){
        memo = iter(memo, val)
    })
    return memo;
}

_reduce([1,2,3], add, 10); //16
_reduce([1,2,3], add); //6

/*
memo = add(0, 1)
memo = add(memo, 2)
memo = add(memo, 3);
return memo
이렇게 재귀적으로 add(add(add(0,1), 2), 3).... 리스트 수만큼 돌게 된다.

each 로 리스트만틈 도는데 memo 에 iter 값을 받아서 자기 값을 만듦.

var add = _curry(function(a,b){
    return a+b;
});

reduce 는 3번째 인자를 생략할 수도 있음. if(arguments.length == 2)

var slice = Array.prototype.slice; 
slice.call()

array 의 프로토타입 슬라이스를 콜을 통해서 작업하면 유사배열도 제대로 작업할 수 있게 함.
*/


/*
pipe : reduce 를 이용해서 만듦.
함수 인자를 받아서 연속으로 사용할 수 있게 해주는 함수.
파이프보다 추상화된 버전이 reduce.
파이프에선 array 로 넘기지 않고 인자로 넘겼음. arguments.
함수를 리턴하는 함수.
*/


function _pipe(){
    var fns = arguments;
    return function(arg){
        return _reduce(fns, function(arg, fn){ //reduce 로 연속으로 돌면서 인자를 받아서. arg 의 함수를 리턴.
            return fn(arg)
        }, arg) //초기 arg 하나를 받고.
    }
}

var f1 = _pipe(
    function (a) {return a + 1},
    function (a) {return a * 2}
)

f1(1) //1+1 , 2*2

/*
go : 바로 실행. 파이프의 즉시실행 버전.
*/

_go(1, //초기값.
    function(a) {return a + 1},
    function(a) {return a + 2},
    function(a) {return a + a},
)

function _go(){
    var fns = _rest(arguments) //첫번째를 제외한 함수들을 인자로 받음.
    return _pipe.apply(null, fns)(arg)
}

//다시 좀더 간결하게..
_map(
    _filter(users, function(user){return user.age >= 30}),
    _get('name')
)

//go 를 사용해서 했을때. 
_go(users,
    function(users){ //users 를 받아서 filter, map 둘다 users 에 적용하고 있으므로
        return _filter(users, function(user){
            return user.age >= 30
        })
    },
    function(users){
        return _map(users, _get('name'))
    },
    console.log
)

//이런 형태는 curryr 을 쓰면 
var _map = _curryr(_map),
    _filter = curryr(_filter)


_map([1,2,3], function(val) {return val * 2}) //이 코드가.
_map(function(val){ return val * 2})([1,2,3]) //이런식으로.

//그러면 이렇게 됨. 
_go(users,
    _filter(function(user){ return user.age >= 30 }),
    _map(_get('name')),
    console.log
)

//화살표 함수로 바꿨을때.
_go(users,
    _filter(user => user.age >= 30),
    _map(_get('name')),
    console.log
)


//_keys 만들기. Object.keys(null) 하면 에러가 나기때문

function _is_object(obj){
    return typeof obj == 'object' && !!obj;
}
function _keys(obj){
    return _is_object(obj) ? Object.keys(obj) : [];
}

_keys([1,2,3,4])

_each({ //이 객체에 length 가 없으므로 아무일도 안일어나지만. 이 곳의 name 값을 꺼낼 수 있도록 할 수 있음. (each 함수 내부를 _keys 로 수정함.)
    13 : 'i',
    19 : 'd',
    29 : 'id'
}, function(name) {
    console.log(name);
})

//데이터가 무엇이냐에 따라 보조함수로 내부동작을 최대한 다 하도록 다형성을 높임

_go({
        13 : users[0],  //얘는 한번 더 안으로 들어감. 
        19 : users[2],
        29 : 'id'
    },
    _map(function(user){ return user.name}),
    _map(function(name){ return name.toLowerCase() })
)
//어디선가 null 이 떨어지더라도 유연하게 흘러감


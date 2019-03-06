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
    for(let i = 0; i <list.length; i++){
        iter(list[i])
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

[1,2,3,4].map(function(val){
    return val * 2;
})

[1,2,3,4].filter(function(val){
    return val % 2;
})

//document.querySelectorAll('') 과 같은 유사배열일 경우, _map 의 함수에서라면 length 만큼 for 문을 돌기 때문에 결과가 나타날 수 있음.
//데이터가 있기 전부터 함수가 존재하기 때문에. 객체 지향인 경우 해당 객체가 생겨야 기능을 수행할 수 있으나 함수 지향인 경우 데이터가 없더라도 평가 시점이 상대적으로 훨씬 유연해진다.
let nodeName = _map(document.querySelectorAll('*'), function(node){
     return node.nodename;
    }
})

//내부 다형성.
//함수 내의 보조함수(콜백)가 다형성을 책임진다. 

_map([1,2,3,4], function(v){
    return v + 10;
})


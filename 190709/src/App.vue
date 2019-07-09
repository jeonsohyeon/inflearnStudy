<template>
  <div id="app">
    <Todos v-bind:todos="todos" v-on:deleteTodo="deleteTodo"/>
    <AddTodo v-on:add-todo="addTodo"/>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import AddTodo from './components/AddTodo.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Todos,
    AddTodo
  },
  methods: {
    deleteTodo(id){
      axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
      .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
      .catch(err => console.log(err));
    },
    addTodo(newTodo){
      const { title, completed } = newTodo;

      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed
      })
      .then(res => this.todos = [...this.todos, res.data])
      .catch(err => console.log(err));
    }
  },
  data () {
    return {
      todos : []
    }
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.todos = res.data)
    .catch(err => console.log(err));
  }
}
</script>

<style>
 * {
   box-sizing:border-box;
   margin:0;
   padding:0;
 }
 body{
   font-family:arial;
   line-height:1.4;
 }
</style>

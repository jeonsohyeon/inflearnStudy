<template>
  <form @submit="addTodo">
    <input type="text" v-model="title" name="title" placeholder="Add Todo">
    <input type="submit" value="Submit" class="btn">
  </form>
</template>

<script>
import uuid from 'uuid';

export default {
  name: "AddTodo",
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTodo (e) {
      e.preventDefault();
      const newTodo = {
       // id: uuid.v4(), //유니크 아이디
        title: this.title,
        completed: false
      }
      this.$emit('add-todo', newTodo)
      this.title = '';
    }
  }
}
</script>

<style scoped>
form{
  display:flex;
}
input[type="text"]{
  flex:10;
}
</style>

<template>
  <div id="todo-list-example">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo">
    <ul>
      <li
        is="todo-item"
        v-for="(todo, index) in todos"
        v-bind:key="todo"
        v-bind:title="todo"
        v-on:remove="todos.splice(index, 1)"
      ></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newTodoText: '',
        todos: [
          'Do the dishes',
          'Take out the trash',
          'Mow the lawn'
        ]
      }
    },
    methods: {
      addNewTodo () {
        this.todos.push(this.newTodoText)
        this.newTodoText = ''
      }
    },
    components: {
      'todo-item': {
        props: ['title'],
        template: `
          <li>
            {{ title }}
            <button v-on:click="$emit('remove')">X</button>
          </li>
        `
      }
    }
  }

</script>

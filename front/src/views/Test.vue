<template>
  <button v-on:click="test">boutton de test</button>
</template>

<script lang="ts">

import axios from 'axios'

export default {
  name: 'Test',
  methods: {
    test: (): void => {
      axios.get<unknown>('http://localhost:9000/benchmark', {
        headers: {
          'content-type': 'application/json'
        },
        data: {
          Bidule: true,
          Truc: '123'
        }
      }).then(value => console.log(value))
    }
  }
}
</script>

<style scoped>

</style>

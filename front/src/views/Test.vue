<template>
  <b-button v-on:click="test">boutton de test</b-button>
</template>

<script lang="ts">

import axios from 'axios'

export default {
  name: 'Test',
  methods: {
    test: (): void => {
      axios.post<unknown>('http://localhost:9000/benchmark',
        {
          Bidule: true,
          Truc: '123'
        }, {
          headers: {
            'content-type': 'application/json'
          }
        }).then(value => console.log(value))
    }
  }
}
</script>

<style scoped>

</style>

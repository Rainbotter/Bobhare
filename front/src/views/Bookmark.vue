<template>
  <div class="w-25">
      <div class="bg-primary">
          {{bookmark.title}}
      </div>
      <b-list-group>
          <b-list-group-item v-for="link in bookmark.links" :key="link.url">
              <b-link v-bind:href="link.url">{{link.title}}</b-link>
          </b-list-group-item>
      </b-list-group>
  </div>
</template>

<script lang="ts">
import { Bookmark } from '@/models/bookmark'

export default {
  name: 'Bookmark',
  // props: ['bookmark'],
  props: {
    bookmark: Bookmark
  },
  mounted (): void {
    console.log(this.props)
  }
}
</script>

<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <BookmarkVue v-bind="props"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Bookmark } from '@/models/bookmark'
import BookmarkVue from '@/views/Bookmark.vue'

@Component({
  components: {
    BookmarkVue
  }
})
export default class Home extends Vue {
  props: {
    bookmark: Bookmark
  } = {
    bookmark: new Bookmark({
      title: 'Oui',
      links: [
        {
          title: 'youtube',
          url: 'https://www.youtube.com'
        },
        {
          title: 'Bober site',
          url: 'https://bookmarks.bober.ovh'
        }
      ]
    })
  }
}
</script>

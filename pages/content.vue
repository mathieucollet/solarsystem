<template>
  <div>
    <NuxtContent :document="page" />
  </div>
</template>

<script>
export default {
  name: 'Content',
  async asyncData({ $content }) {
    const page = await $content('accueil').fetch()
    return { page }
  },
  data() {
    return {
      test: '',
    }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
      ],
    }
  },
}
</script>

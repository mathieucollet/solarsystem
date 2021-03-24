<template>
  <v-container fluid>
    <v-layout column>
      <DataTable :data="mountains" />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Planets',
  async asyncData({ $axios }) {
    const response = await $axios.get('/api/planets')
    const mountains = response.data.bodies
    return { mountains }
  },
}
</script>

<style>
tr {
  cursor: pointer;
}
</style>

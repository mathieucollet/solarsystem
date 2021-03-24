<template>
  <v-container fluid>
    <v-layout column>
      <DataTable :loading="$fetchState.pending" :data="planets" />
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Favorites',
  async fetch() {
    const { store, error } = this.$nuxt.context
    try {
      await store.dispatch('planets/getFavorites')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch planets',
      })
    }
  },
  computed: {
    ...mapState({
      planets: (state) => state.planets.favorites,
    }),
  },
}
</script>

<style>
tr {
  cursor: pointer;
}
</style>

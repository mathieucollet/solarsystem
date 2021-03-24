<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col class="mx-auto" cols="12" md="8" lg="6">
          <v-card class="mx-auto my-2" width="100%">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img :lazy-src="preview" width="100%" height="300px" :src="image">
              <template #placeholder>
                <v-row
                  class="fill-height ma-0 black"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
              <v-btn class="float-right" icon dark @click="addToFavorites">
                <v-icon v-if="isFav"> mdi-heart </v-icon>
                <v-icon v-else> mdi-heart-outline </v-icon>
              </v-btn>
            </v-img>

            <v-card-title>
              {{ planet.name }}
            </v-card-title>

            <v-card-text
              v-if="planet.sideralOrbit && planet.id !== 'soleil'"
              class="subtitle-2 grey--text"
            >
              tourne autour
              <span>
                <span v-if="planet.aroundPlanet">
                  de
                  <span
                    class="around-planet font-weight-bold teal--text text-decoration-none"
                    @click="moonGoTo(planet.aroundPlanet.rel)"
                  >
                    {{ planet.aroundPlanet.planet }}
                  </span>
                </span>
                <span v-else>
                  du
                  <NuxtLink
                    to="/planets/soleil"
                    class="around-planet font-weight-bold teal--text text-decoration-none"
                  >
                    soleil
                  </NuxtLink>
                </span>
              </span>
            </v-card-text>

            <v-list-item>
              <v-tooltip left>
                <template #activator="{ on, attrs }">
                  <v-list-item-icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-weight</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>
                    {{ planet.mass ? planet.mass.massValue : 0 }}
                    <sup>{{ planet.mass ? planet.mass.massExponent : 0 }}</sup>
                    kg
                  </v-list-item-subtitle>
                </template>
                <span>Masse</span>
              </v-tooltip>

              <v-tooltip right>
                <template #activator="{ on, attrs }">
                  <v-list-item-icon class="ml-8" v-bind="attrs" v-on="on">
                    <v-icon>mdi-food-apple</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle class="text-right">
                    {{ planet.gravity }} g.cm<sup>3</sup>
                  </v-list-item-subtitle>
                </template>
                <span>Gravité</span>
              </v-tooltip>
            </v-list-item>

            <v-list-item>
              <v-tooltip left>
                <template #activator="{ on, attrs }">
                  <v-list-item-icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-radius</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>
                    {{ planet.meanRadius }} km
                  </v-list-item-subtitle>
                </template>
                <span>Rayon</span>
              </v-tooltip>

              <v-tooltip right>
                <template #activator="{ on, attrs }">
                  <v-list-item-icon class="ml-8" v-bind="attrs" v-on="on">
                    <v-icon>mdi-timer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle class="text-right">
                    {{ parseFloat(planet.sideralOrbit).toFixed(1) }} jours
                  </v-list-item-subtitle>
                </template>
                <span>Révolution</span>
              </v-tooltip>
            </v-list-item>

            <v-divider class="mx-4"></v-divider>

            <v-card-title v-if="planet.moons">Lunes</v-card-title>

            <v-card-text v-if="planet.moons">
              <v-sheet elevation="1" class="pa-1">
                <v-chip-group mandatory>
                  <v-chip v-for="moon in planet.moons" :key="moon.rel">{{
                    moon.moon
                  }}</v-chip>
                </v-chip-group>
              </v-sheet>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="$router.go(-1)">
                Retour
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Slug',
  data() {
    return {
      image: '',
      preview: '',
      isFav: false,
    }
  },
  async fetch() {
    const { params, $axios, store, error } = this.$nuxt.context
    try {
      await store.dispatch('planets/getPlanet', params.slug)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch planets',
      })
    }
    await $axios.get('/api/images/' + this.planet.englishName).then((res) => {
      const imageResponse = res.data.data.result.items[0]
      this.image = decodeURIComponent(imageResponse.media)
      this.preview = decodeURIComponent(
        `https:${imageResponse.media_preview.split('&q=')[0]}`
      )
    })
  },
  computed: {
    ...mapState({
      planet: (state) => state.planets.planet,
    }),
  },
  mounted() {
    this.isFav = this.$cookies.get('favorites').ids.includes(this.planet.id)
  },
  methods: {
    moonGoTo(rel) {
      this.$router.push('/planets/' + rel.split('bodies/')[1])
    },
    addToFavorites() {
      const cookieRes = this.$cookies.get('favorites')
      if (cookieRes.ids.includes(this.planet.id)) {
        cookieRes.ids = cookieRes.ids.filter((id) => id !== this.planet.id)
        this.isFav = false
      } else {
        cookieRes.ids = [...cookieRes.ids, this.planet.id]
        this.isFav = true
      }
      this.$cookies.set('favorites', cookieRes)
    },
  },
}
</script>

<style scoped>
span.around-planet {
  cursor: pointer;
}
</style>

export const state = () => ({
  planets: [],
  planet: {},
  favorites: [],
})

export const mutations = {
  populatePlanets(state, planets) {
    state.planets = planets
  },
  populatePlanet(state, planet) {
    state.planet = planet
  },
  populateFavorites(state, favorites) {
    state.favorites = favorites
  },
}

async function fetchPlanets(commit, state) {
  if (!state.planets.length) {
    await this.$axios.get('/api/planets').then((res) => {
      commit('populatePlanets', res.data.bodies)
    })
  }
}

export const actions = {
  async getPlanets({ commit, state }) {
    await fetchPlanets.call(this, commit, state)
  },
  async getPlanet({ state, commit }, id) {
    await fetchPlanets.call(this, commit, state)
    commit(
      'populatePlanet',
      state.planets.find((planet) => planet.id === id)
    )
  },
  async getFavorites({ commit, state }) {
    await fetchPlanets.call(this, commit, state)
    const favoritesIds = this.$cookies.get('favorites').ids
    const favorites = state.planets.filter((planet) =>
      favoritesIds.includes(planet.id)
    )
    commit('populateFavorites', favorites)
  },
}

<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="10"
    :search="search"
    class="elevation-2"
    multi-sort
    @click:row="rowGoTo"
  >
    <template #top>
      <v-text-field
        v-model="search"
        label="Recherche"
        class="mx-4"
      ></v-text-field>
    </template>
    <template #item.isPlanet="{ item }">
      <v-icon v-if="item.isPlanet" large color="green lighten-2">
        mdi-earth
      </v-icon>
      <v-icon v-else large color="grey lighten-2"> mdi-cancel </v-icon>
    </template>
    <template #body.append>
      <tr :class="{ 'v-data-table__mobile-table-row': isMobile }">
        <td v-if="!isMobile"></td>
        <td>
          <v-select v-model="isPlanet" :items="isPlanetOptions"></v-select>
        </td>
        <td v-if="!isMobile"></td>
        <td>
          <v-text-field
            v-model="moons"
            type="number"
            label="Lunes"
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="gravity"
            type="number"
            label="Gravité"
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="density"
            type="number"
            label="Densité"
          ></v-text-field>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isPlanetOptions: ['Tous', 'Planètes', 'Autres'],
      isPlanet: 'Tous',
      search: '',
      gravity: '',
      density: '',
      moons: '',
      headers: [
        { text: 'Nom', value: 'name', align: 'start' },
        {
          text: 'Planète',
          value: 'isPlanet',
          align: 'start',
          filter: (value) => {
            if (this.isPlanet === 'Tous') return true
            if (this.isPlanet === 'Planètes') return value
            if (this.isPlanet === 'Autres') return !value
          },
        },
        {
          text: 'Découvert par',
          value: 'discoveredBy',
          align: 'start',
        },
        {
          text: 'Lunes',
          value: 'moons.length',
          align: 'start',
          filter: (value) => {
            if (!this.moons) return true
            return value >= parseInt(this.moons)
          },
        },
        {
          text: 'Gravité',
          value: 'gravity',
          align: 'end',
          filter: (value) => {
            if (!this.gravity) return true
            return value >= parseFloat(this.gravity)
          },
        },
        {
          text: 'Densité',
          value: 'density',
          align: 'end',
          filter: (value) => {
            if (!this.density) return true
            return value >= parseFloat(this.density)
          },
        },
      ],
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === 'xs'
    },
  },
  methods: {
    rowGoTo(item) {
      this.$router.push('/planets/' + item.id)
    },
  },
}
</script>

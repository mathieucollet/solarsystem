<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="variant"
      :clipped="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-btn v-if="drawer" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; Mathieu Collet - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-earth',
          title: 'Planètes',
          to: '/',
        },
        {
          icon: 'mdi-heart',
          title: 'Favoris',
          to: '/favorites',
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Système solaire',
    }
  },
  computed: {
    isMobile() {
      return ['xs', 'sm', 'md'].includes(this.$vuetify.breakpoint.name)
    },
    variant() {
      if (this.isMobile) return false
      return !this.isMobile && this.miniVariant
    },
  },
}
</script>

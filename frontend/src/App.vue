<template>
  <div id="app">

    <md-tabs class="md-primary" md-alignment="centered" md-sync-route>
      <md-tab id="tab-home" md-label="Início" to="/" md-icon="home" exact></md-tab>
      <md-tab id="tab-feedback" md-label="Feedback" to="/feedback" md-icon="fact_check"></md-tab>
    </md-tabs>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="stylus">
  #app
    height 100vh
</style>

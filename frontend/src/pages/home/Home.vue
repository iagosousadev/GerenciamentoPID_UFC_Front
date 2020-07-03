<template>
  <md-empty-state
      md-icon="devices_other"
      md-label="Plataforma de feedbacks"
      md-description="">
      <md-button to="/feedback" class="md-primary md-raised">Começar a enviar</md-button>
    </md-empty-state>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="stylus">
.texto
  color red
  background yellow
</style>
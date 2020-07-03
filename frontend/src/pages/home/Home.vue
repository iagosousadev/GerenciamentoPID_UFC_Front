<template>
  <md-empty-state
      md-icon="fact_check"
      md-label="Plataforma de feedbacks"
      md-description="Comece a enviar seus feedbacks semanais numa interface nova, amigável e simplificada!">
      <md-button to="/feedback" class="md-primary md-raised">Começar</md-button>
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
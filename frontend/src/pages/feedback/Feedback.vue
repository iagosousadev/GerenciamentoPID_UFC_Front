<template>
  <!--<md-tabs class="md-accent" md-alignment="right">
      <md-tab id="tab-home" md-label="Home"></md-tab>
      <md-tab id="tab-pages" md-label="Pages"></md-tab>
      <md-tab id="tab-posts" md-label="Posts"></md-tab>
      <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
    </md-tabs>
-->
  <div>
    <md-steppers>
      <md-step id="primeiro" md-label="Identificação">
        <form>
          <md-field :class="validaUsuarioClasse">
            <md-icon>lock</md-icon>
            <label>ID do usuário</label>
            <md-input v-model="submissao.pessoa_id" maxlength="12"></md-input>
            <span class="md-error">Digite o ID completo</span>
          </md-field>

          <md-field :class="validaData">
            <md-icon>event</md-icon>
            <label>Data</label>
            <md-input placeholder="dd/mm/aaaa" v-model="submissao.data"></md-input>
            <span class="md-error"></span>
          </md-field>

          <md-field>
            <md-icon>event</md-icon>
            <label>Semana do ano</label>
            <md-input v-model="submissao.semana" type="number"></md-input>
            <span class="md-helper-text">Semana atual é {{semanaInfo.atual}}. Vai de {{semanaInfo.dataInicio}} até {{semanaInfo.dataFim}}. <a target="_blank" href="https://www.calendario-365.com.br/numero-da-semana.html">Conferir aqui</a>.</span>
          </md-field>
        </form>
      </md-step>

      <md-step id="segundo" md-label="Atividades">
        
      </md-step>
    </md-steppers>
    </div>
</template>

<script>
  // https://vuematerial.io/components/form


  export default {
    name: 'Login',
    data: () => ({
      submissao:{
        pessoa_id:"",
        semana: 0,
        data:"",
        feedbacks : []
      },
      semanaInfo:{
        atual : 0,
        dataInicio:'',
        dataFim:''
      }
    }),
    beforeMount(){
      let hoje = new Date()
      this.$data.submissao.semana = Math.floor(this.semanaAno())
      this.$data.submissao.data = (hoje.getDate()<10?"0":"")+hoje.getDate()+"/"+(hoje.getMonth()<9?"0":"")+(hoje.getMonth()+1)+"/"+hoje.getFullYear()
      this.$data.semanaInfo.atual = Math.floor(this.semanaAno())
      let datas = this.getSemanaInicioFim()
      let diaInicio = (datas[0].getDate()<10?"0":"")+datas[0].getDate()+"/"+(datas[0].getMonth()<9?"0":"")+(datas[0].getMonth()+1)
      let diaFim = (datas[1].getDate()<10?"0":"")+datas[1].getDate()+"/"+(datas[1].getMonth()<9?"0":"")+(datas[1].getMonth()+1)
      this.$data.semanaInfo.dataInicio = diaInicio
      this.$data.semanaInfo.dataFim = diaFim
    },
    computed: {
      validaUsuarioClasse () {
        return {
          'md-invalid': String(this.submissao.pessoa_id).length != 12
        }
      },
      validaData () {
        return {
          'md-invalid': !(String(this.submissao.data).indexOf("/") > -1 && String(this.submissao.data).indexOf("/",String(this.submissao.data).indexOf("/")) > -1)
        }
      }
    },
    methods: {
      semanaAno(dataComp = new Date()){
        let diaInicioSemana = new Date(dataComp.getFullYear(),0,-(new Date(dataComp.getFullYear(),0,1).getDay()-2))
        let semanaAno = ((dataComp - diaInicioSemana) / 86400000) / 7 +1
        return semanaAno;
      },
      getSemanaInicioFim(dataComp = new Date()){
        let inicioSemana = new Date(new Date(dataComp).setDate( new Date(dataComp).getDate() -(new Date(dataComp).getDay()-1) ))
        let dataFim = new Date(new Date(inicioSemana).setDate(inicioSemana.getDate() +6))
        return [inicioSemana,dataFim];
      }
    }
  }
    // methods: {
    //   validaUsuarioClasse () {
    //     console.log(this.submissao.pessoa_id)

    //     return {
    //         'md-invalid': String(this.submissao.pessoa_id).length != 12
    //       }

    //     // const field = this.$v.form[fieldName]
    //   }
    // },
    
</script>


<!--<script>
export default {
  name: 'Login',
  components: {}
}
</script>-->

<style lang="stylus">
</style>
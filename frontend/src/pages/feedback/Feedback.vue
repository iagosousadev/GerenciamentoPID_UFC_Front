<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-large-size-50 md-medium-size-100 md-xsmall-size-100">

        <md-steppers :md-active-step.sync="stepperId">
          <md-step id="identificacao" md-label="Identificação">
            <form>
              <md-field :class="validaUsuarioClasse">
                <md-icon>account_box</md-icon>
                <label>ID do usuário</label>
                <md-input v-model="submissao.pessoa_id" maxlength="12"></md-input>
                <span class="md-error">Digite o ID completo</span>
              </md-field>
              
              <!--<md-field :class="validaData">
                <md-icon>event</md-icon>
                <label>Data</label>
                
                <md-input placeholder="dd/mm/aaaa" v-model="submissao.data"></md-input>
                <span class="md-error">Data inválida. Use dd/mm/aaaa.</span>
              </md-field>--->

              <md-field>
                <md-icon>event</md-icon>
                <label>Semana do ano</label>
                <md-input v-model="submissao.semana" type="number"></md-input>
                <span class="md-helper-text">Semana atual é {{semanaInfo.atual}}. Vai de {{semanaInfo.dataInicio}} até {{semanaInfo.dataFim}}. <a target="_blank" href="https://www.calendario-365.com.br/numero-da-semana.html">Conferir aqui</a>.</span>
              </md-field>
              <md-button @click="btnIdentificacaoClick()" class="md-raised md-primary">Próximo</md-button>
            </form>
          </md-step>



          <md-step id="atividades" md-label="Atividades">

            <div v-for="(atividade, atvId) in atividades_data" v-bind:key="atvId">

              <md-datepicker v-model="atividade.data" >
                <label>Data</label>
              </md-datepicker>

              <md-field :class="validaIntervaloHrs">
                <md-icon>access_alarm</md-icon>
                <label>Duração</label>
                <md-input v-model="atividade.duracao" maxlength="5"></md-input>
                <span @click="showFormStatus()" class="md-error">Formato: hh:mm</span>
              </md-field>

              <div>
                <md-chips v-model="atividade.ids" md-placeholder="@idProfessor"></md-chips>
              </div>

              <md-field>
                <label>Descrição</label>
                <md-textarea v-model="atividade.descricao" md-autogrow></md-textarea>
              </md-field>

              <md-button v-on:click="atividades_data.splice(atvId, 1)" class="md-accent">Remover</md-button>

              <md-divider></md-divider>
            </div>

            <md-button v-on:click="addNewAtividade()" class="md-fab md-primary">
              <md-icon>add</md-icon>
            </md-button>

            

          </md-step>


        </md-steppers>

      </div>  
    </div>
  </div>
</template>

<script>
  // https://vuematerial.io/components/form


  export default {
    name: 'Login',
    data: () => ({
      atividades_data: [],
      teste: [],
      stepperId : 'identificacao',
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
      
      // this.$data.submissao.data = (hoje.getDate()<10?"0":"")+hoje.getDate()+"/"+(hoje.getMonth()<9?"0":"")+(hoje.getMonth()+1)+"/"+hoje.getFullYear()
      this.$data.submissao.data = hoje.getFullYear()+"-"+ (hoje.getMonth()<9?"0":"")+(hoje.getMonth()+1) +"-" + (hoje.getDate()<10?"0":"")+hoje.getDate()
      
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
          // 'md-invalid': !(String(this.submissao.data).indexOf("/") > -1 && String(this.submissao.data).indexOf("/",String(this.submissao.data).indexOf("/")+1) > -1)
          'md-invalid': !(String(this.submissao.data).indexOf("-") > -1 && String(this.submissao.data).indexOf("-",String(this.submissao.data).indexOf("-")+1) > -1)
        }
      },
      validaIntervaloHrs(t){
        console.log(t);
        return{
          'md-invalid':true
        }
        
      }
    },
    methods: {
      addNewAtividade(){
        this.atividades_data.push(
          {
            data:new Date(),
            duracao:'01:00',
            ids:[],
            descricao:'',
          }
        )
      },
      showFormStatus(){
        console.log("Atividades=",this.atividades_data);
      },
      btnIdentificacaoClick(){
        this.stepperId = 'atividades'
      },
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
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
const app = Vue.createApp({
    data() {
        return {
            playerHealth:100,
            monsterHealth:100,
            attackRound:0,
            winner:null,
            logMessages:[]
        }
    },
    computed:{
        monsterHealthStyle(){
            if(this.monsterHealth<0){
                    return {width : '0%'}
            }
            return {width : this.monsterHealth+'%'}
        },
        playerHealthStyle(){
            if(this.playerHealth<0){
                return {width : '0%'}
            }
            return {width : this.playerHealth+'%'}
        },
        specialAttackDisableStyle(){
            return this.attackRound%3 !== 0
        }
    },
    watch:{
        playerHealth(newVal){
            if(newVal<=0 && this.monsterHealth<=0){
                this.winner = "Draw"
            }else if(newVal<=0){
                this.winner = "Monster"
            }
            else if((newVal) > 100){
                this.playerHealth = 100
            }
        },
        monsterHealth(newVal){
            if(newVal<=0 && this.playerHealth<=0){
                this.winner = "Draw"
            }else if(newVal<=0){
                this.winner = "Player"
            }
        }
    },
    methods: {
        startNewGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.attackRound = 0
            this.winner = null
            this.logMessages = []
        },
        attackMonster(){
            this.attackRound++
            let attackVal = getRandomNumber(5,12)
            this.addLogMessage("Player","attack",attackVal)
            this.monsterHealth -= attackVal
            this.attackPlayer()
        },
        attackPlayer(){
            let attackVal = getRandomNumber(8,15)
            this.addLogMessage("Monster","attack",attackVal)
            this.playerHealth -= attackVal
        },
        specialAttackToMonster(){
            this.attackRound++
            let attackVal = getRandomNumber(10,25)
            this.addLogMessage("Player","attack",attackVal)
            this.monsterHealth -= attackVal
            this.attackPlayer()
        },
        healPlayer(){
            this.attackRound++
            let healValue = getRandomNumber(8,20)
            this.addLogMessage("Player","heal",healValue)
            this.playerHealth+=healValue
            this.attackPlayer()
        },
        surrender(){
            this.winner = "Monster"
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            })
        }
    },
})
app.mount("#game")
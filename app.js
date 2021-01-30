
const url = 'https://notas-f8fc4-default-rtdb.firebaseio.com/emails.json'

const app = Vue.createApp({
    data() {
        return {
            emailAdd: '',
            allEmails: [],
            errorMessageVisible: false,
            createdEmailVisible: false
        }
    },
      
    methods: {

        fetchAllEmails(){

            fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data){
                let newArrayDataOfOjbect = Object.values(data)
                this.allEmails = newArrayDataOfOjbect
                let emailsFromBBDD = this.allEmails
                this.checkIfEmailExists(emailsFromBBDD)
                } else {
                    this.addEmail()
                }
            })

        },

        checkIfEmailExists(emailsFromBBDD){

                const emails = emailsFromBBDD
                const emailadded = this.emailAdd
                const found = emails.some(el => el.correo === emailadded);
                found ? this.errorMessage() : this.addEmail()
        },
        
        addEmail() {

            const emailNuevo = {
                correo: this.emailAdd
            }
            
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(emailNuevo)
            }  
            
            fetch(url, postOptions).catch(error => {
                console.log("ha ocurrido un error" + error)
            })

            this.createdEmailVisible = true
            setTimeout(()=>{this.createdEmailVisible = false}, 2000)

        },

        errorMessage(){

            this.errorMessageVisible = true
            setTimeout(()=>{this.errorMessageVisible = false}, 5000)

        },

        clearEmailText(){

            this.emailAdd = ""

        }
        
    }

})

app.mount('#sectionEmail')


const { createApp } = Vue

var app = createApp({
    data() {
        return {
            spinner: false,
            tab1: true,
            name: '',
            subject: '',
            message: '',
            email: '',
            newsletter:'',
            tab2: true,
            tab3: true,
            tab4:true,
            profile: '',
            printing: '',
            laze:'',
            rollingPapers: '',
            packaging: '',
            products:['PRODUCT1','PRODUCT2','PRODUCT3','PRODUCT4',],
            api:'https://script.google.com/macros/s/AKfycbzCsON9C9ivSOcQ7ONjLxwCCNZJ1a-cQX2GOsFfCloOTYKuqGxEmhyL_ybI58pmweHMbQ/exec',
            api2: 'https://script.google.com/macros/s/AKfycbx5JolRUyxD6qzlPbNL6lRKnuX7CdpNzNyB-A4VslNYsO4REFscDmx3QL88ckWvjHKpXA/exec',
           

        }
    },
    methods: {
        encode(x) {
            return encodeURIComponent(x)
        },
        postNews() {
            fetch(this.api2, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: this.newsletter
            }).then(res => res.json()).then(res => {
                alert('Thank You !')
            })
        },
        tabAll() {
            this.tab1 = true;
            this.tab2 = true;
            this.tab3 = true;
            this.tab4 = true;
        }
    },
    mounted() {
        this.spinner = true;
        fetch(this.api).then(res => res.json()).then(res => {
            console.log(res)
            this.profile = res
            this.printing = res.products.printing
            this.rollingPapers = res.products.rollingPapers
            this.packaging = res.products.packaging
            this.laze = res.products.laze

            console.log(this.packaging)
            this.spinner = false
        })
    }
})

app.component('pot1',{
    template:
    /*html*/
    `
    <h1>hello {{name}} </h1>
    `,
    data(){
        return{
            name:'pot1'
        }
    }
})
app.component('pot2',{
    template:
    /*html*/
    `
    <h1>hello {{name}} </h1>
    `,
    data(){
        return{
            name:'pot2'
        }
    }
})


app.mount('#appp')
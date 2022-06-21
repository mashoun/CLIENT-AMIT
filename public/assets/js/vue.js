const { createApp } = Vue

createApp({
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
            profile: '',
            printing: '',
            rollingPapers: '',
            packaging: '',
            api:'https://script.google.com/macros/s/AKfycbyeMtRt5OpkzjZ3o_xzghYojx9LuXYJxa6cA9JFrxSJuci9NpaFnGYCJUr_rqrFyZ3S/exec',
            api2: 'https://script.google.com/macros/s/AKfycbx5JolRUyxD6qzlPbNL6lRKnuX7CdpNzNyB-A4VslNYsO4REFscDmx3QL88ckWvjHKpXA/exec'

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
                alert(res)
            })
        },
        tabAll() {
            this.tab1 = true;
            this.tab2 = true;
            this.tab3 = true;
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

            console.log(this.packaging)
            this.spinner = false
        })
    }
}).mount('#appp')
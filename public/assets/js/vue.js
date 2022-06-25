const { createApp } = Vue

var app = createApp({
    data() {
        return {
            spinner: false,
            currentTab: 'laze',
            currentList: [],
            tab1: true,
            name: '',
            subject: '',
            message: '',
            email: '',
            newsletter: '',
            tab2: true,
            tab3: true,
            tab4: true,
            profile: '',
            printing: '',
            laze: '',
            rollingPapers: '',
            packaging: '',
            products: ['packaging', 'rollingPapers', 'laze', 'printing',],
            api: 'https://script.google.com/macros/s/AKfycbzGcC40hKVX9BRX5zoN9vIGecD8iBafprCQyhVjNfz-EWhR_EnjJSRgk_liDrDNPvPz/exec',
            api2: 'https://script.google.com/macros/s/AKfycbx5JolRUyxD6qzlPbNL6lRKnuX7CdpNzNyB-A4VslNYsO4REFscDmx3QL88ckWvjHKpXA/exec',


        }
    },
    methods: {
        getAllProducts(){
            var arr = []
            var res = this.profile
            for (let i = 0; i < res.tabs.length; i++) {
                // console.log(res.products[res.tabs[i]])
                arr.push(res.products[res.tabs[i]][0])

            }
            this.currentList = arr
        },
        getCurrentList() {
            // var name = this.currentTab

            console.log('list', this.profile.products[this.currentTab])
            this.currentList = this.profile.products[this.currentTab];
            return this.profile.products[this.currentTab];
        },
        setCurrentTab(tab) {
            this.currentTab = tab

            this.currentList = this.profile.products[this.currentTab];
        },
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
            var arr = []
            for (let i = 0; i < res.tabs.length; i++) {
                // console.log(res.products[res.tabs[i]])
                arr.push(res.products[res.tabs[i]][0])

            }
            this.currentList = arr
            // console.log('ARR',arr)
            this.spinner = false
        })
    }
})

app.component('product', {
    template:
        /*html*/
        `
    <section class="products-container" >
        <div v-for="l in plist" :key="l" class="product-box">
        <img :src="l.url" alt="" class="scale-in-center">
        <div class="text-container">
        <div class="text-pot">
            <h4>{{l.title}}</h4>
            <button type="button" class="modal-btn" data-toggle="modal" :data-target="'#'+l.id">
            <i class="bi bi-arrows-angle-expand"></i>

            </button>

            <!-- Modal -->
            <div class="modal fade" :id="l.id" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <img :src="l.url" alt="" class="modal-img">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{l.title}}</h5>
                    <button type="button" class="close close-btn" data-dismiss="modal" aria-label="Close">
                    <i class="bi bi-arrows-angle-contract"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <h4>{{l.info}}</h4>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        </div>
    </section>
    
    `,
    data() {
        return {
            name: 'pot1',
            list: [
                {
                    "title": "Glow in The Dark",
                    "info": "Optically active pigments which absorb light energy from any light source and then re-emit them as light",
                    "url": "https://drive.google.com/uc?export=view&id=1YmGTfK5FBJ3rghocHnYsJB0GJsMAYIWb",
                    "id": "Printing1",
                    "index": 1
                },
                {
                    "title": "Hot foil",
                    "info": "A process that involves creating an impression on a surface using thin metal hot foil plates and special foil sheets",
                    "url": "https://drive.google.com/uc?export=view&id=1onhq286FcFpdYpzli5S711E_MNzLEcKk",
                    "id": "Printing2",
                    "index": 2
                },
                {
                    "title": "Cold foil",
                    "info": "A printing method that coats metal foil on a substrate to create a more attractive final product",
                    "url": "https://drive.google.com/uc?export=view&id=1PF9bFMqu2_wVi0_IjEjV2h191Go2FYia",
                    "id": "Printing3",
                    "index": 3
                },
                {
                    "title": "Spot UV",
                    "info": "Spot UV is a creative way to add depth and contrast through varying levels of sheen and texture. Used primarily as a design technique, Spot UV is applied to specific areas of printed pieces rather than coating the entire surface.",
                    "url": "https://drive.google.com/uc?export=view&id=1_wlb0rlkeBzhcuFWEtYMB_QVLCVQ9VN2",
                    "id": "Printing4",
                    "index": 4
                }
            ],
        }
    },
    props: ['plist']
})


app.mount('#appp')
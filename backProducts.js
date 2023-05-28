const url = "https://vue3-course-api.hexschool.io/v2";
const path = "yuna1002";
const app = {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    checkAccount() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "login.html";
        });
    },
    getProducts() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          console.log("產品", res.data.products);
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    //從cookie取出token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yunaToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //將token放置hearders
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAccount();
  },
};
Vue.createApp(app).mount("#app");

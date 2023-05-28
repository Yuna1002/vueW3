const url = "https://vue3-course-api.hexschool.io/v2";
const path = "yuna1002";
// let productModal = {};
// let delProductModal = {};

const app = {
  data() {
    return {
      products: [],
      productModal: {},
      delProductModal: {},
      tempProduct: {}, //Modal裡的資料
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
    openModal(state, item) {
      if (state === "new") {
        this.tempProduct = {};
        this.productModal.show();
      } else if (state === "edit") {
        this.tempProduct = { ...item };
        this.productModal.show();
      } else if (state === "del") {
        this.tempProduct = { ...item };
        this.delProductModal.show();
      }
    },
  },
  mounted() {
    //modal實體化
    this.productModal = new bootstrap.Modal(
      document.getElementById("productModal")
    );
    this.delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
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

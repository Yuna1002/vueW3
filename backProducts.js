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
      tempProduct: {
        imagesUrl: [],
      }, //Modal裡的資料
      isNew: true, //modal裡的確認鍵是新增/編輯
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
        this.isNew = true;
        this.productModal.show();
      } else if (state === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.productModal.show();
      } else if (state === "del") {
        this.tempProduct = { ...item };
        this.delProductModal.show();
      }
    },
    addProduct() {
      const data = this.tempProduct;
      axios
        .post(`${url}/api/${path}/admin/product`, { data })
        .then((res) => {
          alert(res.data.message);
          this.productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          console.log(err.data.message);
        });
    },
    editProduct(id) {
      const data = this.tempProduct;
      axios
        .put(`${url}/api/${path}/admin/product/${id}`, { data })
        .then((res) => {
          alert(res.data.message);
          this.productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delProduct(id) {
      axios
        .delete(`${url}/api/${path}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.delProductModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
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

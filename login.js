const url = "https://vue3-course-api.hexschool.io/v2";
const path = "yuna1002";
const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message);
          //將token、expired儲存在cookie
          document.cookie = `yunaToken=${res.data.token}; expires=${new Date(
            res.data.expired
          )}`;
          //表單清空
          this.resetForm();
          //跳轉後台產品頁面
          window.location = "backProducts.html";
        })
        .catch((err) => {
          alert(err.data.message);
          this.resetForm();
        });
    },
    resetForm() {
      this.user.username = "";
      this.user.password = "";
    },
  },
};
Vue.createApp(app).mount("#app");

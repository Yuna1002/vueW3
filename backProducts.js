const url = "https://vue3-course-api.hexschool.io/v2";
const app = {
  data() {
    return {};
  },
  methods: {
    checkAccount() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "login.html";
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

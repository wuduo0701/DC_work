const demo = new Vue({
  el: '#demo',
  data() {
    return {
      credentialData: {},
      claim: {},
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      axios({
        method:'post',
        url: 'http://59.110.170.246:6660/api/v1/get_credential',
        data: {
          credential_id: "1",
        },
        headers: {
          'Content-Type': 'application/javascript',
        },
      }).then(res => {
        if (res.data.respBody.credential) {
          // this.credentialData.claim. = credentialData.claim.
          this.claim = res.data.respBody.credential.claim;
          this.credentialData = res.data.respBody.credential;
          console.log(this.credentialData);
        }
      });
    },
    transformTime(fmt, date) {
      let ret="";
      date = new Date(date);
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          );
        }
      };
      return fmt;
    },
  },
});
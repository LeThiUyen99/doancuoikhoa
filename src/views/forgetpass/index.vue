<template>
  <div class="forgetpass-container">
    <div>
      <lang-select style="padding: 10px" class="right-menu-item hover-effect" />
    </div>
    <el-form class="forgetpass-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ $t('forget_password') }}</h3>
      </div>
      <el-form-item>
        <!-- <span class="svg-container">
          <svg-icon icon-class="email" />
        </span> -->
        <el-input
          v-model="email"
          type="text"
          :placeholder="$t('input_email_2')"
          name="email"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="password"
          type="password"
          :placeholder="$t('input_password')"
          name="password"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="comfirmpassword"
          type="password"
          :placeholder="$t('reinput_password')"
          name="comfirmpassword"
        />
      </el-form-item>
      <el-col :sm="12" class="pr-lg-5">
        <el-form-item>
          <el-input
            v-model="capcha"
            :placeholder="$t('input_capcha')"
            type="text"
            name="capcha"
          />
        </el-form-item>
      </el-col>
      <el-col :sm="12" style="margin-bottom: 25px;" class="pr-lg-5">
        <el-button
          type="primary"
          style="width: 100%; padding: 15px"
          @click="onEmailForm"
        >{{ $t('get_code') }}</el-button>
      </el-col>
      <el-col :sm="12" class="pr-lg-5">
        <el-button :loading="loading" type="primary" style="width: 100%; padding: 15px;" @click="onComfirmPass">{{ $t('confirm') }}</el-button>
      </el-col>
      <el-col :sm="12" class="pr-lg-5">
        <el-button type="warning" style="width: 100%; padding: 15px" @click="onCancel">{{ $t('cancel') }}</el-button>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import AccountResource from '@/api/account'
const accountResource = new AccountResource()
import md5 from 'js-md5'
import LangSelect from '@/components/LangSelect'
import i18n from '@/lang/i18n'
export default {
  name: 'ForgetPass',
  components: { LangSelect },
  data() {
    return {
      email: '',
      password: '',
      comfirmpassword: '',
      capcha: '',
      loading: false
    }
  },
  methods: {
    validate_email(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    isValidate() {
      if (!this.validate_email(this.email)) {
        this.$message.error(i18n.t('format_email_error'))
        return false
      }
      if (this.password !== this.comfirmpassword) {
        this.$message.error(i18n.t('password_not_semilar'))
        return false
      }
      return true
    },
    onEmailForm() {
      if (!this.validate_email(this.email)) {
        this.$message.error(i18n.t('format_email_error'))
        return
      }
      this.isAdd = true
      accountResource.SendEmail({ email: this.email }).then((response) => {
        const { error, msg } = response
        console.log('......................otp ', JSON.stringify(response))
        if (error === 0) {
          this.$message.success(msg)
        }
      })
    },
    onCancel() {
      this.$router.back()
    },
    onComfirmPass() {
      if (!this.isValidate()) {
        return
      }
      this.isAdd = false
      this.loading = true
      accountResource
        .forgotPassword({
          email: this.email,
          new_password: md5(this.password),
          otp: this.capcha
        })
        .then((response) => {
          this.loading = false
          const { error, msg } = response
          if (error === 0) {
            this.$msgbox.setDefaults({
              callback: () => {
                this.$router.back()
              }
            })
            this.$msgbox.alert(msg)
          } else {
            this.$message.success(msg)
          }
        })
    }
  }
}
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .forgetpass-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.forgetpass-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.el-dropdown{
  color: #fff;
  position: absolute;
  top: 3px;
  font-size: 18px;
  right: 0px;
  cursor: pointer;
}
.forgetpass-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .forgetpass-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

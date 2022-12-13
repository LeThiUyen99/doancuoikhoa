<template>
  <div class="register-container">
    <div>
      <lang-select style="padding: 10px" class="right-menu-item hover-effect" />
    </div>
    <el-form class="register-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h1 class="title">{{ $t('signup_acc') }}</h1>
      </div>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="name"
          v-model="name"
          :placeholder="$t('full_name')"
          name="name"
          type="text"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="phone" />
        </span>
        <el-input
          ref="phone"
          v-model="phone"
          :placeholder="$t('phone')"
          name="phone"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="Email"
          v-model="email"
          :placeholder="$t('mail')"
          name="Email"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="password"
          :placeholder="$t('password')"
          :type="passwordType"
          name="password"
          tabindex="1"
          autocomplete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div style="padding-bottom: 20px">
        <input v-model="boolean" type="checkbox" name="acceptTerms" class="filled-in">
        <span style="color:#fff; padding-left: 5px">{{ $t('rules') }}</span>
      </div>
      <div style="display:flex;">
        <el-button type="primary" style="width:100%" @click="onCreateAccout">{{ $t('registration') }}</el-button>
        <el-button @click="onCallBack">{{ $t('canel') }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import AccountResource from '@/api/account'
const accountResource = new AccountResource()
import md5 from 'js-md5'
import i18n from '@/lang/i18n'
import LangSelect from '@/components/LangSelect'
export default {
  name: 'Register',
  components: { LangSelect },
  data() {
    return {
      loadingTable: false,
      name: null,
      phone: null,
      email: null,
      password: null,
      boolean: null,
      passwordType: 'password'
    }
  },
  mounted() {
    if (this.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    isValidate() {
      if (!this.name) {
        this.$msgbox.setDefaults({
          callback: () => {
            this.$refs.name.focus()
          }
        })
        this.$msgbox(i18n.t('validate_username'))
        return false
      }
      if (!this.phone) {
        this.$msgbox.setDefaults({
          callback: () => {
            this.$refs.phone.focus()
          }
        })
        this.$msgbox(i18n.t('validate_phone'))
        return false
      }
      if (!this.email) {
        this.$msgbox.setDefaults({
          callback: () => {
            this.$refs.email.focus()
          }
        })
        this.$msgbox(i18n.t('validate_email'))
        return false
      }
      if (!this.password) {
        this.$msgbox.setDefaults({
          callback: () => {
            this.$refs.password.focus()
          }
        })
        this.$msgbox(i18n.t('password_empty'))
        return false
      }
      return true
    },
    onCreateAccout() {
      if (!this.isValidate()) return
      accountResource.storeAccount({ name: this.name, username: this.email, password: md5(this.password), phone: this.phone, email: this.email, active: 1 }).then(response => {
        const { error, msg } = response
        if (error === 0) {
          this.$message.success(msg || i18n.t('register_success'))
          this.$router.push('/login')
        } else {
          this.$message.error(msg || i18n.t('register_fail'))
        }
      })
    },
    onCallBack() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
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
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.el-dropdown{
  color: #fff;
  position: absolute;
  top: 3px;
  font-size: 18px;
  right: 0px;
  cursor: pointer;
}
.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
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

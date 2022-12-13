<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <el-form>
        <div class="box-center">
          <!--          <i class="el-icon-upload2" @click="onUploadAvatar" />-->
          <pan-thumb :image="user_avatar" :height="'100px'" :width="'100px'" :hoverable="false">
            <!--            <div class="clearfix">-->
            <!--              <upload-image v-model="user_avatar" :url-current="user_avatar" @onSetUrlImage="handleSetUrlImage" />-->
            <!--          {{ user.role }}-->
            <!--            </div>-->
          </pan-thumb>
          <!--          <el-avatar :size="100" :src="user_avatar" :hoverable="false"></el-avatar>-->
        </div>
      </el-form>
      <div class="box-center">
        <div class="user-name text-center">{{ user_name }}</div>
        <!-- <div class="user-role text-center text-muted">{{ role | uppercaseFirst }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="change-avatar user-bio-section">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <div class="user-bio-section-header">
                <svg-icon icon-class="user" />
                <span>{{ $t('change_avatar') }}</span></div>
            </template>
            <el-menu-item-group>
              <div class="user-bio-section-body">
                <el-form class="changename-form" autocomplete="on" label-position="left">
                  <div class="progress-item">

                    <div class="clearfix">
                      <el-link @click="onChangeAvatarClick">
                        <el-image :src="user_avatar" :fit="contain" @error="$event.target.src=logo" />
                      </el-link>
                      <div v-if="imageError" class="imageError">
                        {{ imageError }}
                      </div>
                      <!--                      <upload-image v-model="user_avatar" :url-current="user_avatar" @onSetUrlImage="handleSetUrlImage" />-->
                      <!--                      <my-upload-->
                      <!--                        ref="refCrop"-->
                      <!--                        v-model="is_show_crop"-->
                      <!--                        field="img"-->
                      <!--                        :width="300"-->
                      <!--                        :height="300"-->
                      <!--                        img-format="png"-->
                      <!--                        lang-type="en"-->
                      <!--                        @crop-success="cropSuccess"-->
                      <!--                        @crop-upload-success="cropUploadSuccess"-->
                      <!--                        @crop-upload-fail="cropUploadFail"-->
                      <!--                      />-->
                      <!--                      <img :src="user_avatar">-->
                      <!--          {{ user.role }}-->
                    </div>
                    <el-button @click="onUploadAvatar">{{ $t('change_avatar') }}</el-button>
                  </div></el-form>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="change-name user-bio-section">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <div class="user-bio-section-header">
                <svg-icon icon-class="change-name" />
                <span>{{ $t('change_name') }}</span></div>
            </template>
            <el-menu-item-group>
              <div class="user-bio-section-body">
                <el-form class="changename-form" autocomplete="on" label-position="left">
                  <div class="progress-item">
                    <el-form-item :label="$t('account')">
                      <el-input v-model="user_name" :placeholder="$t('account')" />
                    </el-form-item>
                  </div>
                  <el-button @click="onChangeName">{{ $t('change_name') }}</el-button>
                </el-form>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="change-password user-bio-section">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <div class="user-bio-section-header">
                <svg-icon icon-class="change-password" />
                <span>{{ $t('change_pass') }}</span></div>
            </template>
            <el-menu-item-group>
              <div class="user-bio-section-body">
                <el-form class="changepass-form" autocomplete="on" label-position="left">
                  <div class="progress-item">
                    <el-form-item :label="$t('old_pass')">
                      <el-input v-model="old_password" type="password" :placeholder="$t('old_pass')" />
                    </el-form-item>
                  </div>
                  <div class="progress-item">
                    <el-form-item :label="$t('new_pass')">
                      <el-input v-model="new_password" type="password" :placeholder="$t('new_pass')" />
                    </el-form-item>
                  </div>
                  <div class="progress-item">
                    <el-form-item :label="$t('return_pass')">
                      <el-input v-model="reset_password" type="password" :placeholder="$t('return_pass')" />
                    </el-form-item>
                  </div>
                  <el-button @click="onChangePass">{{ $t('change_pass') }}</el-button>
                </el-form>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <my-upload
      ref="refCrop"
      :model-value="is_show_crop"
      field="img"
      :width="300"
      :height="300"
      img-format="png"
      lang-type="en"
      type="file"
      accept="image/*"
      @change="selectedFile"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      @update:modelValue="offDialogUpload"
    />
  </el-card>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import PanThumb from '@/components/PanThumb'
import AccountResource from '@/api/account'
const accountResource = new AccountResource()
import md5 from 'js-md5'
import config_network from '/src/networking/network_config'
import { uploadImgApi } from '@/api/uploadImages'
const MAX_SIZE = 100000
const MAX_WIDTH = 500
const MAX_HEIGHT = 300
export default {
  components: { PanThumb, 'my-upload': myUpload },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          old_name: '',
          old_avatar: ''
        }
      }
    }
  },
  data() {
    return {
      old_password: '',
      new_password: '',
      reset_password: '',
      user_name: '',
      user_avatar: '',
      user_role: '',
      is_show_crop: false,
      contain: 'contain',
      url_upload: config_network.url + '/api/public/post',
      logo: require('@/assets/defaul.png'),
      image: {
        size: '',
        height: '',
        width: ''
      },
      imageError: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    selectedFile() {
      this.imageError = ''

      const file = this.$refs.refCrop.files.pop()

      if (!file || file.type.indexOf('image/') !== 0) return
      this.image.size = file.size
      if (this.image.size > MAX_SIZE) {
        this.imageError = `The image size (${this.image.size}) is too much (max is ${MAX_SIZE}).`
        return
      }

      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = evt => {
        const img = new Image()
        img.onload = () => {
          this.image.width = img.width
          this.image.height = img.height
          console.log(this.image)
          if (this.image.width > MAX_WIDTH) {
            this.imageError = `The image width (${this.image.width}) is too much (max is ${MAX_WIDTH}).`
            return
          }
          if (this.image.height > MAX_HEIGHT) {
            this.imageError = `The image height (${this.image.height}) is too much (max is ${MAX_HEIGHT}).`
            return
          }
        }
        img.src = evt.target.result
      }

      reader.onerror = evt => {
        console.error(evt)
      }
    },
    uploadImage(image, callback = null) {
      uploadImgApi({
        image
      }).then(response => {
        const { name } = response
        if (callback) {
          callback(name)
        }
      })
    },
    handleUploadImageSuccess(response, file) {
      const object = { ...response, ...{ remove: 0 }}
      this.$emit('onSetUrlImage', object)
      this.dialogImageUrl = response.name
    },
    onChangeAvatarClick() {
      this.is_show_crop = true
    },
    offDialogUpload(value) {
      console.log('........................off popup', value)
      this.is_show_crop = value
    },
    cropSuccess(user_avatar, field) {
      console.log('-------- crop success --------', field)
      this.is_show_crop = false
      this.user_avatar = user_avatar
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    getUser() {
      accountResource.profileList().then(response => {
        const { error, data } = response
        // console.log('....................user ', JSON.stringify(response))
        if (error === 0) {
          // console.log('....................user 1')
          this.user_name = data.name
          this.user_avatar = data.avatar
          this.old_name = data.name
          this.old_avatar = data.avatar
          // this.user = {
          //   name: data.name,
          //   role: this.roles.join(' | '),
          //   email: data.email,
          //   avatar: data.avatar
          // }
          // console.log('....................user 2')
        }
      })
    },
    isValidate() {
      if (this.new_password !== this.reset_password) {
        this.$message.error('Mật khẩu không giống nhau')
        return false
      }
      return true
    },
    handleSetUrlImage(object) {
      console.log(',,,,,,,,,,,,,,,,,,,,,,,abc')
      if (object.remove === 1) {
        this.user_avatar = ''
      } else {
        this.user_avatar = object.name
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      console.log('.....................cho nay')
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    base64ToArrayBuffer(base64) {
      var binary_string = window.atob(base64)
      var len = binary_string.length
      var bytes = new Uint8Array(len)
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i)
      }
      return bytes.buffer
    },
    onUploadAvatar() {
      // this.show = !this.show
      console.log('.......................vao day', this.user_avatar)
      // const byteArray = new Buffer(this.user_avatar.replace(/^[\w\d;:\/]+base64\,/g, ''), 'base64')
      // console.log('.............aray byte ', byteArray)
      this.uploadImage(this.user_avatar, (url) => {
        console.log('..................upalod thanh cong', url)
        accountResource.changeProfile({ avatar: url }).then(response => {
          const { error } = response
          if (error === 0) {
            this.user_avatar = url
            this.$message.success(` Cập nhập ảnh đại diện thành công`)
          }
        })
      })
      // this.is_show_crop = true
      // accountResource.changeProfile({ avatar: this.user_avatar }).then(response => {
      //   if (response.error) {
      //     this.$message.success(` Cập nhập ảnh đại diện thành công`)
      //   }
      // })
    },
    onChangeName() {
      accountResource.changeProfile({ name: this.user_name }).then(response => {
        // console.log('........... update info : ', JSON.stringify(response))
        const { error, msg } = response
        if (error === 0) {
          this.$message.success(msg)
        }
      })
    },
    onChangePass() {
      if (!this.isValidate()) {
        return
      }
      accountResource.ChangePassword({
        old_password: md5(this.old_password),
        new_password: md5(this.new_password)
      }).then(response => {
        if (response.error === 0) {
          this.$message.success(`Đổi mật khẩu thành công`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.el-menu {
  border-right: none;
}

.user-bio-section-body {
  margin: 0 20px;
}
.el-image{
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
</style>

<template>
  <el-card :body-style="{ padding: '0px' }">
    <div v-if="showDialog" class="chatbot">
      <vue-advanced-chat
        height="calc(50vh - 20px)"
        :current-user-id="user.id"
        :rooms="JSON.stringify(rooms)"
        :rooms-loaded="true"
        :messages="JSON.stringify(messages)"
        :messages-loaded="messagesLoaded"
        :rooms-list-opened="JSON.stringify(false)"
        :show-add-room="JSON.stringify(false)"
        :show-reaction-emojis="JSON.stringify(false)"
        :show-files="JSON.stringify(false)"
        :show-search="JSON.stringify(false)"
        :show-audio="JSON.stringify(false)"
        :room-info-enabled="JSON.stringify(true)"
        single-room="true"
        message-actions="[]"
        @send-message="sendMessage($event.detail[0])"
        @fetch-messages="fetchMessages($event.detail[0])"
      />
    </div>
  </el-card>
</template>

<script>
import { register } from 'vue-advanced-chat'
import io from 'socket.io-client'
import { getAcountInfo, getToken } from '@/utils/auth'
import MessageResource from '@/api/message'
import { convertDate, convertDateTime } from '@/utils/convert'
// import { isEmpty } from '@/utils/validate'

const messageResource = new MessageResource()

register()
export default {
  name: 'ChatBot',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    objectData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      user: getAcountInfo(),
      rooms: [
        {
          roomId: '' + this.user?.id,
          roomName: 'Contact',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: []
        }
      ],
      messages: [],
      messagesLoaded: false
    }
  },
  created() {
    this.socket = io(process.env.VUE_APP_BASE_SOCKET, { auth: { token: getToken() }})
    this.socket.emit('join', { room: this.user.id })
    this.socket.on('receive_message', (data) => {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length,
          content: data.content,
          senderId: '' + data.sender_id,
          type: data.type,
          timestamp: convertDateTime(data.created_at),
          date: convertDate(data.created_at)
        }
      ]
    })
  },
  methods: {
    fetchMessages() {
      messageResource.list_message({ room: this.user?.id }).then((res) => {
        console.log(res?.data?.list)
        this.messages = res?.data?.list.map(v => ({
          ...v,
          _id: v.id,
          senderId: '' + v.sender_id,
          timestamp: convertDateTime(v.created_at),
          date: convertDate(v.created_at)
        }))
      }).finally(() => { this.messagesLoaded = true })
    },

    sendMessage(message) {
      this.socket.emit('send_message', { content: message.content, sender_id: this.user?.id, room: this.user?.id, type: 1 })
    }

  }
}
</script>

<style>
.chatbot{
  overflow: hidden;
  position: fixed;
  right: 5px;
  text-align: center;
  top: calc(70% + 55px)!important;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 30vw;
  z-index: 9999;
}
/* .vac-message-actions-wrapper{
  display: none !important;
}
.vac-message-actions-wrapper .vac-options-container{
  display: none !important;
}
.vac-svg-button vac-message-options{
  display: none !important;
} */
</style>

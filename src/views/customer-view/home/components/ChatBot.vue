<template>
  <el-card :body-style="{ padding: '0px' }">
    <div v-if="showDialog" class="chatbot">
      <vue-advanced-chat
        height="calc(50vh - 20px)"
        :current-user-id="currentUserId"
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
      currentUserId: '1234',
      rooms: [
        {
          roomId: '1',
          roomName: 'Room 1',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            { _id: '1234', username: 'John Doe' },
            { _id: '4321', username: 'John Snow' }
          ]
        }
      ],
      messages: [],
      messagesLoaded: false
    }
  },
  methods: {
    fetchMessages({ options = {}}) {
      setTimeout(() => {
        if (options.reset) {
          this.messages = this.addMessages(true)
        } else {
          this.messages = [...this.addMessages(), ...this.messages]
          this.messagesLoaded = true
        }
        // this.addNewMessage()
      })
    },

    addMessages(reset) {
      const messages = []

      for (let i = 0; i < 30; i++) {
        messages.push({
          _id: reset ? i : this.messages.length + i,
          content: `${reset ? '' : 'paginated'} message ${i + 1}`,
          senderId: '4321',
          username: 'John Doe',
          date: '13 November',
          timestamp: '10:20'
        })
      }

      return messages
    },

    sendMessage(message) {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length,
          content: message.content,
          senderId: this.currentUserId,
          timestamp: new Date().toString().substring(16, 21),
          date: new Date().toDateString()
        }
      ]
    },

    addNewMessage() {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: this.messages.length,
            content: 'NEW MESSAGE',
            senderId: '1234',
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ]
      }, 2000)
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
  /*bottom: 0px;*/
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  /* width: 50px; */
  z-index: 9999;
}
.vac-message-actions-wrapper{
  display: none !important;
}
.vac-message-actions-wrapper .vac-options-container{
  display: none !important;
}
.vac-svg-button vac-message-options{
  display: none !important;
}
</style>

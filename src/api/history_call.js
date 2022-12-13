import Resource from '@/api/resource'
import request from '@/utils/request'

export default class HistoryCallResource extends Resource {
  constructor() {
    super('api/public/delivery')
  }
  getHistory(delivery_id) {
    return request({
      url: `/${this.uri}/history_called?delivery_id=${delivery_id}&${this.getVerify()}`,
      method: 'get'
    })
  }

  /**
   * Cap nhat lai note
   * @param {Object} body
   */
  updateNoteHistory(body) {
    return request({
      url: `/${this.uri}/update_note_history_called?${this.getVerify()}`,
      method: 'post',
      data: body
    })
  }
}

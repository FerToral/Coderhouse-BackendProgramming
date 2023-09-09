import {MsgModel} from "../models/msgs.model.js";

class ChatDao {
  async getAll() {
    return await MsgModel.find({});
  }

  async getById(id) {
      const search = await MsgModel.findById(id);
      return search;
  }

  async create(msg) {
    await MsgModel.create(msg);
  }

  async updateById(id, updateMsgs) {
    await MsgModel.updateOne({ _id: id }, updateMsgs);
  }

  async deleteById(id) {
    await MsgModel.deleteOne({ _id: id });
  }

}

const chatDao = new ChatDao();

export default chatDao;
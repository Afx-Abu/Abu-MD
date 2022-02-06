Asena.addCommand(
  { pattern: "url", fromMe: true, desc: Lang.URL_DESC },
  async (message, match) => {
    if (
      !message.reply_message ||
      (!message.reply_message.image && !message.reply_message.video)
    )
      return await message.sendMessage(Lang.URL_NEED_REPLY)
    if (message.reply_message.length > 10)
      return await message.sendMessage("*Only accept below 10 MB*")
    let location = await message.reply_message.downloadAndSaveMediaMessage(
      "url"
    )
    let url = await UploadToImgur(location)
    return await message.sendMessage(url, { quoted: message.data })
  }
)

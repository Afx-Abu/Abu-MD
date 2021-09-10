Asena.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (message.jid === '919562803423-1627735504@g.us') {

             return;
         }
         let regex1 = new RegExp('How to create whatsapp bot')
         let regex2 = new RegExp('How to create julie mwol bot')
         let regex3 = new RegExp('How to create pinky bot')
         let regex4 = new RegExp('How to create Amalser bot')
         let regex5 = new RegExp('channel link')
         let regex6 = new RegExp('Thanks')
         let regex7 = new RegExp('who are you')
         let regex8 = new RegExp('How to create Autofilter bot')
         let regex9 = new RegExp('How to create telegram bot')
          if (regex1.test(message.message)) {              
             await message.client.sendMessage(message.jid,'\n *「 https://youtu.be/RlSG4ZgPls0  」*', MessageType.text, {quoted: message.data })
         } 
         else if (regex2.test(message.message)) {
            await message.client.sendMessage(message.jid,'https://youtu.be/HZoWKTYSovI' , MessageType.text, {quoted: message.data })
         }
          else if (regex3.test(message.message)) {
             await message.client.sendMessage(message.jid,'https://youtu.be/dSGrhJZtu24', MessageType.text, {quoted: message.data })
         }
         else if (regex4.test(message.message)) {
            await message.client.sendMessage(message.jid,'https://youtu.be/RlSG4ZgPls0', MessageType.text, {quoted: message.data })
         }
         else if (regex5.test(message.message)) {
           await message.client.sendMessage(message.jid,'Making videos available✅️ Julie mwol✅️Amalser✅️Pinky✅️', MessageType.text, {quoted: message.data })
         }
          else if (regex6.test(message.message)) {
            await message.client.sendMessage(message.jid,'\n *「 Welcome😍😍 」*', MessageType.text, {quoted: message.data })
         }
          else if (regex7.test(message.message)) {
            await message.client.sendMessage(message.jid,'```I am Bot 😊```', MessageType.text, {quoted: message.data })
         }
          else if (regex8.test(message.message)) {
            await message.client.sendMessage(message.jid,'https://youtu.be/zztf40dmEbI', MessageType.text, {quoted: message.data })
         }
          else if (regex9.test(message.message)) {
            await message.client.sendMessage(message.jid,'https://youtu.be/zztf40dmEbI', MessageType.text, {quoted: message.data })
         }
             
 }));

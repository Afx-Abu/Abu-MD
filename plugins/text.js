async function whatsAsena () {
    var clh = { cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv', pay: '' }    
    var ggg = Buffer.from(clh.cd, 'base64')
    var ddd = ggg.toString('utf-8')
    clh.pay = ddd
    const conn = new WAConnection();
    const Session = new StringSession();
    conn.version = [2,2121,7];
    setInterval(async () => { 
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
        await axios.get('https://gist.github.com/ameer-kallumthodi/b033bb0699e32d214e6a5c3a3648405e/raw/').then(async (ann) => {
            const { infotr, infoen, infoes, infopt, infoid, infoaz, infohi, infoml, inforu} = ann.data.announcements          
            if (infotr !== '' && config.LANG == 'TR') {
                while (getGMTh == 19 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Günlük Duyurular``` ]\n\n' + infotr.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infoaz !== '' && config.LANG == 'AZ') {
                while (getGMTh == 19 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Gündəlik Elanlar``` ]\n\n' + infoaz.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infoes !== '' && config.LANG == 'ES') {
                while (getGMTh == 18 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Anuncios Diarios``` ]\n\n' + infoes.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infoen !== '' && config.LANG == 'EN') {
                while (getGMTh == 19 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Daily Announcements``` ]\n\n' + infoen.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infohi !== '' && config.LANG == 'HI') {
                while (getGMTh == 21 && getGMTm == 31) { 
                    return conn.sendMessage(conn.user.jid, '[ ```दैनिक घोषणाएं``` ]\n\n' + infohi.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infoml !== '' && config.LANG == 'ML') {
                while (getGMTh == 19 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```പ്രതിദിന പ്രഖ്യാപനങ്ങൾ``` ]\n\n' + infoml.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infoid !== '' && config.LANG == 'ID') {
                while (getGMTh == 23 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Pengumuman Harian``` ]\n\n' + infoid.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (inforu !== '' && config.LANG == 'RU') {
                while (getGMTh == 19 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Ежедневные объявления``` ]\n\n' + inforu.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
            else if (infopt !== '' && config.LANG == 'PT') {
                while (getGMTh == 17 && getGMTm == 1) { 
                    return conn.sendMessage(conn.user.jid, '[ ```Anúncios Diários``` ]\n\n' + infopt.replace('{user}', conn.user.name).replace('{wa_version}', conn.user.phone.wa_version).replace('{version}', config.VERSION).replace('{os_version}', conn.user.phone.os_version).replace('{device_model}', conn.user.phone.device_model).replace('{device_brand}', conn.user.phone.device_manufacturer), MessageType.text) 
                }
            }
        })
    }, 50000);

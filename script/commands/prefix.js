const h = require('axios');

const j = {
    "✓": "https://i.ibb.co/8LkTmn4w/Messenger-creation-476444671997986.gif",
    "/": "https://i.imgur.com/PeGC5tY.gif",
    "+": "https://i.imgur.com/pJvQ14g.gif",
    "?": "https://i.imgur.com/NBBF6xx.gif",
    "#": "https://i.imgur.com/2d1gbW3.gif",
    "@": "https://i.imgur.com/jHeiRe2.gif",
    "$": "https://i.imgur.com/r7khjog.gif",
    "_": "https://i.imgur.com/LU8WcXC.gif",
    "&": "https://i.imgur.com/QF93HNn.gif",
    "!": "https://i.imgur.com/y8er5ne.gif",
    "*": "https://i.imgur.com/gv8m4V9.gif",
    "~": "https://i.imgur.com/9B2dSCY.gif"
};

const b = "https://i.imgur.com/xnWVcVz.gif";

module.exports.config = {
    name: "prefix",
    version: "1.0.0",
    permission: 0,
    credits: "owner",
    premium: false,
    description: "Show bot prefix",
    prefix: false,
    aliases: ["prefix", "Prefix", "PREFIX", "prefi"],
    category: "without prefix",
    usages: `prefix`,
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.run = async function ({ api: a, event: e, prefix: p, admin: l }) {
    const i = await a.getUserInfo(e.senderID);
    const n = i[e.senderID]?.name;
    const d = j[p] || b;
    const g = await h.get(d, { responseType: 'stream' });

    if (j[p]) {
        a.sendMessage({
            body: `✿ 𝙷𝚒 ${n}, 𝙼𝚢 𝚙𝚛𝚎𝚏𝚒𝚡 𝚒𝚜 𝚒𝚗 𝚝𝚑𝚎 𝚐𝚒𝚏 ✿`,
            attachment: g.data
        }, e.threadID, e.messageID);
    } else {
        a.sendMessage({
            body: `Yo, my prefix is [ 𓆩 ${p || 'no-prefix'} 𓆪 ]\n\n𝗦𝗢𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗧𝗛𝗔𝗧 𝗠𝗔𝗬 𝗛𝗘𝗟𝗣 𝗬𝗢𝗨:\n➥ ${p}help [number of page] -> see commands\n➥ ${p}sim [message] -> talk to bot\n➥ ${p}callad [message] -> report any problem encountered\n➥ ${p}help [command] -> information and usage of command\n\nHave fun and enjoy using my bot❤️`,
            attachment: g.data
        }, e.threadID, e.messageID);
    }
};

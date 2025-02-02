const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "ytmp3",
    version: "1.0.0",
    permission: 0,
    credits: "owner",
    premium: false,
    description: "Send Youtube Music",
    prefix: false,
    category: "without prefix",
    usages: `ytmp3 [music title]`,
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const chilli = args.join(' ');
    if (!chilli) {
        return api.sendMessage('Please provide a song, for example: ytmp3 Selos', event.threadID, event.messageID);
    }
    const apiUrl1 = `https://betadash-search-download.vercel.app/yt?search=${encodeURIComponent(chilli)}`;
    try {
    const response1 = await axios.get(apiUrl1);
    const data1 = response1.data;
    const yturl = data1[0].url;
    const channel = data1[0].channelName;
    
        const apiUrl = `https://downloader.iyot.plus/ytdl?url=${encodeURIComponent(yturl)}&type=mp3`;
    
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.download) {
            return api.sendMessage('No song found for your search. Please try again with a different query.', event.threadID, event.messageID);
        }
        const download = data.download;
        const fileName = `${data.title}.mp3`;
        const filePath = path.join(__dirname, fileName);
        const downloadResponse = await axios({
            method: 'GET',
            url: download,
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(filePath);
        downloadResponse.data.pipe(writer);
        writer.on('finish', async () => {
            api.sendMessage(`title: ${data.title}\n\ndownload link: ${data.download}\n\nuploader: ${channel}`, event.threadID, event.messageID);
            api.sendMessage({
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
                fs.unlinkSync(filePath);
            }, event.messageID);
        });
        writer.on('error', () => {
            api.sendMessage('There was an error downloading the file. Please try again later.', event.threadID, event.messageID);
        });
    } catch (pogi) {
        console.error('Error fetching song:', pogi);
        api.sendMessage('An error occurred while fetching the song. Please try again later.', event.threadID, event.messageID);
    }
};

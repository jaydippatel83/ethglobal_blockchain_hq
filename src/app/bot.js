


const { Telegraf } = require("telegraf");
const TOKEN = "7058370499:AAGxScOLs92V973GMQrrF_WXj55p3qfacQc";
const bot = new Telegraf(TOKEN);

const web_link = "https://ethglobal-blockchain-hq.vercel.app/";

bot.start((ctx) =>
    ctx.reply("Welcome..!!!!!!!!", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();
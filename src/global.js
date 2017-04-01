var fs = require("fs");
var log = require("./logger").getLogger(__filename, 12);

const HOME = require('os').homedir();
const CONFIG_FILE = HOME + "/.habreplicator.js";

module.exports.settings = {
    "golos_host" : "https://golos.io",
    "golos_websocket": "wss://ws.golos.io",	
    "dbdir": "/tmp",
    "habr_rss" : "http:/eifnkjwenrf",
    "geek_rss" : "https://geektimes.ru/rss/best/",
    "postingKey":"5A6F7F...",
    "userid" : "bopox"    
};

function init() {
    //Load setting Object
    try {
        let sets = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
        module.exports.settings = sets;       
    } catch(e) {
        log.warn("unable to read config (" + CONFIG_FILE + ")");
        try {
            fs.writeFileSync(CONFIG_FILE, JSON.stringify(module.exports.settings, null, 4), "utf8");
        } catch(e) {
            log.error("unable to create dummy config (" + CONFIG_FILE + ")");
        }
    }
}

init();

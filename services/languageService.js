const userLanguages = new Map();

function setLanguage(chatId, language) {
    userLanguages.set(chatId, language);
}

function getLanguage(chatId) {
    return userLanguages.get(chatId) || "ar";
}

module.exports = {
    setLanguage,
    getLanguage
};
const generateMsg = (from, text)=>{
    return { from, text, createdAt: new Date().getTime() };
};

const generateLocationMsg = (from, lat, long)=>{
    return {
        from, 
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMsg, generateLocationMsg };
module.exports = async (req, res, next) => {
    const axios = require('axios');
    const body = req.body;
    const token = body.token;
    let userIdAssociativeArray = body.to;
    const messages = JSON.parse(body.messages);
    let url;
    let i = 0;
    const resJson = [];
    await Promise.all(userIdAssociativeArray.map(async userIdArray => {
        let userId;
        if (userIdArray.length === 1) {
            url = 'https://api.line.me/v2/bot/message/push';
            userId = userIdArray[0];
        } else {
            url = 'https://api.line.me/v2/bot/message/multicast';
            userId = userIdArray;
        }
        const options = {
            method: 'post',
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                'to': userId,
                'messages': [messages]
            }
        };
        const main = async () => {
            let response;
            try {
                const axires = await axios.request(options);
                response = axires.data;
            } catch (error) {
                response = error.response.data;
            }
            resJson.push(JSON.stringify(response));
            console.log(response);
        };
        await main();
        i++;
    }));
    res.json(resJson);
    next();
};
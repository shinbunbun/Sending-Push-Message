module.exports = async (req, res, next) => {
    const axios = require('axios');
    //console.log(req.body);
    const body = req.body;
    const token = body.token;
    let userId = body.to;
    const messages = JSON.parse(body.messages);
    let url;
    let i = 0;
    const resJson = [];
    await Promise.all(userId.map(async userId => {
        userId = userId[i];
        if (userId.length === 1) {
            url = "https://api.line.me/v2/bot/message/push"
            userId = userId[0];
        } else {
            url = "https://api.line.me/v2/bot/message/multicast "
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
            //console.log(response);
        };
        await main();
        //console.log(resJson);
    }))
    //const dataPost = userId.forEach(async (userId) => {
    //});
    //await dataPost;
    res.json(resJson);
    //console.log(resJson);
    next();
};
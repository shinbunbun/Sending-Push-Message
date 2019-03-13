const form = document.forms.form;
form.file.addEventListener('change', (e) => {
    const input = $(this);
    //userId一覧を表示
    const result = e.target.files[0];
    //FileReaderのインスタンスを作成する
    const reader = new FileReader();
    //読み込んだファイルの中身を取得する
    reader.readAsText(result);
    //ファイルの中身を取得後に処理を行う
    reader.addEventListener('load', () => {
        const userIdArray = reader.result.split('\n');
        //ファイルの中身をtextarea内に表示する
        document.getElementById('output').textContent = reader.result;
        /*if (userIdArray.length > 150) {
            const obj = document.forms.form.file;
            obj.value = "";
            input.parent().parent().next(':text').val("");
            alert("You can send messages to up to 150 users.\n一度にメッセージを送信できるのは150人までです。");
            document.getElementById('output').textContent = "";
        } else {*/
        //ファイル名表示
        const numFiles = input.get(0).files ? input.get(0).files.length : 1;
        const label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.parent().parent().next(':text').val(label);
        //}
    });
});

const submit = async () => {
    const token = document.getElementById('accessToken').value;
    const messages = (document.getElementById('Messages').value).replace(/\n? /g, '');
    alert(messages);
    const result = document.getElementById('file').files[0];
    if (!isJSON(messages)) {
        alert("Invalid json.");
        return;
    }
    //FileReaderのインスタンスを作成する
    const reader = new FileReader(result);
    reader.readAsText(result);
    const getUserId = () => {
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                const userIdArray = reader.result.split('\n');
                resolve(userIdArray);
            };
        });
    };
    let userIdArray = await getUserId();
    const userIdArrayDevided = [];
    if (userIdArray.length > 150) {
        const n = 150;
        for (let i = 0; i < userIdArray.length; i += n) {
            userIdArrayDevided.push(userIdArray.slice(i, i + n))
        }
        //console.log(userIdArrayDevided);
    }
    const body = {
        "token": token,
        "to": userIdArrayDevided,
        "messages": messages
    };
    const url = location.href;
    const response = await fetch(`${url}post`, {
        method: 'post',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        // credentials: 'include' /* cookie を含める場合 */
        body: JSON.stringify(body)
    });
    const postResult = await response.text();
    document.getElementById('result').textContent = postResult;
};

const isJSON = (arg) => {
    arg = (typeof arg === "function") ? arg() : arg;
    if (typeof arg !== "string") {
        return false;
    }
    try {
        arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
        return true;
    } catch (e) {
        return false;
    }
};
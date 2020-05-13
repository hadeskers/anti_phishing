const ax = require('axios');
const randomEmail = require('random-email');
const fs = require('fs');

const domain = 'http://mularflio.com/2k1/';

async function postData(data){
	return ax.post(domain, JSON.stringify(data), {
		"headers": {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,und;q=0.6",
			"cache-control": "max-age=0",
			"content-type": "application/x-www-form-urlencoded",
			"upgrade-insecure-requests": "1",
			"cookie": "m_pixel_ratio=2; wd=1440x900; __cfduid=dd5d28be53a7c1530d7f161572387e7aa1588737295; _ga=GA1.2.1511787534.1588737295; _gid=GA1.2.1052642044.1588737295"
		},
		"referrer": domain,
		"referrerPolicy": "origin-when-cross-origin",
	}).then(() => {
		console.log('===>Ok:', data.email);
	}).catch(e => {
		console.log('===>Error:',e.message);
	});
}

function MakeID(length = 10, characters = null) {
	let result = '';
	if(!characters){
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function generatePhone() {
	let characters = '0123456789';
	return '0' + MakeID(2, '3456789') + MakeID(3, characters) + MakeID(4, characters);
}

function Random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function RandomInArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

const suFixEmail = ['gmail.com', 'yahoo.com', 'outlook.com', 'outlook.com.vn', 'hotmail.com', 'gmail.com', 'gmail.com'];

function generateEmail(){
	if(Date.now() % 2){
		let domain = RandomInArray(suFixEmail);
		return randomEmail({ domain: domain })
	} else {
		return generatePhone();
	}
}

let passwordList = [];
function generatePassword(){
	if(!passwordList || !passwordList.length){
		passwordList = fs.readFileSync('password.txt').toString()
			.split(/\r?\n/).filter(s => s.trim()).filter(s => s.length > 5);
	}
	return RandomInArray(passwordList);
}

let index = 0;
(async() => {
	const developer_is_aclone = "yes_or_no?";
	while(developer_is_aclone){
		let email = generateEmail();
		let pass = generatePassword();
		let data = {
			"lsd":"AVqkYwEU",
			"charset_test":"€,´,€,´,水,Д,Є",
			"version":"1",
			"ajax":"0",
			"width":"0",
			"pxr":"0",
			"gps":"0",
			"dimensions":"0",
			"m_ts": Date.now().toString().substr(0, 10),
			"li":"fKogVnFYklxjk1zuKIBvk-jr",
			"email": email,
			"pass": pass,
			"login":"Đăng nhập"
		};
		console.log(++index, 'reg:', email, pass);
		await postData(data);
	}
})();


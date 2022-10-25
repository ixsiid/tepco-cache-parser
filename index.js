const fs = require('fs');

const dir = fs.readdirSync('./cache').filter(x => !x.startsWith('.'));

const parseJSON = f => {
	const data = fs.readFileSync(f);
	const header = data.subarray(0, 24);
	const url = data.subarray(24, 24 + header[12]).toString();
	console.log(url);
	const sep = Buffer.from([0xd8, 0x41, 0x0d, 0x97]);
	const json = JSON.parse(data.subarray(24 + header[12], data.indexOf(sep)).toString());
//	console.log(json);

	const [u, q] = url.split('?');
	const method = u.split('/').pop();

	const name = `${method}_${q.replace(/&/g, '-').replace(/=/g, '')}`;

//	console.log(name);
	fs.writeFileSync(`./out/${name}.json`, JSON.stringify(json));
};

const parse = d => {
	const index_buffer = fs.readFileSync(`./cache/${d}/index.txt`);
	const sep = Buffer.from([0x18]);
	const _index = [];
	let _i = 0;
	while(true) {
		const i = index_buffer.indexOf(sep, _i);
		if (i < 0) break;
		const t = index_buffer.subarray(_i, i).toString().split(':');
		const [k, uuid] = t.pop().split('\x12$');
		_index.push([t.pop(), k, uuid]);
		_i = i + 8;
	}
	const index = Object.fromEntries(_index
		.filter(([name, type, uuid]) => type === 'cache')
		.map(([name, type, uuid]) => [name, uuid]));
	console.log(index);

	[
		'kcx-billing-month',
		'kcx-billing-hourly',
		'kcx-billing-daily',
		'kcx-billing-day',
		'kcx-billing-period',
	].forEach(n => {
		const json_files = fs.readdirSync(`./cache/${d}/${index[n]}/`).filter(x => x.endsWith('_0'));
		json_files.forEach(x => parseJSON(`./cache/${d}/${index[n]}/${x}`));
	});
};

for(const d of dir) {
	parse(d);
}


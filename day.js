const fs = require('fs');

const day_files = fs.readdirSync('./out').filter(x => x.startsWith('day_')).sort();

const csv = [['day', 'charge [yen]', 'power [kWh]']];

day_files.forEach(x => {
	const data = JSON.parse(fs.readFileSync(`./out/${x}`));
	const d = data.billInfo.usedInfo;
	if (d.unit !== 'kWh') throw 'Unit error';
	const dt = data.billInfo.usedDay;

	csv.push([
		[dt.slice(0, 4), dt.slice(4, 6), dt.slice(6)].join('-'),
		d.charge,
		d.power,
	]);
});

fs.writeFileSync('day.csv', csv.map(x => x.join(',')).join('\n'));

const express = require('express');
const os = require('os');
const cluster = require('cluster');
const bodyParser = require('body-parser');
const app = express();

const clusterWorkerSize = os.cpus().length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/router/v1')(app);

const PORT = process.env.PORT || 8080;

if (clusterWorkerSize > 1) {
	if (cluster.isMaster) {
		for (let i = 0; i < clusterWorkerSize; i++) {
			cluster.fork();
		}

		cluster.on('exit', function (worker) {
			console.log('Worker', worker.id, ' has exitted.');
		});
	} else {
		const app = express();

		app.listen(PORT, function () {
			console.log(
				`Express server listening on port ${PORT} and worker ${process.pid}.`
			);
		});
	}
} else {
	app.listen(PORT, () => {
		console.log(`Server is listening in http://localhost:${PORT}.`);
	});
}

import k from 'karma';
import path from 'path';

const Server = k.Server;

export default (done) => {
    const server = new Server({
        configFile: path.join(__dirname, '../', '.karma.js'),
        singleRun: true
    }, function() { done(); });

    server.start();
}

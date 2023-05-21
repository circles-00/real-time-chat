"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const context_1 = require("@loopback/context");
const weboscket_decorator_1 = require("./src/websocket/decorators/weboscket.decorator");
const websocket_controller_factory_1 = require("./websocket-controller-factory");
const SocketIOServer = require("socket.io");
const debug = require('debug')('loopback:websocket');
/**
 * A websocket server
 */
class WebSocketServer extends context_1.Context {
    constructor(httpServer, options = {}) {
        super();
        this.httpServer = httpServer;
        this.options = options;
        this.io = SocketIOServer(options);
    }
    /**
     * Register a sock.io middleware function
     * @param fn
     */
    use(fn) {
        return this.io.use(fn);
    }
    /**
     * Register a websocket controller
     * @param ControllerClass
     * @param namespace
     */
    route(ControllerClass, namespace) {
        if (namespace == null) {
            const meta = (0, weboscket_decorator_1.getWebSocketMetadata)(ControllerClass);
            namespace = meta && meta.namespace;
        }
        const nsp = namespace ? this.io.of(namespace) : this.io;
        /* eslint-disable @typescript-eslint/no-misused-promises */
        nsp.on('connection', async (socket) => {
            debug('Websocket connected: id=%s namespace=%s', socket.id, socket.nsp.name);
            // Create a request context
            const reqCtx = new context_1.Context(this);
            // Bind websocket
            reqCtx.bind('ws.socket').to(socket);
            // Instantiate the controller instance
            await new websocket_controller_factory_1.WebSocketControllerFactory(reqCtx, ControllerClass).create(socket);
        });
        return nsp;
    }
    /**
     * Start the websocket server
     */
    async start() {
        await this.httpServer.start();
        // FIXME: Access HttpServer.server
        const server = this.httpServer.server;
        this.io.attach(server, this.options);
    }
    /**
     * Stop the websocket server
     */
    async stop() {
        const close = new Promise((resolve, reject) => {
            this.io.close(() => {
                resolve();
            });
        });
        await close;
        await this.httpServer.stop();
    }
}
exports.WebSocketServer = WebSocketServer;
//# sourceMappingURL=loopback-websocket-server.js.map
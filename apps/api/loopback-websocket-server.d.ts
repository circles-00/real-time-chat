import { Constructor, Context } from '@loopback/context';
import { HttpServer } from '@loopback/http-server';
import { Server, ServerOptions, Socket } from 'socket.io';
import SocketIOServer = require('socket.io');
export type SockIOMiddleware = (socket: Socket, fn: (err?: any) => void) => void;
/**
 * A websocket server
 */
export declare class WebSocketServer extends Context {
    readonly httpServer: HttpServer;
    private options;
    private io;
    constructor(httpServer: HttpServer, options?: ServerOptions);
    /**
     * Register a sock.io middleware function
     * @param fn
     */
    use(fn: SockIOMiddleware): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    /**
     * Register a websocket controller
     * @param ControllerClass
     * @param namespace
     */
    route(ControllerClass: Constructor<any>, namespace?: string | RegExp): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any> | SocketIOServer.Namespace<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    /**
     * Start the websocket server
     */
    start(): Promise<void>;
    /**
     * Stop the websocket server
     */
    stop(): Promise<void>;
}

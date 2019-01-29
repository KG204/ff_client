import Phaser from './lib/phaser.js'
import * as Colyseus from "colyseus.js";

export default class Application {

    constructor () {
        //Colyseus code
        var server_uri = "ws://localhost:3553";
        var URL = require('url').Url;
        console.log("connect to server : ", server_uri);
        var myURL = new URL(server_uri);
        //connect to colyseus server
        this.client = new Colyseus.Client(server_uri);

        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        //this.client;
        //this.client = new Colyseus.Client(server_uri);
        this.roomName = 'gameboard';
        //this.room;

        this.startConnection();

        this.game = new Phaser.Game(this.config);
    }

    startConnection () {
        this.client.onError.add(function(err) {
            console.log("something wrong happened", err);
        });

        this.client.onOpen.add(function() {
            //client.getAvailableRooms(roomName, function(rooms,err) {
            //    if (err) console.error(err);
            //    rooms.forEach(function(room) {
            //        console.log(room.roomId);
            //        console.log(room.clients);
            //        console.log(room.maxClients);
            //        console.log(room.metadata);
            //    });
            //});
            //client.join(roomName);
        });

        console.log(this.roomName);
        this.client.join(this.roomName);
        //join specified room
        //room = client.join(roomName);
        //When I join the room
        //room.onJoin.add(function () {
        //    console.log(client, "joined", roomName);
        //});
        //error
        //room.onError.add(function () {
        //    console.log(client.id, "couldn't join ", roomName);
        //});

        //room.onData.add(function (data) {
        //    console.log(client.id, " [onData] received on ", roomName, data);
        //});

        //room.listen("answer1")
    }

    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.multiatlas('bar_1', 'assets/bar_1.json', 'assets');
    }
    //this.bar_1;

    create ()
    {
        this.add.image(400, 300, 'sky');
        this.bar_1 = this.add.sprite(0, 0, 'bar_1', 'bar_00.png');

        //this.startConnection();
    }

    update ()
    {
    }
}
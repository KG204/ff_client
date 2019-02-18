import Phaser from 'phaser'
import * as Colyseus from "colyseus.js";

let client;
let roomName;
let bar_1;
let bar_1_active = true;

var server_uri = "ws://localhost:3553";
var URL = require('url').Url;
var myURL = new URL(server_uri);
//connect to colyseus server
client = new Colyseus.Client(server_uri);

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//this.client;
//this.client = new Colyseus.Client(server_uri);
roomName = 'gameboard';
//this.room;

startConnection();

var game = new Phaser.Game(config);

function startConnection () {
    client.onError.add(function(err) {
        console.log("something wrong happened", err);
    });

    client.onOpen.add(function() {
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

    console.log(roomName);
    let room = client.join(roomName);
    //join specified room
    //room = client.join(roomName);
    //When I join the room
    room.onJoin.add(function () {
        console.log(client, "joined", roomName);
    });
    //error
    //room.onError.add(function () {
    //    console.log(client.id, "couldn't join ", roomName);
    //});

    //room.onData.add(function (data) {
    //    console.log(client.id, " [onData] received on ", roomName, data);
    //});

    //room.listen("answer1")

    room.listen("entities/:id/:attribute", (change) => {
        console.log(change.operation); // => "replace" (can be "add", "remove" or "replace")
        console.log(change.path["id"]); // => "f98h3f"
        console.log(change.path["attribute"]); // => "y"
        console.log(change.value); // => 1

        if (change.path["id"] === "Answer1") {
            if (change.path["attribute"] === "ans") {
                if (change.value !== "") {
                    bar_1_active = true;
                }
            }
        }
    })
}

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.multiatlas('bar1atlas', 'assets/bar1.json', 'assets');
}
//this.bar_1;

function create ()
{
    this.add.image(400, 300, 'sky');
    bar_1 = this.add.sprite(300, 300, 'bar1atlas', 'bar1_00.png');

    /*
    let am = new Phaser.Animations.AnimationManager(game);
    let frameNames = am.generateFrameNames('bar1', {
        prefix: 'bar1_',
        start: 0,
        end: 18,
        zeroPad: 2,
        suffix: '.png'
    });
    */
    /*
    let frameNames = Phaser.Animations.Animation.generateFrameNames('bar1', {
        prefix: 'bar1_',
        start: 0,
        end: 18,
        zeroPad: 2,
        suffix: '.png'
    });
    */


    let frameNames = this.anims.generateFrameNames('bar1atlas', {
        prefix: 'bar1_',
        start: 0,
        end: 18,
        zeroPad: 2,
        suffix: '.png'
    });
    console.log(frameNames);

    this.anims.create({
        key: 'rotate',
        frames: frameNames,
        frameRate: 60,
        repeat: 0
    });
    bar_1.anims.play('rotate', true);

    //this.startConnection();
}

function update ()
{
    if (bar_1_active) {
        //bar_1.anims.play('rotate', true);
        bar_1_active = false;
    }
}
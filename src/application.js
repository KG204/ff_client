import Phaser from 'phaser'
import * as Colyseus from "colyseus.js";

let client;
let roomName;
let bar_1;
let bar_2;
let bar_3;
let bar_4;
let bar_5;
let bar_6;
let bar_7;
let bar_8;
let bar_1_activeAnswer = false;
let bar_1_revealAnswer = false;
let bar_2_activeAnswer = false;
let bar_2_revealAnswer = false;
let bar_3_activeAnswer = false;
let bar_3_revealAnswer = false;
let bar_4_activeAnswer = false;
let bar_4_revealAnswer = false;
let bar_5_activeAnswer = false;
let bar_5_revealAnswer = false;
let bar_6_activeAnswer = false;
let bar_6_revealAnswer = false;
let bar_7_activeAnswer = false;
let bar_7_revealAnswer = false;
let bar_8_activeAnswer = false;
let bar_8_revealAnswer = false;

let bar_1_answer;
let bar_1_points;
let bar_2_answer;
let bar_2_points;
let bar_3_answer;
let bar_3_points;
let bar_4_answer;
let bar_4_points;
let bar_5_answer;
let bar_5_points;
let bar_6_answer;
let bar_6_points;
let bar_7_answer;
let bar_7_points;
let bar_8_answer;
let bar_8_points;

let bar_1_reset;
let bar_2_reset;
let bar_3_reset;
let bar_4_reset;
let bar_5_reset;
let bar_6_reset;
let bar_7_reset;
let bar_8_reset;

var tween1;
let tween1Flip;
let tween2Flip;
let tween3Flip;
let tween4Flip;
let tween5Flip;
let tween6Flip;
let tween7Flip;
let tween8Flip;

let texturesManager;


export default class Application {

    constructor () {
        //Colyseus code
        var server_uri = "ws://localhost:3553";
        var URL = require('url').Url;
        console.log("connect to server : ", server_uri);
        var myURL = new URL(server_uri);
        //connect to colyseus server
        client = new Colyseus.Client(server_uri);

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
        roomName = 'gameboard';
        //this.room;

        this.startConnection();

        this.game = new Phaser.Game(this.config);
    }

    startConnection () {
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

            switch(change.path["id"]) {
                case "Answer1": {
                    switch (change.path["attribute"]) {
                        case "ans": {
                            if (change.value !== "") {
                                bar_1_activeAnswer = true;
                            } else {
                                bar_1_reset = true;
                            }
                            bar_1_answer = change.value;
                            break;
                        }
                        case "value": {
                            bar_1_points = change.value;
                            break;
                        }
                        case "revealed": {
                            if (change.value === true) {
                                bar_1_revealAnswer = true;
                            }
                            break;
                        }
                    }
                    break;
                }
                case "Answer2":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_2_activeAnswer = true;
                            }
                            else {
                                bar_2_reset = true;
                            }
                            bar_2_answer = change.value;
                            break;
                        case "value":
                            bar_2_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_2_revealAnswer = true;
                            }
                            break;
                    }
                    break;
                case "Answer3":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_3_activeAnswer = true;
                            }
                            else {
                                bar_3_reset = true;
                            }
                            bar_3_answer = change.value;
                            break;
                        case "value":
                            bar_3_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_3_revealAnswer = true;
                            }
                            break;
                    }
                    break;
                case "Answer4":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_4_activeAnswer = true;
                            }
                            else {
                                bar_4_reset = true;
                            }
                            bar_4_answer = change.value;
                            break;
                        case "value":
                            bar_4_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_4_revealAnswer = true;
                            }
                            break;
                    }
                    break;
                case "Answer5":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_5_activeAnswer = true;
                            }
                            else {
                                bar_5_reset = true;
                            }
                            bar_5_answer = change.value;
                            break;
                        case "value":
                            bar_5_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_5_revealAnswer = true;
                            }
                            break;
                    }
                    break;
                case "Answer6":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_6_activeAnswer = true;
                            }
                            else {
                                bar_6_reset = true;
                            }
                            bar_6_answer = change.value;
                            break;
                        case "value":
                            bar_6_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_6_revealAnswer = true;
                            }
                            break;
                    }
                    break;
                case "Answer7":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_7_activeAnswer = true;
                            }
                            else {
                                bar_7_reset = true;
                            }
                            bar_7_answer = change.value;
                            break;
                        case "value":
                            bar_7_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_7_revealAnswer = true;
                            }
                            break;
                    }
                    break;
                case "Answer8":
                    switch(change.path["attribute"]) {
                        case "ans":
                            if (change.value !== "") {
                                bar_8_activeAnswer = true;
                            }
                            else {
                                bar_8_reset = true;
                            }
                            bar_8_answer = change.value;
                            break;
                        case "value":
                            bar_8_points = change.value;
                            break;
                        case "revealed":
                            if (change.value === true) {
                                bar_8_revealAnswer = true;
                            }
                            break;
                    }
                    break;
            }
            /*
            if (change.path["id"] === "Answer1") {
                if (change.path["attribute"] === "ans") {
                    if (change.value !== "") {
                        bar_1_activeAnswer = true;
                    }
                }
                else if (change.path["attribute"] === "revealed") {
                    if (change.value === true) {
                        bar_1_revealAnswer = true;
                    }
                }
            }
            */
        });
    }

    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        //this.load.multiatlas('bar1', 'assets/bar1.json', 'assets');
        this.load.multiatlas('bar', 'assets/bar.json', 'assets');

        //Load Audio files
        this.load.audio('rightAnswerSound', 'assets/sounds/RightAnswer.mp3');
        this.load.audio('numberOneAnswer', 'assets/sounds/NumberOneAnswer.mp3');
        this.load.audio('newQuestion', 'assets/sounds/NewQuestion.mp3');
    }
    //this.bar_1;

    create ()
    {
        this.add.image(400, 300, 'sky');
        bar_1 = this.add.sprite(184,47, 'bar', 'Number_blank.png');
        bar_2 = this.add.sprite(184,147, 'bar', 'Number_blank.png');
        bar_3 = this.add.sprite(184,247, 'bar', 'Number_blank.png');
        bar_4 = this.add.sprite(184,347, 'bar', 'Number_blank.png');
        bar_5 = this.add.sprite(554,47, 'bar', 'Number_blank.png');
        bar_6 = this.add.sprite(554,147, 'bar', 'Number_blank.png');
        bar_7 = this.add.sprite(554,247, 'bar', 'Number_blank.png');
        bar_8 = this.add.sprite(554,347, 'bar', 'Number_blank.png');

        this.sound.add('rightAnswerSound');
        this.sound.add('numberOneAnswer');
        this.sound.add('newQuestion');

        //Code to be used if using 3d items when ready
        /*
        bar_1 = this.add.sprite(300, 300, 'bar1', 'bar1_00.png');
        //bar_1.anchor.set(0.5, 0);

        let frameNames = this.anims.generateFrameNames('bar1', {
            prefix: 'bar1_',
            start: 0,
            end: 18,
            zeroPad: 2,
            suffix: '.png'
        });

        this.anims.create({
            key: 'rotate',
            frames: frameNames,
            frameRate: 60,
            repeat: 0
        });
        */

        /*
        let texture = this.textures.createCanvas('gradient', 368, 95);
        texture.context.fillStyle = "#000000";
        texture.context.fillRect(0,0,368, 95);
        texture.context.fillStyle = "#0000ff";
        texture.context.fillRect(300, 0, 68, 95);
        texture.context.font = "30px Arial";
        texture.context.fillStyle = "#ffffff";
        texture.context.fillText("Hello World", 50, 50);
        texture.context.fillText("50", 305, 50);

        texture.refresh();
        */

        //this.add.image(300, 300, 'gradient');
        /*
        tween1Flip = this.tweens.create({
            targets: bar_1,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_1.setTexture('bar','Number1.png');
            }
        });

        tween2Flip = this.tweens.create({
            targets: bar_2,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_2.setTexture('bar','Number2.png');
            }
        });

        tween3Flip = this.tweens.create({
            targets: bar_3,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_3.setTexture('bar','Number3.png');
            }
        });

        tween4Flip = this.tweens.create({
            targets: bar_4,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_4.setTexture('bar','Number4.png');
            }
        });

        tween5Flip = this.tweens.create({
            targets: bar_5,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_5.setTexture('bar','Number5.png');
            }
        });

        tween6Flip = this.tweens.create({
            targets: bar_6,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_6.setTexture('bar','Number6.png');
            }
        });

        tween7Flip = this.tweens.create({
            targets: bar_7,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_7.setTexture('bar','Number7.png');
            }
        });

        tween8Flip = this.tweens.create({
            targets: bar_8,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_8.setTexture('bar','Number8.png');
            }
        });
        */
        texturesManager = this.textures;

        tween1 = this.tweens.create({
            targets: bar_1,
            scaleY: 0,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            delay: 2000,
            onYoyo: function(tween, target) {
                bar_1.setTexture('gradient');
            }
            //onComplete: function(tween, target){
            //    bar_1.setTexture('bar1' ,(bar_1.frame.name === 'bar1_18.png') ? 'bar1_05.png' : 'bar1_13.png');
            //}
            //onComplete: function() { bar_1.frame.name = (bar_1.frame.name === 'bar1_18.png') ? 'bar1_05.png' : 'bar1_13.png';}
        });
        //console.log(bar_1);
        //bar_1.on('animationcomplete', animComplete, this);
        /*tween.onLoop.add(function() {
            bar_1.frameName = (bar_1.frameName === 'bar1_18.png') ? 'bar1_05.png' : 'bar1_13.png';
        }, this);
        */

        //this.startConnection();
    }

    update ()
    {
        if (bar_1_activeAnswer) {
            bar_1.setOrigin(0.5,0.5);
            //this.tweens.existing(tween1Flip);
            this.tweens.add({
                targets: bar_1,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_1.setTexture('bar','Number1.png');
                }
            });
            bar_1_activeAnswer = false;
        }
        if (bar_2_activeAnswer) {
            this.tweens.add({
                targets: bar_2,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_2.setTexture('bar','Number2.png');
                }
            });
            //this.tweens.existing(tween2Flip);
            bar_2_activeAnswer = false;
        }
        if (bar_3_activeAnswer) {
            this.tweens.add({
                targets: bar_3,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_3.setTexture('bar','Number3.png');
                }
            });
            //this.tweens.existing(tween3Flip);
            bar_3_activeAnswer = false;
        }
        if (bar_4_activeAnswer) {
            this.tweens.add({
                targets: bar_4,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_4.setTexture('bar','Number4.png');
                }
            });
            //this.tweens.existing(tween4Flip);
            bar_4_activeAnswer = false;
        }
        if (bar_5_activeAnswer) {
            this.tweens.add({
                targets: bar_5,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_5.setTexture('bar','Number5.png');
                }
            });
            //this.tweens.existing(tween5Flip);
            bar_5_activeAnswer = false;
        }
        if (bar_6_activeAnswer) {
            this.tweens.add({
                targets: bar_6,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_6.setTexture('bar','Number6.png');
                }
            });
            //this.tweens.existing(tween6Flip);
            bar_6_activeAnswer = false;
        }
        if (bar_7_activeAnswer) {
            this.tweens.add({
                targets: bar_7,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_7.setTexture('bar','Number7.png');
                }
            });
            //this.tweens.existing(tween7Flip);
            bar_7_activeAnswer = false;
        }
        if (bar_8_activeAnswer) {
            this.tweens.add({
                targets: bar_8,
                scaleY: 0,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                delay: 0,
                onYoyo: function(tween, target) {
                    bar_8.setTexture('bar','Number8.png');
                }
            });
            //this.tweens.existing(tween8Flip);
            bar_8_activeAnswer = false;
        }

        if (bar_1_revealAnswer) {
            let key1SafeToUse = !(this.textures.exists('gradient1'));
            let texture;
            if (key1SafeToUse) {
                texture = this.textures.createCanvas('gradient1', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient1Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            //grd.addColorStop(0, "#4c83f7");
            //grd.addColorStop(0.7, "#4c83f7");
            //grd.addColorStop(1, "#1c3ca3");
            grd.addColorStop(0, "#103D9C");
            grd.addColorStop(0.5, "#1B5CC2");
            grd.addColorStop(1, "#06182E");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            let grdPoints = texture.context.createLinearGradient(0, 0, 0, 95);
            grdPoints.addColorStop(0, "#3684FF");
            grdPoints.addColorStop(0.5, "#276AD5");
            grdPoints.addColorStop(1, "#0B3898");
            texture.context.fillStyle = grdPoints;
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "50px Franklin_Gothic_Demi_Cond";
            texture.context.fillStyle = "#ffffff";
            texture.context.textAlign = "center";
            texture.context.textBaseline = "middle";
            texture.context.fillText(bar_1_points, 334, 48);

            //Draw the Answer
            let textSize = 50;
            let textSizeString = "px Franklin_Gothic_Demi_Cond";
            let textFull = "" + textSize + textSizeString;
            texture.context.font = textFull;
            //let w = texture.context.measureText(bar_1_answer).width;
            while (texture.context.measureText(bar_1_answer).width > 290) {
                textSize = textSize - 5;
                textFull = "" + textSize + textSizeString;
                texture.context.font = textFull;
            }
            texture.context.fillText(bar_1_answer, 150, 48);

            //Border
            texture.context.fillRect(0,0,5,95);
            texture.context.fillRect(0,0,368,5);
            texture.context.fillRect(363,0,5,95);
            texture.context.fillRect(0,90,368,5);
            //Answer and Point split
            texture.context.fillRect(300,0,2,95);

            texture.refresh();

            if (key1SafeToUse) {
                this.tweens.add({
                    targets: bar_1,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_1.setTexture('gradient1');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient1Alt')) {
                            texturesManager.remove('gradient1Alt');
                        }
                    }
                });
            }
            else {
                this.tweens.add({
                    targets: bar_1,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_1.setTexture('gradient1Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient1')) {
                            texturesManager.remove('gradient1');
                        }
                    }
                });
            }

            this.sound.play('numberOneAnswer');

            bar_1_revealAnswer = false;
        }

        if (bar_2_revealAnswer) {
            let key2SafeToUse = !(this.textures.exists('gradient2'));
            let texture;
            if (key2SafeToUse) {
                texture = this.textures.createCanvas('gradient2', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient2Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            //texture.context.fillStyle = "#000000";
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_2_answer, 10, 50);
            texture.context.fillText(bar_2_points, 305, 50);

            texture.refresh();

            if (key2SafeToUse) {
                this.tweens.add({
                    targets: bar_2,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_2.setTexture('gradient2');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient2Alt')) {
                            texturesManager.remove('gradient2Alt');
                        }
                    }
                });
            }
            else {
                let tween2FlipAnswer = this.tweens.add({
                    targets: bar_2,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_2.setTexture('gradient2Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient2')) {
                            texturesManager.remove('gradient2');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_2_revealAnswer = false;
        }


        if (bar_3_revealAnswer) {
            let key3SafeToUse = !(this.textures.exists('gradient3'));
            let texture;
            if (key3SafeToUse) {
                texture = this.textures.createCanvas('gradient3', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient3Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_3_answer, 10, 50);
            texture.context.fillText(bar_3_points, 305, 50);

            texture.refresh();

            if (key3SafeToUse) {
                let tween3FlipAnswer = this.tweens.add({
                    targets: bar_3,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_3.setTexture('gradient3');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient3Alt')) {
                            texturesManager.remove('gradient3Alt');
                        }
                    }
                });
            }
            else {
                let tween3FlipAnswer = this.tweens.add({
                    targets: bar_3,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_3.setTexture('gradient3Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient3')) {
                            texturesManager.remove('gradient3');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_3_revealAnswer = false;
        }

        if (bar_4_revealAnswer) {
            let key4SafeToUse = !(this.textures.exists('gradient4'));
            let texture;
            if (key4SafeToUse) {
                texture = this.textures.createCanvas('gradient4', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient4Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_4_answer, 10, 50);
            texture.context.fillText(bar_4_points, 305, 50);

            texture.refresh();

            if (key4SafeToUse) {
                let tween4FlipAnswer = this.tweens.add({
                    targets: bar_4,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_4.setTexture('gradient4');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient4Alt')) {
                            texturesManager.remove('gradient4Alt');
                        }
                    }
                });
            }
            else {
                let tween4FlipAnswer = this.tweens.add({
                    targets: bar_4,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_4.setTexture('gradient4Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient4')) {
                            texturesManager.remove('gradient4');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_4_revealAnswer = false;
        }

        if (bar_5_revealAnswer) {
            let key5SafeToUse = !(this.textures.exists('gradient5'));
            let texture;
            if (key5SafeToUse) {
                texture = this.textures.createCanvas('gradient5', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient5Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_5_answer, 10, 50);
            texture.context.fillText(bar_5_points, 305, 50);

            texture.refresh();
            if (key5SafeToUse) {
                let tween5FlipAnswer = this.tweens.add({
                    targets: bar_5,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_5.setTexture('gradient5');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient5Alt')) {
                            texturesManager.remove('gradient5Alt');
                        }
                    }
                });
            }
            else {
                let tween5FlipAnswer = this.tweens.add({
                    targets: bar_5,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_5.setTexture('gradient5Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient5')) {
                            texturesManager.remove('gradient5');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_5_revealAnswer = false;
        }

        if (bar_6_revealAnswer) {
            let key6SafeToUse = !(this.textures.exists('gradient6'));
            let texture;
            if (key6SafeToUse) {
                texture = this.textures.createCanvas('gradient6', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient6Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_6_answer, 10, 50);
            texture.context.fillText(bar_6_points, 305, 50);

            texture.refresh();

            if (key6SafeToUse) {
                this.tweens.add({
                    targets: bar_6,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_6.setTexture('gradient6');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient6Alt')) {
                            texturesManager.remove('gradient6Alt');
                        }
                    }
                });
            }
            else {
                this.tweens.add({
                    targets: bar_6,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_6.setTexture('gradient6Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient6')) {
                            texturesManager.remove('gradient6');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_6_revealAnswer = false;
        }

        if (bar_7_revealAnswer) {
            let key7SafeToUse = !(this.textures.exists('gradient7'));
            let texture;
            if (key7SafeToUse) {
                texture = this.textures.createCanvas('gradient7', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient7Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_7_answer, 10, 50);
            texture.context.fillText(bar_7_points, 305, 50);

            texture.refresh();

            if (key7SafeToUse) {
                let tween7FlipAnswer = this.tweens.add({
                    targets: bar_7,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_7.setTexture('gradient7');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient7Alt')) {
                            texturesManager.remove('gradient7Alt');
                        }
                    }
                });
            }
            else {
                let tween7FlipAnswer = this.tweens.add({
                    targets: bar_7,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_7.setTexture('gradient7Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient7')) {
                            texturesManager.remove('gradient7');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_7_revealAnswer = false;
        }

        if (bar_8_revealAnswer) {
            let key8SafeToUse = !(this.textures.exists('gradient8'));
            let texture;
            if (key8SafeToUse) {
                texture = this.textures.createCanvas('gradient8', 368, 95);
            }
            else {
                texture = this.textures.createCanvas('gradient8Alt', 368, 95);
            }
            let grd = texture.context.createLinearGradient(0, 0, 0, 95);
            grd.addColorStop(0, "#4c83f7");
            grd.addColorStop(0.7, "#4c83f7");
            grd.addColorStop(1, "#1c3ca3");
            texture.context.fillStyle = grd;
            texture.context.fillRect(0,0,368, 95);
            texture.context.fillStyle = "#0000ff";
            texture.context.fillRect(300, 0, 68, 95);
            texture.context.font = "30px Franklin_Gothic_Demi_Cond";
            //texture.context.font = "30px Arial";
            texture.context.fillStyle = "#ffffff";
            texture.context.fillText(bar_8_answer, 10, 50);
            texture.context.fillText(bar_8_points, 305, 50);

            texture.refresh();

            if (key8SafeToUse) {
                let tween8FlipAnswer = this.tweens.add({
                    targets: bar_8,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_8.setTexture('gradient8');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient8Alt')) {
                            texturesManager.remove('gradient8Alt');
                        }
                    }
                });
            }
            else {
                let tween8FlipAnswer = this.tweens.add({
                    targets: bar_8,
                    scaleY: 0,
                    duration: 100,
                    ease: 'Linear',
                    yoyo: true,
                    delay: 0,
                    onYoyo: function (tween, target) {
                        bar_8.setTexture('gradient8Alt');
                    },
                    onComplete: function (tween, target) {
                        if (!texturesManager.checkKey('gradient8')) {
                            texturesManager.remove('gradient8');
                        }
                    }
                });
            }

            this.sound.play('rightAnswerSound');

            bar_8_revealAnswer = false;
        }

        if (bar_1_reset) {
            bar_1.setTexture('bar','Number_blank.png');
            this.sound.play('newQuestion');
            bar_1_reset = false;
        }
        if (bar_2_reset) {
            bar_2.setTexture('bar','Number_blank.png');
            bar_2_reset = false;
        }
        if (bar_3_reset) {
            bar_3.setTexture('bar','Number_blank.png');
            bar_3_reset = false;
        }
        if (bar_4_reset) {
            bar_4.setTexture('bar','Number_blank.png');
            bar_4_reset = false;
        }
        if (bar_5_reset) {
            bar_5.setTexture('bar','Number_blank.png');
            bar_5_reset = false;
        }
        if (bar_6_reset) {
            bar_6.setTexture('bar','Number_blank.png');
            bar_6_reset = false;
        }
        if (bar_7_reset) {
            bar_7.setTexture('bar','Number_blank.png');
            bar_7_reset = false;
        }
        if (bar_8_reset) {
            bar_8.setTexture('bar','Number_blank.png');
            bar_8_reset = false;
        }
        /*
        if (bar_1_activeAnswer) {
            this.tweens.existing(tween1Flip);
            //bar_1.anims.play('rotate', true);
            bar_1_activeAnswer = false;
        }

        var tween = this.add.tween(bar_1.scale).to( { x: -1 }, 1000, "Linear", true, 0, -1, true);
        tween.onLoop.add(function() {
            bar_1.frameName = (bar_1.frameName === 'bar1_18.png') ? 'bar1_00.png' : 'bar1_18.png';
        }, this);
        */
    }

}

/*
function animComplete (animation, frame)
{
    //  Animation is over, let's fade the sprite out
    this.tweens.existing(tween1);
}
*/
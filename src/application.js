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

let Current_Points_Update = true;
let Current_Points = 0;
let CurrentScoreboard;

let left_team_points_update = true;
let left_team_points = 0;
let LeftTeamScoreboard;

let right_team_points_update = true;
let right_team_points = 0;
let RightTeamScoreboard;

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

let Xactive = false;
let XactiveCount = 0;
let XXactive = false;
let XXXactive = false;

let texturesManager;

let Board_Width = 1200;
let Board_Height = 600;

//let Board_Width = 1920;
//let Board_Height = 1080;

//let Board_Height = $(document).height();
//let Board_Width = $(document).width();


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
            width: Board_Width,
            height: Board_Height,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        console.log(Board_Height);
        console.log(Board_Width);

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
                case "LeftTeam":
                    switch(change.path["attribute"]) {
                        case "total":
                            left_team_points_update = true;
                            left_team_points = change.value;
                            break;
                    }
                    break;
                case "RightTeam":
                    switch(change.path["attribute"]) {
                        case "total":
                            right_team_points_update = true;
                            right_team_points = change.value;
                            break;
                    }
                    break;
                case "CurrentTotal":
                    switch(change.path["attribute"]) {
                        case "value":
                            Current_Points_Update = true;
                            Current_Points = change.value;
                            break;
                    }
                    break;
            }
        });

        room.onMessage.add(function(message) {
            if (message === "X") {
                Xactive = true;
                XactiveCount = 1;
            }
            if (message === "XX") {
                Xactive = true;
                XactiveCount = 2;
            }
            if (message === "XXX") {
                Xactive = true;
                XactiveCount = 3;
            }
        });
    }

    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('background_bar', 'assets/background_bar.png');
        this.load.image('X', 'assets/X_1.png');
        this.load.image('tv_bar', 'assets/tv_bar.png');
        //this.load.multiatlas('bar1', 'assets/bar1.json', 'assets');
        this.load.multiatlas('bar', 'assets/bar.json', 'assets');

        //Load Audio files
        this.load.audio('rightAnswerSound', 'assets/sounds/RightAnswer.mp3');
        this.load.audio('numberOneAnswer', 'assets/sounds/NumberOneAnswer.mp3');
        this.load.audio('newQuestion', 'assets/sounds/NewQuestion.mp3');
        this.load.audio('wrongAnswer', 'assets/sounds/WrongAnswer_Short.mp3');
    }
    //this.bar_1;

    create ()
    {
        //gameBoard is 1200 x 600
        //Left side has 300
        //Right Side has 300
        //Original image was 800
        //So need a width of 1400
        //this.add.image(400, 300, 'sky');
        this.add.image(600,300, 'background');
        this.add.image(600,347, 'background_bar');
        //Bar position adjustment
        //Current origin point is 0,0
        //To give some spacing, using 30 from left, and 100 from top
        let bar_startX = 200;
        let bar_startY = 0;
        let topLeftX = bar_startX + 30;
        let topLeftY = bar_startY + 150;

        bar_1 = this.add.sprite(topLeftX + 184,topLeftY + 47, 'bar', 'Number_blank.png');
        bar_2 = this.add.sprite(topLeftX + 184,topLeftY + 147, 'bar', 'Number_blank.png');
        bar_3 = this.add.sprite(topLeftX + 184,topLeftY + 247, 'bar', 'Number_blank.png');
        bar_4 = this.add.sprite(topLeftX + 184,topLeftY + 347, 'bar', 'Number_blank.png');
        bar_5 = this.add.sprite(topLeftX + 554,topLeftY + 47, 'bar', 'Number_blank.png');
        bar_6 = this.add.sprite(topLeftX + 554,topLeftY + 147, 'bar', 'Number_blank.png');
        bar_7 = this.add.sprite(topLeftX + 554,topLeftY + 247, 'bar', 'Number_blank.png');
        bar_8 = this.add.sprite(topLeftX + 554,topLeftY + 347, 'bar', 'Number_blank.png');

        CurrentScoreboard = this.add.sprite(600, 80, 'tv_bar');
        CurrentScoreboard.scaleX = 0.8;
        CurrentScoreboard.scaleY = 0.8;
        LeftTeamScoreboard = this.add.sprite(100, 300, 'tv_bar');
        LeftTeamScoreboard.scaleX = 0.8;
        LeftTeamScoreboard.scaleY = 0.8;
        RightTeamScoreboard = this.add.sprite(1100, 300, 'tv_bar');
        RightTeamScoreboard.scaleX = 0.8;
        RightTeamScoreboard.scaleY = 0.8;

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
            texture = createBaseTexture(texture, bar_1_answer, bar_1_points);
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
            texture = createBaseTexture(texture, bar_2_answer, bar_2_points);
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
            texture = createBaseTexture(texture, bar_3_answer, bar_3_points);
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
            texture = createBaseTexture(texture, bar_4_answer, bar_4_points);
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
            texture = createBaseTexture(texture, bar_5_answer, bar_5_points);
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
            texture = createBaseTexture(texture, bar_6_answer, bar_6_points);
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
            texture = createBaseTexture(texture, bar_7_answer, bar_7_points);
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
            texture = createBaseTexture(texture, bar_8_answer, bar_8_points);
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

        if (Xactive) {
            let Xarray = [];
            let final_scale = 0.9;
            if (XactiveCount === 1) {
                let X = this.add.sprite(Board_Width/2,Board_Height/2, 'X');
                Xarray.push(X);
            }
            else if (XactiveCount === 2) {
                let X = this.add.sprite(Board_Width/2 - 200,Board_Height/2, 'X');
                let X2 = this.add.sprite(Board_Width/2 + 200,Board_Height/2, 'X');
                Xarray.push(X);
                Xarray.push(X2);
                final_scale = 0.7;
            }
            else if (XactiveCount === 3) {
                let X = this.add.sprite(Board_Width/2 - 350,Board_Height/2, 'X');
                let X2 = this.add.sprite(Board_Width/2,Board_Height/2, 'X');
                let X3 = this.add.sprite(Board_Width/2 + 350,Board_Height/2, 'X');
                Xarray.push(X);
                Xarray.push(X2);
                Xarray.push(X3);
                final_scale = 0.7;
            }
            for (let index = 0; index < Xarray.length; ++index) {
                Xarray[index].visible = false;
                Xarray[index].scaleX = 0.1;
                Xarray[index].scaleY = 0.1;
            }
            console.log("Hello Farid 10");
            //let X = this.add.sprite(400,300, 'X');
            //X.visible = false;
            //X.scaleY = 0.1;
            //X.scaleX = 0.1;
            this.tweens.add({
                targets: Xarray,
                scaleY: final_scale,
                scaleX: final_scale,
                duration: 200,
                ease: 'Bounce',
                yoyo: false,
                delay: 0,
                completeDelay: 200,
                onStart: function (tween, targets) {
                    for (let i = 0; i < targets.length; i++) {
                        targets[i].visible = true;
                    }
                },
                onComplete: function (tween, targets) {
                    //target.visible = false;
                    for (let i = 0; i < Xarray.length; i++) {
                        Xarray[i].visible = false;
                    }
                }
            });
            this.sound.play('wrongAnswer');
            Xactive = false;
        }

        if (left_team_points_update) {
            //let LeftTeamScoreboard = this.add.sprite(150,300);
            //let texture = createTeamPointTexture(left_team_points_update);
            //LeftTeamScoreboard = this.add.sprite(1000, 300, 'tv_bar');
            let keyLeftTeamSafeToUse = !(this.textures.exists('gradientLeftPoints'));
            let texture;
            if (keyLeftTeamSafeToUse) {
                texture = this.textures.createCanvas('gradientLeftPoints', 200, 150);
            }
            else {
                texture = this.textures.createCanvas('gradientLeftPointsAlt', 200, 150);
            }
            texture = createTeamPointTexture(texture, left_team_points);
            texture.refresh();

            if (keyLeftTeamSafeToUse) {
                LeftTeamScoreboard.setTexture('gradientLeftPoints');
                if (!texturesManager.checkKey('gradientLeftPointsAlt')) {
                    texturesManager.remove('gradientLeftPointsAlt');
                }
            }
            else {
                LeftTeamScoreboard.setTexture('gradientLeftPointsAlt');
                if (!texturesManager.checkKey('gradientLeftPoints')) {
                    texturesManager.remove('gradientLeftPoints');
                }
            }

            left_team_points_update = false;
        }

        if (right_team_points_update) {
            let keyRightTeamSafeToUse = !(this.textures.exists('gradientRightPoints'));
            let texture;
            if (keyRightTeamSafeToUse) {
                texture = this.textures.createCanvas('gradientRightPoints', 200, 150);
            }
            else {
                texture = this.textures.createCanvas('gradientRightPointsAlt', 200, 150);
            }
            texture = createTeamPointTexture(texture, right_team_points);
            texture.refresh();

            if (keyRightTeamSafeToUse) {
                RightTeamScoreboard.setTexture('gradientRightPoints');
                if (!texturesManager.checkKey('gradientRightPointsAlt')) {
                    texturesManager.remove('gradientRightPointsAlt');
                }
            }
            else {
                RightTeamScoreboard.setTexture('gradientRightPointsAlt');
                if (!texturesManager.checkKey('gradientRightPoints')) {
                    texturesManager.remove('gradientRightPoints');
                }
            }

            right_team_points_update = false;
        }

        if (Current_Points_Update) {
            let keyCurrentSafeToUse = !(this.textures.exists('gradientCurrentPoints'));
            let texture;
            if (keyCurrentSafeToUse) {
                texture = this.textures.createCanvas('gradientCurrentPoints', 200, 150);
            }
            else {
                texture = this.textures.createCanvas('gradientCurrentPointsAlt', 200, 150);
            }
            texture = createTeamPointTexture(texture, Current_Points);
            texture.refresh();

            if (keyCurrentSafeToUse) {
                CurrentScoreboard.setTexture('gradientCurrentPoints');
                if (!texturesManager.checkKey('gradientCurrentPointsAlt')) {
                    texturesManager.remove('gradientCurrentPointsAlt');
                }
            }
            else {
                CurrentScoreboard.setTexture('gradientCurrentPointsAlt');
                if (!texturesManager.checkKey('gradientCurrentPoints')) {
                    texturesManager.remove('gradientCurrentPoints');
                }
            }

            Current_Points_Update = false;
        }

        //Code used when dealing with 3d objects
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

function createBaseTexture(textureObj, answer, points) {
    //Answer Box Gradient
    let grd = textureObj.context.createLinearGradient(0, 0, 0, 95);
    grd.addColorStop(0, "#103D9C");
    grd.addColorStop(0.5, "#1B5CC2");
    grd.addColorStop(1, "#06182E");
    textureObj.context.fillStyle = grd;
    textureObj.context.fillRect(0,0,368, 95);
    //Point Box Gradient
    let grdPoints = textureObj.context.createLinearGradient(0, 0, 0, 95);
    grdPoints.addColorStop(0, "#3684FF");
    grdPoints.addColorStop(0.5, "#276AD5");
    grdPoints.addColorStop(1, "#0B3898");
    textureObj.context.fillStyle = grdPoints;
    textureObj.context.fillRect(300, 0, 68, 95);

    //Set text and Border properties
    textureObj.context.fillStyle = "#ffffff";
    textureObj.context.textAlign = "center";
    textureObj.context.textBaseline = "middle";
    //Draw the Points
    textureObj.context.font = "50px Franklin_Gothic_Demi_Cond";
    textureObj.context.fillText(points, 332, 48);

    //Draw the Answer
    let textSize = 50;
    let textSizeString = "px Franklin_Gothic_Demi_Cond";
    let textFull = "" + textSize + textSizeString;
    textureObj.context.font = textFull;
    while (textureObj.context.measureText(answer).width > 290) {
        textSize = textSize - 5;
        textFull = "" + textSize + textSizeString;
        textureObj.context.font = textFull;
    }
    textureObj.context.fillText(answer, 150, 48);

    //Border
    textureObj.context.fillRect(0,0,5,95);
    textureObj.context.fillRect(0,0,368,5);
    textureObj.context.fillRect(363,0,5,95);
    textureObj.context.fillRect(0,90,368,5);
    //Answer and Point split
    textureObj.context.fillRect(300,0,2,95);

    return textureObj;
}

function createTeamPointTexture(textureObj, points) {
    //Box size 200 x 150
    let width = 200;
    let height = 150;

    //Point Box Gradient
    let grdPoints = textureObj.context.createLinearGradient(0, 0, 0, height);
    grdPoints.addColorStop(0, "#3684FF");
    grdPoints.addColorStop(0.5, "#276AD5");
    grdPoints.addColorStop(1, "#0B3898");
    textureObj.context.fillStyle = grdPoints;
    textureObj.context.fillRect(0, 0, 200, 150);

    //Set text and Border properties
    textureObj.context.fillStyle = "#ffffff";
    textureObj.context.textAlign = "center";
    textureObj.context.textBaseline = "middle";
    //Draw the Points
    textureObj.context.font = "80px Franklin_Gothic_Demi_Cond";
    textureObj.context.fillText(points, width/2, height/2);

    //Border
    textureObj.context.fillRect(0,0,5,height);
    textureObj.context.fillRect(0,0,width,5);
    textureObj.context.fillRect(width-5,0,5,height);
    textureObj.context.fillRect(0,height-5,width,5);

    return textureObj;
}

/*
function animComplete (animation, frame)
{
    //  Animation is over, let's fade the sprite out
    this.tweens.existing(tween1);
}
*/
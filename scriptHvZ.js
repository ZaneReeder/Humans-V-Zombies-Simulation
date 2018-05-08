/****************************

Humans vs Zombies Simulation

*****************************/


/****************************
    UI CONTROLLER
*****************************/

var UIController = (function () {
    
    var DOMstrings = {
        humanNum: 'num-humans',
        humanSpeed: 'human-speed',
        humanImmun: 'immunity-rate',
        humanLOS: 'human-LOS',
        humanWeap: 'human-weapon',
        nerfGun: 'nerf-gun',
        sockClub: 'sock-club',
        marshmallowShotgun: 'marsh-shotgun',
        bareFists: 'bare-fists',
        coward: 'coward',
        zombieNum: 'num-zombies',
        zombieSpeed: 'zombie-speed',
        zombieLOS: 'zombie-LOS',
        simButton: 'sim-btn',
        resetButton: 'reset-btn',
        gameTimer: 'game-timer-time',
        humanNumStat: 'human-number',
        zombieNumStat: 'zombie-number',
        humanProgress: 'human-progress',
        zombieProgress: 'zombie-progress',
        xWrapCheck: 'x-wrap-check',
        xTwistCheck: 'x-twist-check',
        yWrapCheck: 'y-wrap-check',
        yTwistCheck: 'y-twist-check',
        xWrap: 'x-wrap',
        xTwist: 'x-twist',
        yWrap: 'yWrap',
        yTwist: 'y-twist'
    };
    
    
    var formatStat = function(stat){
        var statStr = stat.toString();
        var formattedStat;
        var lastInt
        if (statStr.length === 1) {
            lastInt = statStr;
            formattedStat = "00".concat(lastInt);
        } else if (statStr.length ===2) {
            lastInt = statStr;
            formattedStat = "0".concat(lastInt);
        } else { formattedStat = statStr; }
        
        return formattedStat;
    };
    
    //format Game Timer
    var formatTimer = function(seconds) {
        var mins, secs, time;
        mins = (Math.floor(seconds/60)).toString();
        secs = Math.floor(seconds % 60);
        if (secs < 10) { secs = "0".concat((secs).toString()); }
        else { secs = secs.toString(); }
        time = (mins + ":" + secs);
        return time;
    };
    
    return {
        
        getInput: function() {
            
            return {
                humNum: parseInt(
                    document.getElementById(DOMstrings.humanNum).value),
                humSpeed: parseInt(
                    document.getElementById(DOMstrings.humanSpeed).value),
                humLOS: parseInt(
                    document.getElementById(DOMstrings.humanLOS).value),
                humWeap: {  
                            nerf: document.getElementById(DOMstrings.nerfGun).checked,
                            sock: document.getElementById(DOMstrings.sockClub).checked,
                            marsh: document.getElementById(DOMstrings.marshmallowShotgun).checked,
                            bareFists: document.getElementById(DOMstrings.bareFists).checked,
                            coward: document.getElementById(DOMstrings.coward).checked
                         },
                humImmun: (parseInt(
                    document.getElementById(DOMstrings.humanImmun).value))/100,
                zomNum: parseInt(
                    document.getElementById(DOMstrings.zombieNum).value),
                zomSpeed: parseInt(
                    document.getElementById(DOMstrings.zombieSpeed).value),
                zomLOS: parseInt(
                    document.getElementById(DOMstrings.zombieLOS).value),
                mapBound: {
                            xWrap: document.getElementById(DOMstrings.xWrapCheck).checked,
                            yWrap: document.getElementById(DOMstrings.yWrapCheck).checked,
                            xTwist: document.getElementById(DOMstrings.xTwistCheck).checked,
                            yTwist: document.getElementById(DOMstrings.yTwistCheck).checked,
                }
            };
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        },
        
        resetInput: function() {
            
            //humans
            document.getElementById(DOMstrings.humanNum).value = 50;
            document.getElementById(DOMstrings.humanSpeed).value = 40;
            document.getElementById(DOMstrings.humanImmun).value = 0;
            document.getElementById(DOMstrings.humanLOS).value = 40;
            
            //zombies
            document.getElementById(DOMstrings.zombieNum).value = 1; 
            document.getElementById(DOMstrings.zombieSpeed).value = 50;
            document.getElementById(DOMstrings.zombieLOS).value = 40;
            
            //weapons
            document.getElementById(DOMstrings.nerfGun).checked = true;
            document.getElementById(DOMstrings.sockClub).checked = false;
            document.getElementById(DOMstrings.marshmallowShotgun).checked = false;
            document.getElementById(DOMstrings.bareFists).checked = false;
            document.getElementById(DOMstrings.coward).checked = false;
            
            //map
            document.getElementById(DOMstrings.yWrapCheck).checked = true;
            document.getElementById(DOMstrings.xWrapCheck).checked = false;
            document.getElementById(DOMstrings.xTwistCheck).checked = false;
            document.getElementById(DOMstrings.yTwistCheck).checked = false;
            
            
        },
        
        clearCombatLog: function() {
            document.getElementById('log').value = "COMBAT LOG.... \n";  
        },
        
        updateCombatLog: function(log) {
            //new line and concat new log string
            document.getElementById('log').value = document.getElementById('log').value + "\n" + log;
            document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
        },
        
        displayModifiedInput: function(input) {
            var weapon = input.humWeap;
            
            document.getElementById(DOMstrings.humanNum).value = (input.humNum);
            document.getElementById(DOMstrings.humanSpeed).value = (input.humSpeed);
            document.getElementById(DOMstrings.humanImmun).value = (input.humImmun * 100);

            document.getElementById(DOMstrings.zombieNum).value = (input.zomNum); 
            document.getElementById(DOMstrings.zombieSpeed).value = (input.zomSpeed);
            
            document.getElementById(DOMstrings.nerfGun).checked = weapon.nerf;
            document.getElementById(DOMstrings.sockClub).checked = weapon.sock;
            document.getElementById(DOMstrings.marshmallowShotgun).checked = weapon.marsh;
            document.getElementById(DOMstrings.bareFists).checked = weapon.bareFists;
            document.getElementById(DOMstrings.coward).checked = weapon.coward;
            
        },
        
        updateStats: function(obj) {
            document.getElementById(DOMstrings.humanNumStat).textContent = formatStat(obj.humans.length);
            document.getElementById(DOMstrings.zombieNumStat).textContent = formatStat(obj.zombies.length);
            
            document.getElementById(DOMstrings.gameTimer).textContent = formatTimer(obj.gameTimer);
            
            document.getElementById(DOMstrings.humanProgress).style.width = ((obj.humans.length) / (obj.zombies.length + obj.humans.length) * 100) + '%';
            
            document.getElementById(DOMstrings.zombieProgress).style.width = ((obj.zombies.length) / (obj.zombies.length + obj.humans.length) * 100) + '%';
        },
        
        toggleTwistDisplay: function() {
            var xWrapBox = document.getElementById(DOMstrings.xWrapCheck).checked;
            var xTwist = document.getElementById(DOMstrings.xTwist);
            var xTwistCheck = document.getElementById(DOMstrings.xTwistCheck);
            var yWrapBox = document.getElementById(DOMstrings.yWrapCheck).checked;
            var yTwist = document.getElementById(DOMstrings.yTwist);
            var yTwistCheck = document.getElementById(DOMstrings.yTwistCheck);
            
            if (xWrapBox) { xTwist.classList.remove('hide-me'); }
            else if (!xWrapBox) { //hide and remove possible checkmark
                xTwist.classList.add('hide-me'); 
                xTwistCheck.checked = false; 
            }
            if (yWrapBox) { yTwist.classList.remove('hide-me'); }
            else if (!yWrapBox) { //hide and remove possible checkmark
                yTwist.classList.add('hide-me'); 
                yTwistCheck.checked = false; 
            }
        }
    };
    
})();






/****************************
    SIMULATION CONTROLLER
*****************************/ 
var simulationController = (function() {
    
    //PRIVATE
    
    //PrepCanvas
    var canvas = document.getElementById('simulation');
    var context = canvas.getContext('2d');
    context.fillStyle = '#596E7E'; //background
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    //Weapon Constructors
    
    var BareFists = function () { //kung fu
        this.name= "Bare Fists",
        this.range= 5,
        this.accuracy= 0.05, //5% chance to stun
        this.fireRate= 1.000,
        this.timer= 0.000
    };
    
    var MarshShotGun = function() { //shotgun
        this.name= "Marshmallow Shotgun",
        this.range= 15,
        this.accuracy= 0.80,
        this.fireRate= 0.500, //1 shot per 2 seconds
        this.timer= 0.000
    };
    
    var NerfGun = function() { //rifle
        this.name= "Nerf Gun",
        this.range= 35, //pixels
        this.accuracy= 0.12, //12% chance to hit and stun
        this.fireRate= 6.000, //6 shots per second
        this.timer= 0.000
    };
    
    var Coward = function() { //no weapon. will not attack
        this.name= "No Weapon",
        this.range= -1,
        this.accuracy= 0.000,
        this.fireRate= 1, //not 0 to avoid possible division by zero in human attack function
        this.timer= 0.000
    };
    
    var SockClub = function() { //melee
        this.name= "Sock Club",
        this.range= 5,
        this.accuracy= 0.95,
        this.fireRate= 0.250, //1 swing per 4 seconds
        this.timer= 0.000
    };
    
    
    // Human Constructor
    var Human = function(id, pos, speed, vel, 
                          LOS, wep, IR) {
        this.id = id;
        this.player = "human";
        this.size = 10; //10px by 10px
        this.pos = pos;
        this.speed = speed;
        this.vel = vel;
        this.LOS = LOS;
        this.wep = wep;
        this.IR = IR;
    };

    // Zombie constructor
    var Zombie = function(id, pos, speed, vel, 
                           LOS, stunTimer, attackTimer) {
        this.id = id;
        this.player = "zombie";
        this.size = 10; //10px by 10px
        this.pos = pos;
        this.speed = speed;
        this.vel = vel;
        this.LOS = LOS;
        this.stunTimer = stunTimer;
    };
    
    //METHDOS
    var borderCollide = function(obj) {
        
        obj.humans.forEach(function(human) {
            
            //x-boundaries
            if (obj.mapBounds.xWrap) { //if x-wrap
                if (human.pos.x >= canvas.width) { //right boundary
                    human.pos.x = (human.pos.x % canvas.width) - human.size;
                    if (obj.mapBounds.xTwist) { //if x-twist
                        if (human.pos.y > canvas.height/2) { human.pos.y = (canvas.height - human.pos.y); }
                        else { human.pos.y = (canvas.height - human.pos.y); }
                    } 
                }

                if (human.pos.x+human.size <= 0) { //left boundary
                    human.pos.x += canvas.width 
                    if (obj.mapBounds.xTwist) { //if x-twist
                        if (human.pos.y > canvas.height/2) { human.pos.y = (canvas.height - human.pos.y); }
                        else { human.pos.y = (canvas.height - human.pos.y); }
                    }
                }
            }
            else { // if no x-wrap
                if (human.pos.x <= 0) { //left boundary
                    if (human.pos.x < 0) { human.pos.x = 0; } //if box manages to move past border slide it back
                    human.vel.x *= -1;
                }

                if (human.pos.x + human.size >= canvas.width) { //right boundary
                    if (human.pos.x + human.size > canvas.width) { //if box manages to move past border slide it back
                        human.pos.x = canvas.width - human.size; 
                    } 
                    human.vel.x *= -1;
                }
            }
            
            
            //y-boundaries
            if (obj.mapBounds.yWrap) { //if y-wrap
                if (human.pos.y >= canvas.height) { //bottom boundary
                    human.pos.y = (human.pos.y % canvas.height) - human.size;
                    if (obj.mapBounds.yTwist) { //if y-twist
                        if (human.pos.x > canvas.width/2) { human.pos.x = (canvas.width - human.pos.x); }
                        else { human.pos.x = (canvas.width - human.pos.x); }
                    } 
                }

                if (human.pos.y+human.size <= 0) { //top boundary
                    human.pos.y += canvas.height 
                    if (obj.mapBounds.yTwist) { //if y-twist
                        if (human.pos.x > canvas.width/2) { human.pos.x = (canvas.width - human.pos.x); }
                        else { human.pos.x = (canvas.width - human.pos.x); }
                    }
                }
            }
            else { // if no y-wrap
                if (human.pos.y <= 0) { //top boundary
                    if (human.pos.y < 0) { human.pos.y = 0; } //if box manages to move past border slide it back
                    human.vel.y *= -1;
                }

                if (human.pos.y + human.size >= canvas.height) { //bottom boundary
                    if (human.pos.y + human.size > canvas.height) { //if box manages to move past border slide it back
                        human.pos.y = canvas.height - human.size; 
                    } 
                    human.vel.y *= -1;
                }
            }
            
        });
        
        obj.zombies.forEach(function(zombie) {
            
            //x-boundaries
            if (obj.mapBounds.xWrap) { //if x-wrap
                if (zombie.pos.x >= canvas.width) { //right boundary
                    zombie.pos.x = (zombie.pos.x % canvas.width) - zombie.size;
                    if (obj.mapBounds.xTwist) { //if x-twist
                        if (zombie.pos.y > canvas.height/2) { zombie.pos.y = (canvas.height - zombie.pos.y); }
                        else { zombie.pos.y = (canvas.height - zombie.pos.y); }
                    } 
                }

                else if (zombie.pos.x+zombie.size <= 0) { //left boundary
                    zombie.pos.x += canvas.width 
                    if (obj.mapBounds.xTwist) { //if x-twist
                        if (zombie.pos.y > canvas.height/2) { zombie.pos.y = (canvas.height - zombie.pos.y); }
                        else { zombie.pos.y = (canvas.height - zombie.pos.y); }
                    }
                }
            }
            else { // if no x-wrap
                if (zombie.pos.x <= 0) { //left boundary
                    if (zombie.pos.x < 0) { zombie.pos.x = 0; } //if box manages to move past border slide it back
                    zombie.vel.x *= -1;
                }

                else if (zombie.pos.x + zombie.size >= canvas.width) { //right boundary
                    if (zombie.pos.x + zombie.size > canvas.width) { //if box manages to move past border slide it back
                        zombie.pos.x = canvas.width - zombie.size; 
                    } 
                    zombie.vel.x *= -1;
                }
            }
            
            
            //y-boundaries
            if (obj.mapBounds.yWrap) { //if y-wrap
                if (zombie.pos.y >= canvas.height) { //bottom boundary
                    zombie.pos.y = (zombie.pos.y % canvas.height) - zombie.size;
                    if (obj.mapBounds.yTwist) { //if y-twist
                        if (zombie.pos.x > canvas.width/2) { zombie.pos.x = (canvas.width - zombie.pos.x); }
                        else { zombie.pos.x = (canvas.width - zombie.pos.x); }
                    } 
                }

                else if (zombie.pos.y+zombie.size <= 0) { //top boundary
                    zombie.pos.y += canvas.height 
                    if (obj.mapBounds.yTwist) { //if y-twist
                        if (zombie.pos.x > canvas.width/2) { zombie.pos.x = (canvas.width - zombie.pos.x); }
                        else { zombie.pos.x = (canvas.width - zombie.pos.x); }
                    }
                }
            }
            else { // if no y-wrap
                if (zombie.pos.y <= 0) { //top boundary
                    if (zombie.pos.y < 0) { zombie.pos.y = 0; } //if box manages to move past border slide it back
                    zombie.vel.y *= -1;
                }

                if (zombie.pos.y + zombie.size >= canvas.height) { //bottom boundary
                    if (zombie.pos.y + zombie.size > canvas.height) { //if box manages to move past border slide it back
                        zombie.pos.y = canvas.height - zombie.size; 
                    } 
                    zombie.vel.y *= -1;
                }
            }
            
        });
        
    };
    
    
    var chase = function(zom, hum) {
        var hyp, dm, xvel, yvel; //dm := change in magnitude
        hyp = hypotenuse(hum,zom);
        dm = zom.speed / hyp; //hyp is never 0;
        xvel = (hum.pos.x - zom.pos.x)*dm;
        yvel = (hum.pos.y - zom.pos.y)*dm;
        zom.vel.x = xvel;
        zom.vel.y = yvel;
    };
    
    
    var checkGameOver = function(obj) {
        if ((obj.humans.length === 0) || obj.gameTimer >= 300.0000) { obj.gameOver = true; }
    };
    
    
    var collided = function(human, zombie) {
        return (
            ((zombie.pos.x >= human.pos.x && zombie.pos.x <= human.pos.x+human.size) && //if left most of zombie within human x boundaries and
                ((zombie.pos.y >= human.pos.y && zombie.pos.y <= human.pos.y+human.size) || //top most of zombie within human y boundaries or
                 (zombie.pos.y+zombie.size >= human.pos.y && zombie.pos.y+zombie.size <= human.pos.y+human.size))) || //bottom most of zombie within human y boundaries

            ((zombie.pos.x+zombie.size >= human.pos.x && zombie.pos.x+zombie.size <= human.pos.x+human.size) && //if right most of zombie within human x boundaries and
                ((zombie.pos.y >= human.pos.y && zombie.pos.y <= human.pos.y+human.size) || //top most of zombie within human y boundaries or
                 (zombie.pos.y+zombie.size >= human.pos.y && zombie.pos.y+zombie.size <= human.pos.y+human.size))) //bottom most of zombie within human y boundaries
        );
    };
    
    
    var decrementHumanTimers = function(human, dt) {
        if (human.wep.timer > 0.000) { human.wep.timer -= dt; }
        if (human.wep.timer < 0.000) { human.wep.timer = 0.000; }
    };
    
    
    var decrementZombieTimers = function(zombie, dt) {
        if (zombie.stunTimer > 0.000) { zombie.stunTimer -= dt; }
        if (zombie.stunTimer < 0.000) { zombie.stunTimer = 0.000; }
    };
    
    var displayWinner = function(humansWon) {
        if (humansWon){ 
            console.log("HUMANS SURVIVED THE INFECTION! HUMANS WIN!"); 
        } else {
            console.log("ALL HUMANS HAVE BEEN EATEN! ZOMBIES WIN!");
        }
        
    };
    
    
    var distance = function(hum, zom) {
        var dist, dx, dy;
        
        //use center of objects
        var humPos = {
            x: hum.x + 5,
            y: hum.y + 5
        }
        var zomPos = {
            x: zom.x + 5,
            y: zom.y + 5
        }
        
        dx = zomPos.x - humPos.x;
        dy = zomPos.y - humPos.y;
        dist = Math.sqrt((dx*dx) + (dy*dy));
        
        return dist - 12; //makes each player a 7px circle concerning distance;
    };
    
    
    var draw = function(obj) {
        context.fillStyle = '#596E7E'; //background
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        obj.zombies.forEach( function(zombie) {
            if(zombie.stunTimer > 0) {
                context.fillStyle = '#121212'
            } else { context.fillStyle = '#1B9E00'; }
            context.fillRect(zombie.pos.x, zombie.pos.y, zombie.size, zombie.size);
            
        });
        
        obj.humans.forEach( function(human) {
            context.fillStyle = '#9E1616';
            context.fillRect(human.pos.x, human.pos.y, human.size, human.size);
            
        });
        
    };
    
    
    var getWinner = function(obj) {
        return (obj.humans.length === 0) ? true : false;
    };
    
    
    var humanAttack = function(hum, zom) {
        if(Math.random() <= hum.wep.accuracy) { //attack hits
            zom.stunTimer = 2; //set timer to 2 seconds;
            UIController.updateCombatLog("Human id:" + hum.id + " stunned Zombie id:" + zom.id + " with their " + hum.wep.name + "!\n");
        }
        hum.wep.timer += (1/hum.wep.fireRate + (1/100)); // adds additional step due to the order of things computed. May be changed later.
    };
    
    
    var hypotenuse = function(hum, zom) {
        var dx, dy, hyp;
        dx = hum.pos.x - zom.pos.x;
        dy = hum.pos.y - zom.pos.y;
        hyp = Math.round(Math.sqrt((dx*dx) + (dy*dy)));
        return (hyp === 0) ? 9999 : hyp; // if hyp manages to be zero stop velocity by returning very large hyp. n/M ~= 0;
    };
    
    
    var manageInput = function(input) {
        var weapon = input.humWeap;
        if (input.humNum > 200 || input.humNum < 1) {input.humNum = 50;}
        if (input.humImmun > 100 || input.humImmun < 0) {input.humImmun = 0;}
        if (input.humSpeed > 200 || input.humSpeed < 1) {input.humSpeed = 40;}
        if (input.zomNum > 200 || input.zomNum < 1) {input.zomNum = 1;}
        if (input.zomSpeed > 200 || input.zomSpeed < 1) {input.zomSpeed = 50;}
        if (input.humLOS > 300 || input.humLOS < 1) {input.humLOS = 40;}
        if (input.zomLOS > 300 || input.zomLOS < 1) {input.zomLOS = 40;}
        
        if(!weapon.bareFists && !weapon.marsh && //if no weapons checked - default to cowards
           !weapon.nerf && !weapon.sock && !weapon.coward) { input.humWeap.coward = true; }
        
        return input;
    };
    
    
    var movePlayer = function(player, dt) {
        //update positions - movement          
        player.pos.x += player.vel.x * dt;
        player.pos.y += player.vel.y * dt;
    };    
    
    var playerActions = function(obj) { //within range actions
        obj.zombies.forEach( function(zombie) {
            obj.humans.forEach( function(human) {
                var dist = distance(zombie.pos, human.pos);
                //Zombie Action
                if (dist <= zombie.LOS) {
                     chase(zombie, human); //change velocity
                }
                //Human Action
                if (dist <= human.LOS) { //if human sees zombie
                    if (zombie.stunTimer <= 1.0) { //if zombie has little stun time left
                        runAway(human, zombie);  //run complete opposite direction
                    }
                    if (dist <= human.wep.range && human.wep.timer <= 0) { //if within weapon range and timer is 0 or less;
                        humanAttack(human, zombie);
                    }
                }
            });
        });
        
    };
    
    
    var playerCollisions = function(obj) {
        obj.zombies.forEach ( function(zombie) {
            obj.humans.forEach ( function(human) {
                if (collided(human, zombie) && zombie.stunTimer <=0) { //if they collide and zombie is not stunned
                    zombieAttack(obj, human, zombie); //zombie attacks
                }
            }); 
        });
    };
    
    
    var provideWeap = function(weapon, num) {
        let newNerfGun = new NerfGun();
        let newSockClub = new SockClub();
        let newMarshShotgun = new MarshShotGun();
        let newBareFists = new BareFists();
        let newCoward = new Coward();
        
        //ALL CHECKED
        if(weapon.nerf && weapon.sock && weapon.marsh && weapon.bareFists && weapon.coward){
            if(num%5==0) { return newNerfGun; } //multiple of 5
            else if(num%5==1) { return newSockClub; } //remainder of 1
            else if(num%5==2) { return newMarshShotgun; } //remainder of 2
            else if(num%5==3) { return newBareFists; } //remainder of 3
            else if(num%5==4) { return newCoward; } //remainder of 4
        }
        
        
        //4 CHECKED
        else if(weapon.nerf && weapon.sock && weapon.marsh && weapon.bareFists){
            if(num%4==0) { return newNerfGun; }
            else if(num%4==1) { return newSockClub; }
            else if(num%4==2) { return newMarshShotgun; }
            else if(num%4==3) { return newBareFists; }
        }
        
        else if(weapon.coward && weapon.sock && weapon.marsh && weapon.bareFists){
            if(num%4==0) { return newCoward; }
            else if(num%4==1) { return newSockClub; }
            else if(num%4==2) { return newMarshShotgun; }
            else if(num%4==3) { return newBareFists; }
        }
        
        else if(weapon.nerf && weapon.coward && weapon.marsh && weapon.bareFists){
            if(num%4==0) { return newNerfGun; }
            else if(num%4==1) { return newCoward; }
            else if(num%4==2) { return newMarshShotgun; }
            else if(num%4==3) { return newBareFists; }
        }
        
        else if(weapon.nerf && weapon.sock && weapon.coward && weapon.bareFists){
            if(num%4==0) { return newNerfGun; }
            else if(num%4==1) { return newSockClub; }
            else if(num%4==2) { return newCoward; }
            else if(num%4==3) { return newBareFists; }
        }
        
        else if(weapon.nerf && weapon.sock && weapon.marsh && weapon.coward){
            if(num%4==0) { return newNerfGun; }
            else if(num%4==1) { return newSockClub; }
            else if(num%4==2) { return newMarshShotgun; }
            else if(num%4==3) { return newCoward; }
        }
        
        
        //3 CHECKED
        else if (weapon.nerf && weapon.sock && weapon.marsh) { 
            if(num%3===0) { return newNerfGun; }
            else if(num%3===1) { return newSockClub; } 
            else { return newMarshShotgun; } 
        }
        
        else if (weapon.bareFists && weapon.sock && weapon.marsh) { 
            if(num%3===0) { return newBareFists; }
            else if(num%3===1) { return newSockClub; } 
            else { return newMarshShotgun; } 
        }
        
        else if (weapon.nerf && weapon.sock && weapon.bareFists) { 
            if(num%3===0) { return newNerfGun; }
            else if(num%3===1) { return newSockClub; } 
            else { return newBareFists; } 
        }
        
        else if (weapon.nerf && weapon.bareFists && weapon.marsh) { 
            if(num%3===0) { return newNerfGun; }
            else if(num%3===1) { return newBareFists; } 
            else { return newMarshShotgun; } 
        }
        
        else if (weapon.nerf && weapon.sock && weapon.coward) { 
            if(num%3===0) { return newNerfGun; }
            else if(num%3===1) { return newSockClub; } 
            else { return newCoward; } 
        }
        
        else if (weapon.nerf && weapon.coward && weapon.marsh) { 
            if(num%3===0) { return newNerfGun; }
            else if(num%3===1) { return newCoward; } 
            else { return newMarshShotgun; } 
        }
        
        else if (weapon.nerf && weapon.coward && weapon.bareFists) { 
            if(num%3===0) { return newNerfGun; }
            else if(num%3===1) { return newCoward; } 
            else { return newBareFists; } 
        }
        
        else if (weapon.coward && weapon.sock && weapon.marsh) { 
            if(num%3===0) { return newCoward; }
            else if(num%3===1) { return newSockClub; } 
            else { return newMarshShotgun; } 
        }
        
        else if (weapon.bareFists && weapon.sock && weapon.coward) { 
            if(num%3===0) { return newBareFists; }
            else if(num%3===1) { return newSockClub; } 
            else { return newCoward; } 
        }
        
        else if (weapon.bareFists && weapon.marsh && weapon.coward) { 
            if(num%3===0) { return newBareFists; }
            else if(num%3===1) { return newMarshShotgun; } 
            else { return newCoward; } 
        }
        
        //2 CHECKED
        else if (weapon.nerf && weapon.sock) { return (num%2===0) ? newNerfGun : newSockClub; }
        else if (weapon.nerf && weapon.coward) { return (num%2===0) ? newNerfGun : newCoward; }
        else if (weapon.nerf && weapon.marsh) { return (num%2===0) ? newNerfGun : newMarshShotgun; } 
        else if (weapon.marsh && weapon.sock) { return (num%2===0) ? newMarshShotgun : newSockClub; } 
        else if (weapon.marsh && weapon.coward) { return (num%2===0) ? newMarshShotgun : newCoward; } 
        else if (weapon.nerf && weapon.bareFists) { return (num%2===0) ? newNerfGun : newBareFists; }
        else if (weapon.sock && weapon.bareFists) { return (num%2===0) ? newSockClub : newBareFists; } 
        else if (weapon.sock && weapon.coward) { return (num%2===0) ? newSockClub : newCoward; } 
        else if (weapon.marsh && weapon.bareFists) { return (num%2===0) ? newMarshShotgun : newBareFists; } 
        else if (weapon.bareFists && weapon.coward) { return (num%2===0) ? newBareFists : newCoward; } 
        
        //1 CHECKED
        else if (weapon.sock) { return newSockClub; }
        else if (weapon.marsh){ return newMarshShotgun; }
        else if (weapon.nerf) { return newNerfGun; }
        else if (weapon.bareFists) { return newBareFists; }
        else { return newCoward; } //Coward checked or none checked. Default
    };
    
    
    // position not within inner rect
    var randomHumanPos = function() {
        var xPos, yPos;
        xPos = Math.floor(Math.random() * canvas.width * 0.9);
        yPos = Math.floor(Math.random() * canvas.height * 0.9);

        //this loop is not turing complete but 
        //it is obvious the limit of picking n number of positions
        //within the zombie start rect is 0 as n approaches infinity
        while (xPos >= (canvas.width *(2/5)) && xPos <= (canvas.width * (2/5) + (canvas.width/5)) &&
               yPos >= (canvas.height * (2/5)) && yPos <= (canvas.height * (2/5) + (canvas.height/5))) { //while position is within zombie rect
            xPos = Math.floor(Math.random() * canvas.width * 0.9);
            yPos = Math.floor(Math.random() * canvas.height * 0.9);
        }

        return {
            x: xPos,
            y: yPos
        };
    };
    
    
    var randomVel = function(speed) {
        // Generate a random velocity with a magnitude of speed    
        var xVel, yVel;

        // Randomize the x velocity
        // Create random number in [-speed,speed]
        xVel = ((Math.random() * (speed*2)) - speed).toFixed(1);

        // Use magnitude formula to determine the ySpeed
        // Randomly multiply by 1 or -1 for direction
        yVel = Math.sqrt( (speed*speed) - (xVel*xVel)).toFixed(1) * 
                                    (Math.random() > 0.5 ? -1 : 1);

        return {
            x: xVel,
            y: yVel
        };
    };
    
    
    // position within inner rect
    var randomZombiePos = function() {
        return {
            x: Math.floor(Math.random() * canvas.width/5 + canvas.width * (2/5)), //min of 2/5 width. max of 3/5 width
            y: Math.floor(Math.random() * canvas.height/5 + canvas.height * (2/5))
        };
    };
    
    
    var runAway = function(hum, zom) {
        var hyp, dm, xvel, yvel; //dm := change in magnitude
        hyp = hypotenuse(hum,zom);
        dm = hum.speed / hyp; //hyp should never be zero due to collisions
        xvel = (zom.pos.x - hum.pos.x)*dm;
        yvel = (zom.pos.y - hum.pos.y)*dm;
        hum.vel.x = -xvel;
        hum.vel.y = -yvel;
    };    
    
    
    var simulate = function(obj, UIctrl) {
        var lastTime; //t0
        var accumulator = 0;
        var step = 1/100; //100 fps
        
        var endSimulation = function() {
            //set newSim flag to true
            obj.newSim = true;
            
            //clear old sim values
            obj.zombies = [];
            obj.humans = [];
            obj.gameOver = true;
            obj.gameTimer = 0.00;
            UIctrl.clearCombatLog();
        };
        
        //create newSim event listener to end current simulation loop
        document.getElementById('stop-btn').addEventListener('click', endSimulation);
        
        var callback = function(millis) {
            if (lastTime) {     //t1 - t0
                accumulator += (millis - lastTime) / 1000;
                while(accumulator > step){
                    update(obj, step);
                    accumulator -= step;
                }
                draw(obj);
                UIctrl.updateStats(obj);
            }
            lastTime = millis;
            if(!obj.newSim){ this.requestAnimationFrame(callback); } //continue looping recursively until a new simulation is ran.
        };
        if(!obj.newSim) { callback(); }
    };
    
    
    //takes in UI Controller Object returns object containing human and zombie arrays
    var simulationInitializer = function(UIctrl) {
        var input = manageInput(UIctrl.getInput());
        UIctrl.displayModifiedInput(input);
        
        var createHumanArray = function(num, speed, LOS, weap, immun) {
            var hum, i;
            var humans = [];
            for (i = 0 ; i < num ; i++) {
                hum = new Human(i+1, randomHumanPos(), speed, randomVel(speed), LOS, provideWeap(weap, i), immun);
                humans[i] = hum;
            }
            return humans;
        };

        var createZombieArray = function(num, speed, LOS) {
            var zom, i;
            var zombies = [];
            for (i = 0 ; i < num ; i++) {
                zom = new Zombie(i+1, randomZombiePos(), speed, randomVel(speed), LOS, 0.000);
                zombies[i] = zom;
            }
            return zombies;
        };
        
        return {
            humans: createHumanArray(input.humNum, input.humSpeed, input.humLOS,
                                     input.humWeap, input.humImmun),
            
            zombies: createZombieArray(input.zomNum, input.zomSpeed, input.zomLOS),
            
            mapBounds: { 
                        xWrap: input.mapBound.xWrap,
                        xTwist: input.mapBound.xTwist,
                        yWrap: input.mapBound.yWrap,
                        yTwist: input.mapBound.yTwist
                       },
            
            gameTimer: 0.000,
            
            gameOver: false,
            
            winnerDisplay: false,
            
            newSim: false
        };
    };
    
    
    var timeUpdates = function (obj, dt) {
        obj.zombies.forEach( function(zombie) {
           if (zombie.stunTimer <= 0) {
               movePlayer(zombie, dt);
           }
           decrementZombieTimers(zombie, dt); 
        });
        
        obj.humans.forEach( function(human) {
            movePlayer(human, dt);
            decrementHumanTimers(human, dt);
        });
        
    };
    
    var update = function(obj, dt) {
        //check game over
        checkGameOver(obj);
        if(obj.gameOver && !obj.winnerDisplay) {
            UIController.updateCombatLog("\n" + "THE ZOMBIE HORDE HAS PREVAILED \n");
            obj.winnerDisplay = true;
        } else if ( (Math.floor(obj.gameTimer % 60) === 0) && !obj.winnerDisplay) {
            var mins = Math.floor(obj.gameTimer / 60);
            if(mins == 1) {
                UIController.updateCombatLog("\n" + "HUMANS SURVIVED " + mins + " minute! \n");
                obj.winnerDisplay = true; 
            } else if(mins > 1) {
                UIController.updateCombatLog("\n" + "HUMANS SURVIVED " + mins + " minutes! \n");
                obj.winnerDisplay = true; 
            }
        } else if ((Math.floor(obj.gameTimer % 60) === 1) && !obj.gameOver) { //if game is not over at X:01, reset display boolean.
            obj.winnerDisplay = false;
        }
        
        //check player collisions
        playerCollisions(obj);
        
        //check player actions within range
        playerActions(obj);
        
        //check border collisions
        borderCollide(obj);
        
        //player time updates: movement and timer decrements
        timeUpdates(obj, dt);
        
        if (!obj.gameOver) { obj.gameTimer += dt; }
    };
    
    var zombieAttack = function(obj, hum, zom) {
        UIController.updateCombatLog("Zombie id:" + zom.id + " killed Human id:" + hum.id + "!\n");
        var index;
        
        if (Math.random() > hum.IR) {//fails immunity
            //create new zombie at human pos with original zombie's speed and LOS
            var newZom = new Zombie(obj.zombies.length+1, {x: hum.pos.x, y: hum.pos.y}, zom.speed, randomVel(zom.speed), zom.LOS, 0.5);
            
            //add zombie to end of array
            obj.zombies.push(newZom);         

            UIController.updateCombatLog("Human id:" + hum.id + " was infected and turned into Zombie:" + newZom.id + "!\n");
        } else { UIController.updateCombatLog("Human id:" + hum.id + " was immune to the Zombie infection!"); }
        
        zom.vel = randomVel(zom.speed);
        zom.stunTimer = 0.5;
        index = obj.humans.indexOf(hum);
        obj.humans.splice(index, 1);
        
    };
    
    
    //PUBLIC
    return {
        initialize: function(UIctrl) {
            var obj = simulationInitializer(UIctrl);
            return obj;
        },
        
        run: function(obj, UIctrl) {
            simulate(obj, UIctrl);
        }
        
        
    };
        
})();


/****************************
    GLOBAL CONTROLLER
*****************************/

var controller = (function(simulationCtrl, UICtrl) {
    
    var runSimulation = function() {
        var initObj = null;
        UICtrl.clearCombatLog();
        initObj = simulationCtrl.initialize(UICtrl);
        simulationCtrl.run(initObj, UICtrl);   
    };
    
    
    
    var setUpEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        
        //Boundary Check Box Twist Events
        document.getElementById(DOM.xWrapCheck).addEventListener('click', UICtrl.toggleTwistDisplay);
        document.getElementById(DOM.yWrapCheck).addEventListener('click', UICtrl.toggleTwistDisplay);
        
        //Button Events
        document.getElementById(DOM.simButton).addEventListener('click', runSimulation);
        
        document.getElementById(DOM.resetButton).addEventListener('click', UICtrl.resetInput);
    };
    
    return {
        init: function() {
            setUpEventListeners();
        }
            
    };
    
})(simulationController, UIController);

//initializer
controller.init();












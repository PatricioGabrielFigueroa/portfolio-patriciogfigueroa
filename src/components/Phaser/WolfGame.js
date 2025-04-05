import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import './WolfGame.css';

const WolfGame = ({ expandedCard }) => {

  const [ gameStarted, setGameStarted ] = useState(false);
  const [ loadingState, setLoadingState ] = useState(null);
  const [ loadingText, setLoadingText ] = useState(null);

  useEffect(() => {
    let game;

    if (gameStarted) {

    let player;
    let platform;
    let stars;
    let bombs;
    let scoreText; 
    let levelText;
    let ableToJump = true;
    let score = 0;
    let level = 0;
    let cursors;
    let shiftKey;

    const setSize = () => {
      player.body.setSize(80, 77);
      player.body.setOffset(25, 51);
      player.setScale(expandedCard === 4 ? 0.8 : 0.4);
    };

    const config = {
      type: Phaser.AUTO,
      width: expandedCard === 4 ? 700 : 180,
      height: expandedCard === 4 ? 700 : 200,
      backgroundColor: '#063970',
      parent: 'game-container',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 320 },
          debug: true,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    game = new Phaser.Game(config);

    function preload() {

      // let loadingText = this.add.text(100, 100, 'Loading...', { fontSize: '20px', fill: '#ffffff' });
      
      this.load.on('progress', (value) => {
        setLoadingState(true);
        setLoadingText(`Loading... ${Math.round(value * 100)}%`);
      });
    
      this.load.on('complete', () => {
        setLoadingState(false);
        setLoadingText(`Loading Complete!`);
        // loadingText.destroy(); // Remove loading text when loading is complete 
        // Use this.time.delayedCall(1000, () => {}) instead of setTimeOut
      });

      this.load.spritesheet('idle-wolf', './assets/Idle.png', { frameWidth: 128, frameHeight: 128 });
      this.load.spritesheet('walk-wolf', './assets/walk.png', { frameWidth: 128, frameHeight: 128 });
      this.load.spritesheet('run-wolf', './assets/Run.png', { frameWidth: 128, frameHeight: 128 });
      this.load.image('block', './assets/block.png');
      this.load.spritesheet('jump-wolf', './assets/Jump.png', { frameWidth: 128, frameHeight: 128 });
      this.load.spritesheet('dead-wolf', './assets/Dead.png', { frameWidth: 128, frameHeight: 128 });
      this.load.image('star', './assets/star.png');
      this.load.image('bomb', './assets/bomb.png');
      console.log('All assets loaded');
    }

    function create() {
      ableToJump = true;

      // Create platforms
      platform = this.physics.add.staticGroup();
      platform.create(600, expandedCard === 4 ? 180 : 46, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      let platformAddNext = 50;
      let numberOfPlatforms = 50;

      while (numberOfPlatforms > platform.children.entries.length) {
        platform.create(platformAddNext += (expandedCard === 4 ? 50 : 15), expandedCard === 4 ? 300 : 160, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody().setTint(0xC3C32B);
      }

      // Create random platforms
      platform.create(0, expandedCard === 4 ? 150 : 46  , 'block').setScale(expandedCard === 4 ? 3 : 1).setOrigin(0, 0).refreshBody();
      platform.create(48, 150, 'block').setScale(expandedCard === 4 ? 3 : 1).setOrigin(0, 0).refreshBody();

      platform.create(700, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      platform.create(800, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      platform.create(1000, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      platform.create(1100, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      platform.create(1500, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      platform.create(1700, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();
      platform.create(1750, 180, 'block').setScale(expandedCard === 4 ? 3 : 1).refreshBody();

      // Input setup
      cursors = this.input.keyboard.createCursorKeys();
      shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

      // Create player with default sprite
      player = this.physics.add.sprite(200, 100, 'idle-wolf'); // Initialize with 'idle-wolf'
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platform);
      this.physics.world.setBounds(0, 0, 3000, config.height);

      // Create stars
      stars = this.physics.add.group({
        key: 'star',
        repeat: 35,
        setXY: { x: 12, y: 0, stepX: 70 },
      });

      stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(expandedCard === 4 ? 1 : 0.5);
      });

      this.physics.add.collider(stars, platform);

      // Animations
      this.anims.create({
        key: 'ib',
        frames: this.anims.generateFrameNumbers('idle-wolf', { start: 0, end: 7 }),
        frameRate: 18,
        repeat: -1,
      });

      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('walk-wolf', { start: 0, end: 10 }),
        frameRate: 18,
        repeat: -1,
      });

      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('run-wolf', { start: 0, end: 8 }),
        frameRate: 18,
        repeat: -1,
      });

      this.anims.create({
        key: 'jump-0',
        frames: [{ key: 'jump-wolf', frame: 0 }],
        frameRate: 8,
      });

      this.anims.create({
        key: 'fall',
        frames: [{ key: 'jump-wolf', frame: 7 }],
        frameRate: 8,
        frameBuffer: 3,
        repeat: -1,
      });

      this.anims.create({
        key: 'dead',
        frames: this.anims.generateFrameNumbers('dead-wolf', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: 0,
      });

      // Camera setup
      this.cameras.main.setBounds(0, 0, 3000, config.height);
      this.cameras.main.startFollow(player);

      // Score and level text
      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: expandedCard === 4 ? '22px' : '11px', fill: '#fff', fontFamily: 'Verdana' });
      scoreText.setScrollFactor(0);

      levelText = this.add.text(expandedCard === 4 ? 590 : 120, 16, 'Level: 0', { fontSize: expandedCard === 4 ? '22px' : '11px', fill: '#fff', fontFamily: 'Verdana' });
      levelText.setScrollFactor(0);

      // Create bombs
      bombs = this.physics.add.group();
      this.physics.add.collider(bombs, platform);
    }

    function update() {
      console.log(player.y)
      if (player.isDead) return;

      // Handle player movement and animations
      if (cursors.right.isDown) {
        if (shiftKey.isDown && player.body.touching.down) {
          player.anims.play('run', true);
          setSize();
          player.setFlipX(false);
          player.setVelocityX(220);
        } else {
          player.anims.play('walk', true);
          player.setFlipX(false);
          player.setVelocityX(expandedCard === 4 ? 160 : 100);
        }
      } else if (cursors.left.isDown) {
        if (shiftKey.isDown && player.body.touching.down) {
          setSize();
          player.anims.play('run', true);
          player.setFlipX(true);
          player.setVelocityX(-220);
        } else {
          setSize();
          player.anims.play('walk', true);
          player.setFlipX(true);
          player.setVelocityX(expandedCard === 4 ? -160 : -100);
        }
      } else {
        setSize();
        player.anims.play('ib', true);
        player.setVelocityX(0);
      }

      // Handle jumping
      if (cursors.up.isDown && player.body.touching.down && ableToJump) {
        setSize();
        player.setVelocityY(expandedCard === 4 ? -300 : -240);
        ableToJump = false;
      }

      // Handle jumping and falling animations
      if (!player.body.touching.down) {
        setSize();
        if (player.body.velocity.y <= -294) {
          player.anims.play('jump-0', true);
        } else {
          player.anims.play('fall', true);
        }
      }

      // Reset jump ability when touching the ground
      if (player.body.touching.down) {
        setSize();
        ableToJump = true;
      }

      // Handle player death
      if (expandedCard === 4) {
        if (player.y >= 530 && !player.isDead) {
          setSize();
          player.setCollideWorldBounds(false);
          player.isDead = true;
          setTimeout(() => {
            this.scene.restart();
            score = 0;
            level = 0;
          }, 1000);
        }
      } else if (expandedCard !== 4) {
        if (player.y >= 160 && !player.isDead) {
          setSize();
          player.setCollideWorldBounds(false);
          player.isDead = true;
          setTimeout(() => {
            this.scene.restart();
            score = 0;
            level = 0;
          }, 1000);
        }
      }


      // Handle bomb collision
      function hitBomb(player, bomb) {
        setSize();
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.stop();
        player.setVelocity(0, 0);
        player.isDead = true;
        setTimeout(() => {
          this.scene.restart();
          score = 0;
          level = 0;
          player.isDead = false;
        }, 500);
      }
      this.physics.add.collider(player, bombs, hitBomb, null, this);

      // Handle star collection
      function collectStar(player, star) {
        star.disableBody(true, true);
        ableToJump = false;
        score += 10;
        scoreText.setText('Score: ' + score);
        if (stars.countActive(true) === 0) {
          stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
          });
          level += 1;
          levelText.setText('Level: ' + level);
          function createBomb() {
            var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          }
          for (let i = 0; i < level; i++) {
            createBomb();
          }
        }
      }
      this.physics.add.overlap(player, stars, collectStar);
    }
    }
    
    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [expandedCard]);

  return (

    <div>

      {!gameStarted && (
        <div className='btn-box'>
        <button className='game-btn' onClick={() => setGameStarted(true)}>Start Wolf Game</button>
        </div>
      )}

    {gameStarted && (

      <div id="game-container" style={{ 
        width: `${expandedCard === 4 ? '100%' : '100%'}`, height: '100%',
        transform: `translate(0px, 0px)`,
      }} />

    )}

    </div>

  )
};

export default WolfGame;
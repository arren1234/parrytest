controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (parryOpen) {
        parryOpen = false
        parry = true
        pause(200)
        parry = false
        pause(1000)
        parryOpen = true
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (parry) {
        sprite.setVelocity(500, 0)
        sprite.setImage(assets.image`bulletR`)
    } else {
        info.changeLifeBy(-1)
        sprites.destroy(sprite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (!(sprite.vx == otherSprite.vx)) {
        sprites.destroy(sprite)
        sprites.destroy(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.vx > 0) {
        info.changeScoreBy(1)
        sprites.destroy(sprite)
    }
})
let projectile: Sprite = null
let parryOpen = false
let parry = false
info.setScore(0)
parry = false
parryOpen = true
scene.setBackgroundColor(8)
let baddie = sprites.create(assets.image`baddieR`, SpriteKind.Enemy)
baddie.setPosition(140, 60)
let gooddie = sprites.create(assets.image`goodie`, SpriteKind.Player)
gooddie.setPosition(20, 60)
controller.moveSprite(gooddie, 0, 100)
gooddie.setStayInScreen(true)
info.setLife(3)
game.onUpdate(function () {
    if (parry) {
        gooddie.setImage(assets.image`goodieParry`)
    } else {
        if (parryOpen) {
            gooddie.setImage(assets.image`goodie`)
        } else {
            gooddie.setImage(assets.image`goodieTired`)
        }
    }
})
game.onUpdate(function () {
    if (Math.abs(baddie.y - gooddie.y) > 1) {
        if (baddie.y < gooddie.y) {
            baddie.setVelocity(0, 50)
        } else {
            baddie.setVelocity(0, -50)
        }
    } else {
        baddie.setPosition(140, gooddie.y)
    }
})
game.onUpdateInterval(100, function () {
    if (randint(0, 10) == 0) {
        projectile = sprites.createProjectileFromSprite(assets.image`bulletL`, baddie, -100, 0)
    }
})

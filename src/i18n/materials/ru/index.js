import bossDrops from './boss-drops.json';
import commonEnemies from './common-enemies.json';
import gems from './gems.json';
import weaponAscension from './weapon-ascension.json';
import books from './books.json';
import common from './common.json';
import groups from './groups.json';

export default {
    ...bossDrops,
    ...commonEnemies,
    ...gems,
    ...weaponAscension,
    ...books,
    ...common,
    groups
}
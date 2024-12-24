import { MobieMenu } from "./mobileMenu.js";
import { Carousel } from "./carousel.js";
import { TiersPainter } from "./tiers.js";
import { PhoneInput } from "./phoneInput.js";
import { FormValidation } from "./formValidation.js";

new MobieMenu();

new Carousel('#carsFromKorea');
new Carousel('#carsFromChina', { direction: 'rtl' });
new Carousel('#carsFromJapan');

new TiersPainter();

new PhoneInput();

new FormValidation();
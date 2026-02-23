import fs from 'fs';
import { cleanBuilderContent } from './app/api/export-component/helpers.js';

const code = fs.readFileSync('app/templates/terra/terra-product-carousel.js', 'utf8');
const cleaned = cleanBuilderContent(code, 'TerraProductCarousel');
console.log(cleaned.substring(cleaned.indexOf('<BuilderImage'), cleaned.indexOf('suffix={`image-${index}`}') + 300));

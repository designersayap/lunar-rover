
import HeaderSection from '@/app/templates/header/header-section';
import HeaderGroup from '@/app/templates/header/header-group';

import TerraBannerHero from '@/app/templates/terra/terra-banner-hero';
import OsmBanner from '@/app/templates/osm/osm-banner';
import FormPersonalDataSection from '@/app/templates/form/form-personal-data-section';

import FeatureImageLeft from '@/app/templates/feature/feature-image-left';
import FeatureImageRight from '@/app/templates/feature/feature-image-right';

import DialogItemList from '@/app/templates/dialog/dialog-item-list';
import DialogAccordion from '@/app/templates/dialog/dialog-accordion';
import DialogForm from '@/app/templates/dialog/dialog-form';

import Media169 from '@/app/templates/media/media-16-9';
import Media54 from '@/app/templates/media/media-5-4';
import Media43 from '@/app/templates/media/media-4-3';
import Media219 from '@/app/templates/media/media-21-9';
import TikTokEmbed from '@/app/templates/social-bridge/tiktok-embed';

import NavigationCenter from '@/app/templates/navigation/navigation-center';
import NavigationLeft from '@/app/templates/navigation/navigation-left';
import NavigationRight from '@/app/templates/navigation/navigation-right';

import BackgroundFullBody from '@/app/templates/background/full-body';

import TerraTestimony from '@/app/templates/terra/terra-testimony';
import TerraProductCarousel from '@/app/templates/terra/terra-product-carousel';

import TerraFooter from '@/app/templates/terra/terra-footer';
import SpacingSmall from '@/app/templates/spacing/spacing-small';
import SpacingMedium from '@/app/templates/spacing/spacing-medium';
import SpacingLarge from '@/app/templates/spacing/spacing-large';

import ScrollGroup from '@/app/page-builder/utils/builder/scroll-group';
import FloatingActionButton from '@/app/templates/cta/floating-action-button';

export const COMPONENT_REGISTRY = {

    "header-section": HeaderSection,
    "header-group": HeaderGroup,

    "hero-terra-banner": TerraBannerHero,
    "osm-banner": OsmBanner,

    "feature-image-left": FeatureImageLeft,
    "feature-image-right": FeatureImageRight,

    "dialog-item-list": DialogItemList,
    "dialog-accordion": DialogAccordion,
    "dialog-form": DialogForm,
    "form-personal-data-section": FormPersonalDataSection,

    "media-16-9": Media169,
    "media-5-4": Media54,
    "media-4-3": Media43,
    "media-21-9": Media219,
    "social-bridge-tiktok": TikTokEmbed,

    "navigation-center": NavigationCenter,
    "navigation-left": NavigationLeft,
    "navigation-right": NavigationRight,

    "background-full-body": BackgroundFullBody,

    "testimonial-terra": TerraTestimony,
    "product-carousel-terra": TerraProductCarousel,

    "footer-terra": TerraFooter,
    "spacing-small": SpacingSmall,
    "spacing-medium": SpacingMedium,
    "spacing-large": SpacingLarge,

    "scroll-group": ScrollGroup,
    "floating-action-button": FloatingActionButton
};

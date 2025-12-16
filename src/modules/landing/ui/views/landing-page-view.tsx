import { LandingNavigation } from "../components/landing-navigation";
import { LandingHero } from "../components/landing-hero";
import { LandingFeatures } from "../components/landing-features";
import { LandingHowItWorks } from "../components/landing-how-it-works";
import { LandingFooter } from "../components/landing-footer";

export default function LandingPageView() {
    return (
        <div>
            <LandingNavigation />
            <LandingHero />
            <LandingFeatures />
            <LandingHowItWorks />
            <LandingFooter />
        </div>
    );
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const portfolioDe = `
<ul>
  <li>LIZENZIERUNG UND ERWERB VON GENERISCHEN ARZNEIMITTELN</li>
  <li>MARKETING, VERTRIEB UND LIFE-CYCLE-MANAGEMENT VON ARZNEIMITTELN IN VERSCHIEDENEN THERAPIEBEREICHEN UND GENERIKA</li>
</ul>
`;

const portfolioUk = `
<ul>
  <li>LICENSING AND ACQUISITION OF GENERIC MEDICINES</li>
  <li>MARKETING, SALES AND LIFE CYCLE MANAGEMENT OF MEDICINES IN VARIOUS THERAPEUTIC AREAS AND GENERICS</li>
</ul>
`;

const imprintMainDe = `
## Angaben gemäß § 5 TMG:
**AMETAS medical GmbH**
Christophstraße 6-8
09212 Limbach-Oberfrohna

## Vertreten durch:
Saad Muntazim

## Kontakt:
**Fax:** +49 3722 4696292
**E-Mail:** info@ametas-medical.de
**Web:** www.ametas-medical.de

## Registereintrag:
Eintragung im Handelsregister.
**Registergericht:** Amtsgericht Chemnitz
**Registernummer:** HRB 31152

## USt-ID:
Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
**DE313068381**
**Steuer-Nr.:** 221/105/03435

## Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Saad Muntazim
Christophstraße 6-8
09212 Limbach-Oberfrohna
`;

const imprintDisclaimerDe = `
### Haftung für Inhalte
Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.

### Haftung für Links
Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.

### Urheberrecht
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
`;

const dataProtectionDe = `
# A. Datenschutzerklärung
## I. Name und Anschrift des Verantwortlichen
Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze ist die:

**AMETAS medical GmbH**
Christophstr. 6-8
09212 Limbach-Oberfrohna
E-Mail: info@ametas-medical.de
Webseite: www.ametas-medical.de

## II. Kontaktdaten des Datenschutzbeauftragten
**DELTA proveris AG**
Ludwig-Richter-Straße 3
09212 Limbach-Oberfrohna Deutschland
Tel.: 03722 71 70 50
E-Mail: dsb@depag.de
Webseite: www.depag.de
`;

const welcomeTextDe = `AMETAS medical GmbH wurde im Jahr 2017 gegründet. Als Pharmaunternehmen aus der Mitte Deutschlands liegt unser Fokus auf therapeutischen Bedürfnissen, der Heilung von Krankheiten und der Linderung von Symptomen. Unser Ziel ist unsere Serviceverpflichtung gegenüber unseren Patienten auf einem hohen Niveau an Wirtschaftlichkeit, Versorgungssicherheit, Qualität und technischer Kompetenz.`;

async function main() {
  const blocks = [
    // GERMAN (DE)
    { key: 'hero_title', value: 'MEDIZINTECHNIK IN EXZELLENZ.', lang: 'de', section: 'hero' },
    { key: 'hero_subtitle', value: 'Innovative Lösungen für die moderne Gesundheitsversorgung.', lang: 'de', section: 'hero' },
    { key: 'welcome_title', value: 'WILLKOMMEN BEI AMETAS MEDICAL', lang: 'de', section: 'home' },
    { key: 'welcome_text', value: welcomeTextDe, lang: 'de', section: 'home' },
    { key: 'portfolio_title', value: 'UNSER PORTFOLIO', lang: 'de', section: 'home' },
    { key: 'portfolio_items_html', value: portfolioDe, lang: 'de', section: 'home' },
    { key: 'imprint_main_markdown', value: imprintMainDe, lang: 'de', section: 'legal' },
    { key: 'imprint_disclaimer_markdown', value: imprintDisclaimerDe, lang: 'de', section: 'legal' },
    { key: 'dp_main_markdown', value: dataProtectionDe, lang: 'de', section: 'legal' },
    { key: 'contact_page_title', value: 'KONTAKT', lang: 'de', section: 'contact' },
    
    // UK ENGLISH (UK) - Re-seeding to ensure completeness
    { key: 'hero_title', value: 'MEDICAL TECHNOLOGY IN EXCELLENCE.', lang: 'uk', section: 'hero' },
    { key: 'hero_subtitle', value: 'Innovative solutions for modern healthcare.', lang: 'uk', section: 'hero' },
    { key: 'welcome_title', value: 'WELCOME TO AMETAS MEDICAL', lang: 'uk', section: 'home' },
    { key: 'welcome_text', value: 'Your reliable partner for high-quality medical products and innovative medical technology solutions.', lang: 'uk', section: 'home' },
    { key: 'portfolio_title', value: 'OUR PORTFOLIO', lang: 'uk', section: 'home' },
    { key: 'portfolio_items_html', value: portfolioUk, lang: 'uk', section: 'home' },
    { key: 'contact_page_title', value: 'CONTACT', lang: 'uk', section: 'contact' },
  ];

  for (const block of blocks) {
    await prisma.contentBlock.upsert({
      where: { 
        key_language: { 
          key: block.key, 
          language: block.lang 
        } 
      },
      update: { value: block.value, section: block.section },
      create: { key: block.key, value: block.value, language: block.lang, section: block.section },
    });
  }

  console.log('Seed completed successfully for DE and UK languages');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

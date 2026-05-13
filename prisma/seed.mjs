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
  <li>Licensing and acquisition of generic medicines</li>
  <li>Marketing, sales and life cycle management of medicines in various therapeutic areas and generics</li>
</ul>
`;

const imprintMainUk = `
## Indications according § 5 TMG:
**AMETAS medical GmbH**
Christophstrasse 6-8
09212 Limbach-Oberfrohna

## Represented by:
Saad Muntazim

## Contact:
**Fax:** +49 3722 4696292
**E-Mail:** info@ametas-medical.de
**Web:** www.ametas-medical.de

## Register entry:
Entry in the trade register.
**Register court:** Amtsgericht Chemnitz
**Register number:** HRB 31152

## VAT-ID:
VAT-Identification number according to §27 a VAT-law:
**DE313068381**
**Steuer-Nr.:** 221/105/03435

## Responsible for the content according to § 55 Para. 2 RStV:
Saad Muntazim
Christophstrasse 6-8
09212 Limbach-Oberfrohna
`;

const imprintDisclaimerUk = `
### Liability for content
We are responsible for own contents on these pages by the general laws according to § 7 Para.1 TMG as service provider. But we are not obligated to control transferred or saved external information or to research for circumstances which point to an illegal activity.

Obligations to remove or lock the use of information by the general laws remain untouched thereof. But a particular liability is just possible from the moment of knowledge of a concrete infringement. We will remove these contents immediately at emerging of the particular infringements.

### Liability for links
Our offer contains links to external websites of third party on whose contents we do not have any influence. That is why we are not able to take over any warranty for these external contents. The particular provider is always responsible for the content of the linked pages. The linked pages had been checked for possible infringements at the moment of the linking. Illegal contents were not known at the moment of the linking. But a permanent check of the linked pages is not reasonable without any concrete aspects of an infringement. We will remove such links immediately if any infringements occur.

### Copyright
The contents and the works on these pages created by the page operator are subject to the German copyright. The copying, editing, distribution and each type of using outside the borders of the copyright need the written acceptance of the particular author and/or creator. Downloads and copies of these pages are only allowed for the private use, not for the commercial one. If the contents of this page had not been created by the operator so the copyrights of third party are regarded. Especially, contents of third party are marked as such ones. If you should notice nevertheless any copyright infringement please give us a particular information. We will remove these contents immediately at emerging of the particular infringements.

---
*Quelle: eRecht24*
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

const dataProtectionUk = `
# A. Data Privacy Statement

## I. Name and address of the party responsible
The party responsible in the meaning of the General Data Protection Regulation and other national data protection laws of the member states as well as other regulations of the data protection laws is the:

**AMETAS medical GmbH**  
Christophstr. 6-8  
09212 Limbach-Oberfrohna  
E-Mail: info@ametas-medical.de  
Webseite: www.ametas-medical.de

## II. Contact information of the data protection officer
**DELTA proveris AG**  
Ludwig-Richter-Straße 3  
09212 Limbach-Oberfrohna Deutschland  
Tel.: 03722 71 70 50  
E-Mail: dsb@depag.de  
Webseite: www.depag.de

## III. General about the data processing
### 1. Extent of the processing of person-related data
Basically, we only process person-related data of our users as long as this is necessary for the provision of a functional homepage as well as our contents and services. Regularly, the processing of person-related data of our users only takes place after the consent of the user. An exception is only valid in such cases where a previous request of a consent due to real reasons is not possible and the processing of data is allowed by legal regulations.

### 2. Legal basis for processing of person-related data
As long as we require a consent of the particular person for processing issues of person-related data Art. 6 para. 1 a EU-General Data Protection Regulation (GDPR) serves as legal basis. Art. 6 para. 1 b GDPR serves as legal basis at the processing of person-related data which are necessary for the fulfillment of a contract whose contract party is the particular person. This is also valid for processing issues which are necessary for the execution of conditions precedent to the contract.

As long as a processing of person-related data is necessary for the fulfillment of a legal obligation which our company is subject to Art. 6 para. 1 c GDPR is the legal basis. Art. 6 para. 1 d GDPR serves as legal basis for the case that essential interests of the particular person or another natural person require a processing of person-related data.

If the processing is necessary for the keeping of an authorized interest of our company or a third party and the interests, basic laws and basic liberties of the particular person do not outweigh the first meant interest so Art. 6 para. 1 f GDPR is the legal basis for the processing.

### 3. Data deletion and storage duration
The person-related data of the particular person are deleted or locked as soon as the purpose of the storage is not applicable. Furthermore, a storage can take place if this was provided by the European or national legislator in legal regulations, laws or other rules of the Union whom the party responsible is subject to. A locking or deletion of the data also takes place then if a dictated storage period named by the standards expires unless a necessarity exists for the further storage of the data for a contract conclusion or contract fulfillment.

## IV. Provision of the homepage and creation of logfiles
### 1. Description and extent of the data processing
Our system registers automated data and information from the computer system of the appealing PC at each appeal of our homepage. The following data are collected herewith:

* a. Information about the browser type and the used version  
* b. The operating system of the user  
* c. The internet service provider of the user  
* d. The IP-address of the user  
* e. Date and time of the access  
* f. Homepages from which the system of the user comes to our homepage  

The data are also saved in the logfiles of our system. A storage of these data together with other person-related data of the user does not take place.

### 2. Legal basis for the data processing
Art. 6 para. 1 f GDPR is the legal basis for the intermediate storage of the data and the logfiles.

### 3. Purpose of the data processing
The intermediate storage of the IP-address by the system is necessary in order to enable a provision of the homepage to the PC of the user. Therefore the IP-address of the user remains saved for the period of the session.

The storage in logfiles takes place in order to secure the functionality of the homepage. Furthermore, the data are necessary for the optimization of the homepage and for the security of the safety of our information-technological systems. An analysis of the data for marketing purposes does not take place in this context. Our authorized interest of the data processing is also in these purposes by Art. 6 para. 1 f GDPR.

### 4. Period of the storage
The data are deleted as soon as they are not necessary anymore for the fulfillment of the purposes of their collection. This is the issue in the case of the registration of the data for the provision of the homepage if the particular session is finished.

This is the issue after at least 14 days in the case of the storage of the data in logfiles. A storage beyond this is possible. In this case, the IP-addresses of the users are deleted or alienated so that an assignment of the appealing client is not possible anymore.

### 5. Possibility of oppisition and clearance
The registration of the data to provide the homepage and the storage of the data in logfiles is essentially necessary. As follows, the user does not have the possibility to disagree.

## V. Use of Cookies
### 1. Description and extent of the data processing
Our homepage uses Cookies. Cookies are text files which are saved in the internet browser and/or by the internet browser on the computer system of the user. If a user appeals a homepage so a Cookie can be saved on the operating system of the user. This Cookie contains a characteristic string which enables a clear identification of the browser at the new appeal of the homepage.

We implement Cookies to design our homepage user-friendlier. Some elements of our homepage require that the appealing browser can also be identified after a change of homepage.

With it the following data are saved and transferred in the Cookies:

* (1) language settings  
* (2) login information  

Beyond this, we use Cookies on our homepage which enable an analysis of the surf behaviour of the user. So, the following data can be transferred:

* (1) entered search words  
* (2) frequency of appeals of homepages  
* (3) usage of homepage functions  

### 2. Legal basis for the data processing
Art. 6 para. 1 f GDPR is the legal basis for the processing of person-related data by using Cookies.

### 3. Purpose of the data processing
The purpose of the use of technically necessary Cookies is to simplify the use of homepages for the user. Some functions of our homepage can not be offered without the implementation of Cookies. For those it is necessary that the browser will be identified again after the change of a homepage.

We need Cookies for the following applications:

* (1) use of support and customer portal  
* (2) transfer of language settings  
* (3) memory of search words  

The user data collected by the technically necessary Cookies are not used for the creation of user profiles. The use of analysis Cookies takes place for the purpose of improving the quality of our homepage and their contents. We get to know by the analysis Cookies how the homepage is used and so we can optimize our offer permanently.

The associated data protection statement is found under IX Data Protection Statement for the use of Google Analytics.

Our authorized interest of the data processing is also in these purposes by Art. 6 para. 1 f GDPR.

### 4. Period of storage, possibility of oppisition and clearance
Cookies are saved on the PC of the user and transferred from this to our homepage. That is why you as user also have the full control about the usage of Cookies. You can deactivate or limit the transfer of Cookies by a change of the settings in your internet browser. Already saved Cookies can be deleted at each time. This can also take place automated. If you deactivate Cookies for our homepage it can possibly happen that some functions of the homepage can not be used completely.

## VI. Newsletter
### 1. Description and extent of the data processing
It is possible to subscribe a newsletter without costs on our homepage. Hereby, the data from the entry mask are transferred at the login to the newsletter. Therefore, your E-mail-address is only required.

Furthermore, the following data are collected at the login:

* (1) IP-address of the appealing PC  
* (2) date and time of the registration  
* (3) E-mail-address  

Your consent is requested for the processing of the data and referred to this data protection statement.

If you purchase products or services and depose your E-mail-address herewith so this can be used for the sending of a newsletter as follows. In such a case, direct marketing is exclusively sent for own products or services via the newsletter.

A transfer of the data to third party does not take place in the context with the data processing for the sending of newsletters. The data are only used for the sending of the newsletter.

### 2. Legal basis for the data processing
Art. 6 para. 1 a GDPR is the legal basis for the processing of data after the login to the newsletter by the user at the existence of a consent of the user.

§ 7 para. 3 UWG is the legal basis for the sending of the newsletter due to the sales of products and services.

### 3. Purpose of the data processing
The collection of the E-mail-address of the user serves for the sending of the newsletter. The collection of other person-related data in the case of the login process serves for the fact to avoid a misuse of the services or the used E-mail-address.

### 4. Period of the storage
The data are deleted as soon as they are not necessary anymore for the fulfillment of the purpose of their collection. So the E-mail-address of the user is saved as long as the subscription of the newsletter is active.

Regularly, the other person-related data collected during the login process are deleted after a deadline of 14 days.

### 5. Possibility of opposition and clearance
The subscription of the newsletter can be cancelled by the particular user at each time. You will find a particular link in each newsletter for this purpose.

Herewith, an opposition of the consent of the storage of the person-related data which had been collected during the login process is also possible.

## VII. Contact form and E-mail-contact
### 1. Description and extent of the data processing
Contact forms are available on our homepage which can be used for the electronical contacting. If a user takes this possibility so the data entered in the entry mask are transferred to us and saved. These data are:

Data of the entry mask:
* Name (optional)
* Name of the company (optional)
* E-Mail-address (obligation)
* Message (optional)
* Telephone (optional)

Furthermore, the following data are saved at the moment of the sending of the message:
* (1) the IP-address of the user  
* (2) date and time of the registration  

Your consent is requested for the processing of the data during the sending process and referred to this data protection statement.

As alternative, a contacting is possible via the provided E-mail-address. In this case, the person-related data of the user transferred with the E-mail are saved.

A transfer of the data to third party does not take place in this context. The data are only used for the processing of the communication.

### 2. Legal basis for the data processing
Art. 6 para. 1 a GDPR is the legal basis for the processing of the data at the existence of a consent of the user.

Art. 6 para. 1 f GDPR is legal basis for the processing of the data which are transferred during the sending of an E-mail. If the E-mail-contact focuses on the conclusion of a contract so Art. 6 para. 1 b GDPR is the additional legal basis for the processing.

### 3. Purpose of the data processing
The processing of the person-related data from the entry mask just serves for the editing of the contacting. In the case of a contacting per E-mail, the necessary authorized interest is also at the processing of the data.

The other person-related data processed during the login process serve for the fact to avoid the misuse of the contact form and to secure the safety of our information-technological systems.

### 4. Period of storage
The data are deleted as soon as they are not necessary anymore for the fulfillment of the purpose of their collection. This is the case then if the particular communication with the user is finished according to the person-related data from the entry mask of the contact form and those which had been sent per E-mail. The communication is finished then if you can read from the circumstances that the particular subject is cleared finally.

The person-related data which had been collected additionally during the sending process are deleted at least after a deadline of 14 days.

### 5. Possibility of opposition and clearance
The user has the possibility at each time to cancel his/her consent for the processing of the person-related data. If the user contacts us per E-mail so he/she can disagree the storage of his/her person-related data at each time. In such a case, it is not possible to continue the communication.

The opposition can take place via widerspruch@delta-barth.de.

All person-related data which had been saved during the contacting are deleted in this case.

## VIII. Rights of the particular person
If person-related data of you are processed so you are the particular person in the sense of the GDPR and you have the following rights against the party responsible:

### 1. Information right
You can require a confirmation from the party responsible about the fact if person-related data which refer to you are processed by us. If such a processing exists so you can require advice from the party responsible about the following information:

* (1) the purpose for which the person-related data are processed;  
* (2) the categories of person-related data which are processed;  
* (3) the recipients and/or the categories of recipients against whose the person-related data which refer to you had been externalized or will be externalized;  
* (4) the planned period of storage of the person-related data which refer to you or if concrete indications are not possible criteria for the definition of the storage period;  
* (5) the existence of a right to correct or delete the person-related data which refer to you, a right to limit the processing by the party responsible or an opposition right against this processing;  
* (6) the existence of a right to complaint at a controlling institution;  
* (7) all available information about the origin of the data if the person-related data are not collected at the particular person;  
* (8) the existence of an automated decision making including profiling according to Art. 22 para. 1 and 4 GDPR – and at least in these cases – sophisticated information about the involved logic as well as the consequences and the planned effects of such a processing for the particular person.  

You have the right to require information about the fact if the person-related data which refer to you are transferred to third country or an international organization. In this context, you can require to receive information about the suitable guarantees due to Art. 46 GDPR in the context of the transfer.

### 2. Right to correction
You have the right to correction and/or completion against the party responsible as long as the processed person-related data which refer to you are incorrect or incomplete. The party responsible has to execute the correction immediately.

### 3. Right to limitation of the processing
You can require the limitation of the processing of the person-related data which refer to you under the following preconditions:

* (1) if you deny the correctness of the person-related data which refer to you for a period which gives the party responsible the possibility to check the correctness of the person-related data;  
* (2) the processing is illegal and you reject the deletion of the person-related data and instead require the limitation of the use of the person-related data;  
* (3) the party responsible do not need the person-related data for the purposes of the processing anymore, but you need these for the enforcement, execution or defence of legal claims or  
* (4) if you stated opposition against the processing due to Art. 21 para. 1 GDPR and it is not defined yet if the authorized reasons of the party responsible outweigh your reasons.  

If the processing of the person-related data which refer to you had been limited so these data – apart from the storage – are only processed with your consent or for the enforcement, execution or defence of legal claims or for the protection of the rights of another natural or legal person or due to an important public interest of the Union or a member state.

If the limitation of the processing had been limited by the preconditions mentioned above so you will be informed by the party responsible before the limitation is annuled.

### 4. Right to deletion
#### a. Obligation of deletion
You can require from the party responsible that the person-related data which refer to you are deleted immediately and the party responsible is obligated to delete these data immediately as long as one of the following reasons applies:

* (1) The person-related data which refer to you are not necessary anymore for the purpose for which they had been collected or processed in any other way.  
* (2) You cancel your consent where the processing belongs to according to Art. 6 para. 1 a or Art. 9 para. 2 a GDPR and any other legal basis is missing for the processing.  
* (3) You disagree the processing due to Art. 21 para. 1 GDPR and any prior authorized reasons do not exist for the processing or you disagree the processing due to Art. 21 para. 2 GDPR.  
* (4) The person-related data which refer to you had been processed illegally.  
* (5) The deletion of the person-related data which refer to you is necessary to fulfill a legal obligation by the Union right or the right of the member states which the party responsible is subject to.  
* (6) The person-related data which refer to you had been collected in reference to offered services of the information community due to Art. 8 para. 1 GDPR.  

#### b. Information to third party
If the party responsible has published the person-related data which refer to you and if it is obligated to delete these due to Art. 17 para. 1 GDPR so it defines suitable measures in consideration of the available technology and the implemenation costs, also in technological way, in order to inform persons which are responsible for the data processing and the processing of the person-related data about the fact that you as particular person has required by you the deletion of all links to these person-related data or of copies or replications of these person-related data.

#### c. Exceptions
The right to deletion does not exist as long as the processing is necessary

* (1) for the execution of the right of the freedom of expression and information;  
* (2) for the fulfillment of a legal obligation which the processing requires by the right of the Union or the member states which the party responsible is subject to or for the taking of a task which is in the public interest or in execution of the public force which had been transferred to the party responsible;  
* (3) due to reasons of the public interest in the scope of the public health due to Art. 9 para. 2 h and i as well as Art. 9 para. 3 GSPR;  
* (4) for archive purposes which are in the public interest, scientific or historical research purposes or for statistic purposes due to Art. 89 para. 1 GDPR as long as the right named under paragraph a) disables the fulfillment of the objectives of this processing probably or damages seriously or  
* (5) for the enforcement, execution or defence of legal claims.  

### 5. Right to disclosure
If you announced the right to correction, deletion or limitation of the processing against the party responsible so this is obligated to disclose this correction or deletion of the data or the limitation of the processing all recipients whom the person-related data which refer to you had been externalized unless this is not possible or is connected with a disproportional effort.

You have the right against the party responsible to get disclosure about these recipients.

### 6. Right to data assignability
You have the right to receive the person-related data which refer to you and which you have provided to the party responsible in a structured, common and machine-readable format. Besides you have the right to transfer these data to another party responsible without obstruction by the party responsible which the person-related data had been provided as long as

* (1) the processing bases on a consent due to Art. 6 para. 1 a GDPR or Art. 9 para. 2 a GDPR or on a contract due to Art. 6 para. 1 b GDPR and  
* (2) the processing takes place with the help of automated procedures.  

At execution of this right, you also have the right to obtain that the person-related data which refer to you are directly transferred from a party responsible to another party responsible as long as this is technologically possible. It is not allowed to damage liberties and rights of other persons hereby.

The right to data assignability is not valid for the processing of person-related data which is necessary for the keeping of a task which is in the public interest or takes place in execution of the public force which had been transferred to the party responsible.

### 7. Right to opposition
You have the right to announce opposition due to reasons which result from you special situation at each time against the processing of the person-related data which refer to you which takes place due to the Art. 6 para. 1 e or f GDPR; this is also valid for a profiling which is aided by these definitions.

The party responsible do not process the person-related data which refer to you anymore unless it can prove compulsory protection-worth reasons for the processing which outweigh your interests, rights and liberties or the processing serves for the enforcement, execution or defence of legal claims.

If the person-related data wich refer to you are processed to provide direct marketing so you have the right to announce opposition at each time against the processing of the person-related data which refer to you for the purpose of such marketing; this is also valid for the profiling as long as it is connected with such a direct marketing.

If you disagree the processing for purposes of the direct marketing so the person-related data which refer to you are not processed for these purposes anymore.

You have the possibility to execute your right to opposition via automated procedures where technical specifications were used in the context of the use of services of the information community – in the face of the regulation 2002/58/EG.

### 8. Right to cancellation of the consent statement due to data privacy law
You have the right to cancel your consent statement due to the data privacy law at each time. The legality of the processing which had been taken place due to the consent until the cancellation is not touched.

### 9. Automated decision in the single case including profiling
You have the right not to be subject to a decision which bases on an automated processing – including profiling – which offers a legal effect against you or which damages you in a similar way enormously. This is not valid if the decision

* (1) is necessary for the conclusion or the fulfillment of a contract between you and the party responsible,  
* (2) is valid due to right regulations of the Union or the member states whom the party responsible is subject to and these right regulations contain suitable measures to keep your rights and liberties as well as your authorized interests or  
* (3) takes place with your explicit consent.  

But these decisions may not base on special categories of person-related data by Art. 9 para. 1 GDPR as long as Art. 9 Abs. 2 a or g GDPR is not valid and suitable measures to protect the rights and liberties as well as your authorized interests had been made.

The party responsible defines suitable measures according to the cases named in (1) and (3) in order to keep the rights and liberties as well as your authorized interests what for at least the right belongs to obtain the access of a person on the side of the party responsible, to statement of the own point of view and to appeal against the decision.

### 10. Right to complaint at a controlling institution
Regardless of another appeal due to administrative law or due to court, you have the right to complaint at a controlling institution especially in the member state of your residence, your workplace or the place of the alleged violation if you have the point of view that the processing of the person-related data which refer to you violates the GDPR.

The controlling institution which received the complaint informs the complainant about the status and the results of the complaint including the possibility of a judicial appeal by Art. 78 GDPR.
`;

const matomoUk = `
# B. Web analysis by Matomo (formerly known as PIWIK)

### 1. Extent of the processing of person-related data
We use the Open-Source-Software tool Matomo (formerly known as PIWIK) on our homepage to analyze the surfing behaviour of our users. The software uses a Cookie on the PC of the user (look above for Cookies). If single pages of our homepage are appealed so the following data are saved:

* (1) two bytes of the IP-address of the appealing system of the user  
* (2) the appealed homepage  
* (3) the homepage from where the user comes to the appealed homepage (referrer)  
* (4) the sub-pages which are appealed from the appealed homepage  
* (5) the duration time on the homepage  
* (6) the frequency of the appeal of the homepage  

The software only runs on the servers of our homepage. A saving of the person-related data of the user only takes place there. A transfer to third party does not take place.

The software is defined the way that the IP-addresses are not saved completely, but 2 bytes of the IP-addresses are masked (Example: 192.168.xxx.xxx). So an assignment of the reduced IP-address to the appealing PC is not possible anymore.

### 2. Legal basis for the processing of person-related data
Art. 6 para. 1 lit. F GDPR is the legal basis for the processing of person-related data of the user.

### 3. Purpose of the data processing
The processing of the person-related data of the user enables an analysis of the surfing behaviour of our users. We are able by the analysis of the received data to compose information about the use of the single components of our homepage. This helps us to improve our homepage and its user friendliness permanently. Our authorized interest is in the processing of the data in these purposes by Art. 6 para. 1 lit. f GDPR. The protection of the person-related data are supported by the anynomization of the IP-address in the interest of the user.

### 4. Duration of the saving
The data are deleted as soon as they are not necessary anymore for the record purposes.

It is after 425 days in this case.

### 5. Possibility of opposition and clearance
Cookies are saved on the PC of the user and transferred by this to our homepage. That is why you have the full control about the use of the Cookies. You can deactivate or limit the transfer of Cookies by a change of the settings in your internet browser. Already saved Cookies can be deleted at each time. This can also take place automated. If Cookies are deactivated for our homepage it can happen that functions of the homepage can not be used completely anymore.

We offer our users on our homepage the possibility of an Opt-Out from the analyse procedure. Therefore you have to follow the particular link. So a further Cookie is set on your system which signals our system not to save the data of the user. If the user deletes the particular Cookie inbetween from the own system so he/she have to set the Opt-Out-Cookie again.

You will find detailed information about the privacy settings of the Matomo Software under the following link: [https://matomo.org/docs/privacy/](https://matomo.org/docs/privacy/).
`;

const matomoDe = `
# B. Web-Analyse durch Matomo (ehemals PIWIK)

### 1. Umfang der Verarbeitung personenbezogener Daten
Wir nutzen auf unserer Website das Open-Source-Software-Tool Matomo (ehemals PIWIK) zur Analyse des Surfverhaltens unserer Nutzer. Die Software setzt ein Cookie auf dem Rechner der Nutzer (zu Cookies siehe oben). Werden Einzelseiten unserer Website aufgerufen, so werden folgende Daten gespeichert:

* (1) zwei Bytes der IP-Adresse des aufrufenden Systems des Nutzers
* (2) die aufgerufene Webseite
* (3) die Website, von der der Nutzer auf die aufgerufene Webseite gelangt ist (Referrer)
* (4) die Unterseiten, die von der aufgerufenen Webseite aus aufgerufen werden
* (5) die Verweildauer auf der Webseite
* (6) die Häufigkeit des Aufrufs der Webseite

Die Software läuft dabei ausschließlich auf den Servern unserer Website. Eine Speicherung der personenbezogenen Daten der Nutzer findet nur dort statt. Eine Weitergabe der Daten an Dritte erfolgt nicht.

Die Software ist so eingestellt, dass die IP-Adressen nicht vollständig gespeichert werden, sondern 2 Bytes der IP-Adresse maskiert werden (Bsp.: 192.168.xxx.xxx). Auf diese Weise ist eine Zuordnung der gekürzten IP-Adresse zum aufrufenden Rechner nicht mehr möglich.

### 2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten
Rechtsgrundlage für die Verarbeitung der personenbezogenen Daten der Nutzer ist Art. 6 Abs. 1 lit. f DSGVO.

### 3. Zweck der Datenverarbeitung
Die Verarbeitung der personenbezogenen Daten der Nutzer ermöglicht uns eine Analyse des Surfverhaltens unserer Nutzer. Wir sind durch die Auswertung der gewonnenen Daten in der Lage, Informationen über die Nutzung der einzelnen Komponenten unserer Webseite zusammenzustellen. Dies hilft uns dabei, unsere Webseite und deren Nutzerfreundlichkeit stetig zu verbessern. In diesen Zwecken liegt auch unser berechtigtes Interesse in der Verarbeitung der Daten nach Art. 6 Abs. 1 lit. f DSGVO. Durch die Anonymisierung der IP-Adresse wird dem Interesse der Nutzer an deren Schutz personenbezogener Daten hinreichend Rechnung getragen.

### 4. Dauer der Speicherung
Die Daten werden gelöscht, sobald sie für unsere Aufzeichnungszwecke nicht mehr benötigt werden. In unserem Fall ist dies nach 425 Tagen der Fall.

### 5. Widerspruchs- und Beseitigungsmöglichkeit
Cookies werden auf dem Rechner des Nutzers gespeichert und von diesem an unserer Seite übermittelt. Daher haben Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für unsere Website deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website vollumfänglich genutzt werden.

Wir bieten unseren Nutzern auf unserer Website die Möglichkeit eines Opt-Out aus dem Analyseverfahren an. Hierzu müssen Sie dem entsprechenden Link folgen. Auf diese Weise wird ein weiterer Cookie auf ihrem System gesetzt, der unserem System signalisiert, die Daten des Nutzers nicht zu speichern. Löscht der Nutzer den entsprechenden Cookie zwischenzeitlich vom eigenen System, so muss er den Opt-Out-Cookie erneut setzen.

Nähere Informationen zu den Privatsphäreeinstellungen der Matomo Software finden Sie unter folgendem Link: https://matomo.org/docs/privacy/.
`;

const welcomeTextDe = `AMETAS medical GmbH wurde im Jahr 2017 gegründet. Als Pharmaunternehmen aus der Mitte Deutschlands liegt unser Fokus auf therapeutischen Bedürfnissen, der Heilung von Krankheiten und der Linderung von Symptomen. Unser Ziel ist unsere Serviceverpflichtung gegenüber unseren Patienten auf einem hohen Niveau an Wirtschaftlichkeit, Versorgungssicherheit, Qualität und technischer Kompetenz.`;

const welcomeTextUk = `AMETAS medical GmbH was founded in 2017. As a pharmaceutical company from the center of Germany, our focus is on therapeutic needs, the healing of diseases and the relief of symptoms. Our aim is our service obligations towards our patients at a high level of economy, supply security, quality and technical expertise.`;

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
    { key: 'dp_matomo_markdown', value: matomoDe, lang: 'de', section: 'legal' },
    { key: 'contact_page_title', value: 'KONTAKT', lang: 'de', section: 'contact' },
    
    // UK ENGLISH (UK)
    { key: 'hero_title', value: 'MEDICAL TECHNOLOGY IN EXCELLENCE.', lang: 'uk', section: 'hero' },
    { key: 'hero_subtitle', value: 'Innovative solutions for modern healthcare.', lang: 'uk', section: 'hero' },
    { key: 'welcome_title', value: 'Welcome!', lang: 'uk', section: 'home' },
    { key: 'welcome_text', value: welcomeTextUk, lang: 'uk', section: 'home' },
    { key: 'portfolio_title', value: 'Our portfolio', lang: 'uk', section: 'home' },
    { key: 'portfolio_items_html', value: portfolioUk, lang: 'uk', section: 'home' },
    { key: 'imprint_main_markdown', value: imprintMainUk, lang: 'uk', section: 'legal' },
    { key: 'imprint_disclaimer_markdown', value: imprintDisclaimerUk, lang: 'uk', section: 'legal' },
    { key: 'dp_main_markdown', value: dataProtectionUk, lang: 'uk', section: 'legal' },
    { key: 'dp_matomo_markdown', value: matomoUk, lang: 'uk', section: 'legal' },
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

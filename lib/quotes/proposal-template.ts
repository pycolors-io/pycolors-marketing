import { LEGAL_COMPANY } from "@/lib/products/commercial-policy";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";
import { SITE_URL } from "@/lib/seo/website";

export const PROPOSAL_TEMPLATE_PATH = "/request-a-quote/template";

/** Blank, editable proposal: no customer, agreed price or acceptance is fabricated. */
export function createProposalTemplate(locale: SiteLocale = "en") {
  const company = `${LEGAL_COMPANY.name} · ${LEGAL_COMPANY.registration}`;
  const address = `${LEGAL_COMPANY.addressLine1}, ${LEGAL_COMPANY.postalCode}, ${LEGAL_COMPANY.country}`;
  const terms = `${SITE_URL}${localizedHref("/terms", locale)}`;
  const license = `${SITE_URL}${localizedHref("/license", locale)}`;
  const handover = `${SITE_URL}${localizedHref("/starters/pro/implementation-example", locale)}`;
  if (locale === "fr")
    return `# PYCOLORS · Devis de réalisation

**Modèle vierge à compléter et à valider avant envoi. Aucun projet client, tarif convenu ou accord n’est présumé.**

## 1. Références et parties

- Numéro de devis : [à compléter]
- Date d’émission : [à compléter]
- Valable jusqu’au : [à compléter]
- Version et référence du brief : [à compléter]
- Prestataire : ${company}
- Adresse : ${address}
- SIRET : ${LEGAL_COMPANY.siret}
- TVA : ${LEGAL_COMPANY.vatNumber}
- Contact : ${LEGAL_COMPANY.email}
- Client / raison sociale : [à compléter]
- Adresse de facturation et identifiants applicables du client : [à compléter]
- Contact projet et personne habilitée à accepter le devis : [à compléter]

## 2. Objectif et contexte du client

- Produit, activité et public visé : [à compléter]
- Situation actuelle et éléments déjà disponibles : [à compléter]
- Problème à résoudre : [à compléter]
- Parcours prioritaires pour cette mission : [à compléter]
- Résultat observable attendu : [à compléter]
- Prestation retenue : [Logiciel sur mesure / Démarrage accompagné / Adaptation métier — confirmer le périmètre]

## 3. Périmètre et livrables

Décrire chaque livrable concret et ses limites. Un exemple du starter ne devient pas automatiquement une fonctionnalité incluse.

| Référence | Livrable / parcours | Réalisation incluse | Limites et exclusions | Preuve remise |
| --- | --- | --- | --- | --- |
| L01 | [écran ou parcours] | [comportement attendu] | [hors périmètre] | [lien / révision / document] |
| L02 | [configuration ou intégration] | [environnement et actions] | [limites du fournisseur] | [configuration expurgée / référence de test] |
| L03 | [validation et passation] | [contrôles et documentation convenus] | [ce qui reste à la charge du client] | [résultats et document de passation] |

## 4. Étapes et calendrier

| Jalon | Travail prévu | Élément à valider par le client | Responsable | Date convenue |
| --- | --- | --- | --- | --- |
| Cadrage | Confirmer les livrables et les dépendances | Périmètre et critères de réception | [à compléter] | [à compléter] |
| Version de validation | Réaliser les éléments convenus dans l’environnement prévu | Parcours et retours regroupés | [à compléter] | [à compléter] |
| Réception et passation | Vérifier, documenter et remettre les éléments convenus | Résultats et actions restantes | [à compléter] | [à compléter] |

Date de démarrage et prérequis : [à compléter]. Dépendances, disponibilités et incidence d’un retard de validation : [à convenir par écrit]. Aucune date n’est garantie par ce modèle.

## 5. Éléments à fournir par le client

- Maquettes, identité visuelle et contenus : [responsable / disponibilité]
- Application ou dépôt existant et révision de départ : [référence]
- Comptes des fournisseurs et environnement retenu : [propriétaire / référence]
- Accès nécessaires : [méthode sécurisée de partage, sans secrets dans le devis]
- Interlocuteur métier et personne chargée de valider : [à compléter]
- Données de test autorisées : [jeux fictifs ou périmètre validé]

## 6. Critères de réception

| Livrable | Scénario à vérifier | Résultat attendu | Environnement | Preuve à joindre | État |
| --- | --- | --- | --- | --- | --- |
| L01 | [action et rôle] | [résultat observable] | [URL / version] | [référence] | À vérifier |
| L02 | [cas nominal et cas refusé] | [résultat observable] | [URL / version] | [référence] | À vérifier |
| L03 | [installation ou reprise par l’équipe] | [résultat observable] | [URL / version] | [référence] | À vérifier |

Procédure de revue, retours, corrections et validation : [à convenir]. Ne pas présenter un contrôle non exécuté comme conforme.

## 7. Détail financier

| Poste | Référence de périmètre | Quantité / unité | Prix unitaire HT | Montant HT |
| --- | --- | --- | --- | --- |
| Réalisation convenue | [L01–L03] | [à compléter] | [à compléter] | [à compléter] |
| Licence Starter Pro, si nécessaire | [licence / titulaire] | [à compléter] | [à compléter] | [à compléter] |
| Option expressément retenue | [référence] | [à compléter] | [à compléter] | [à compléter] |

- Total HT : [à compléter]
- TVA applicable et montant : [à déterminer pour cette prestation et ce client]
- Total TTC / montant à payer : [à compléter]
- Devise : EUR
- Échéancier, acompte éventuel et échéances de paiement : [à convenir]
- Hébergement, services tiers et frais récurrents : [inclus / exclus / payés directement par le client]

Les prix « à partir de » du site ne remplacent pas le montant et le périmètre de ce devis. Une option non acceptée reste exclue.

## 8. Changements et exclusions

Toute demande extérieure au périmètre doit préciser le changement, son prix et son incidence sur le calendrier, puis faire l’objet d’un accord écrit avant réalisation. Exclusions particulières : [à compléter].

## 9. Remise, licence et accompagnement

- Source et révision remis, accès et documentation : [à compléter]
- Conditions d’utilisation de Starter Pro et titulaire de licence : [à confirmer]
- Droits sur les adaptations spécifiques : [à convenir explicitement]
- Assistance incluse et durée : [périmètre / période / contact]
- Exploitation et maintenance après livraison : [incluses ou exclues, selon accord]
- Actions restantes et responsables : [à compléter]

Références à examiner et joindre dans leur version applicable : [conditions](${terms}), [licence](${license}) et [exemple de passation](${handover}). Les dispositions particulières, taxes et modalités d’acceptation doivent être vérifiées pour la mission concernée.

## 10. Accord

- Périmètre et version acceptés : [à compléter]
- Modalités d’acceptation convenues : [à compléter]
- Représentant du client, date et accord : [à compléter]
- Représentant du prestataire, date et accord : [à compléter]

Ne commencer la réalisation qu’après confirmation des engagements et prérequis convenus. Ce fichier vierge n’établit aucun accord ni paiement.
`;
  return `# PYCOLORS · Implementation proposal

**Blank template to complete and review before sending. No customer project, agreed price or acceptance is implied.**

## 1. References and parties

- Proposal number: [complete]
- Issue date: [complete]
- Valid until: [complete]
- Version and brief reference: [complete]
- Provider: ${company}
- Address: ${address}
- SIRET: ${LEGAL_COMPANY.siret}
- VAT number: ${LEGAL_COMPANY.vatNumber}
- Contact: ${LEGAL_COMPANY.email}
- Client / legal entity: [complete]
- Client billing address and applicable registration details: [complete]
- Project contact and authorized approver: [complete]

## 2. Client objective and context

- Product, activity and intended users: [complete]
- Current situation and existing assets: [complete]
- Problem to solve: [complete]
- Priority workflows for this engagement: [complete]
- Observable outcome: [complete]
- Selected service: [Custom software / Guided setup / Business adaptation — confirm scope]

## 3. Scope and deliverables

Describe concrete deliverables and their boundaries. A starter example does not automatically become an included feature.

| Reference | Deliverable / workflow | Included implementation | Boundaries and exclusions | Evidence handed over |
| --- | --- | --- | --- | --- |
| D01 | [screen or workflow] | [expected behavior] | [out of scope] | [link / revision / document] |
| D02 | [configuration or integration] | [environment and actions] | [provider boundaries] | [redacted configuration / test reference] |
| D03 | [validation and handover] | [agreed checks and documentation] | [client responsibilities] | [results and handover document] |

## 4. Milestones and schedule

| Milestone | Planned work | Client review | Owner | Agreed date |
| --- | --- | --- | --- | --- |
| Scope confirmation | Confirm deliverables and dependencies | Scope and acceptance criteria | [complete] | [complete] |
| Review version | Implement agreed items in the selected environment | Workflows and consolidated feedback | [complete] | [complete] |
| Acceptance and handover | Verify, document and hand over agreed items | Results and remaining actions | [complete] | [complete] |

Start date and prerequisites: [complete]. Dependencies, availability and the impact of delayed reviews: [agree in writing]. This template guarantees no date.

## 5. Client inputs

- Designs, brand assets and content: [owner / availability]
- Existing application or repository and starting revision: [reference]
- Provider accounts and selected environment: [owner / reference]
- Required access: [secure sharing method; no credentials in this document]
- Business contact and approver: [complete]
- Authorized test data: [fictional fixtures or agreed scope]

## 6. Acceptance criteria

| Deliverable | Scenario to verify | Expected outcome | Environment | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| D01 | [action and role] | [observable outcome] | [URL / version] | [reference] | Not run |
| D02 | [allowed and denied case] | [observable outcome] | [URL / version] | [reference] | Not run |
| D03 | [team installation or takeover] | [observable outcome] | [URL / version] | [reference] | Not run |

Review, feedback, corrections and acceptance process: [agree]. Never mark an unexecuted check as passed.

## 7. Financial breakdown

| Item | Scope reference | Quantity / unit | Unit price excluding VAT | Amount excluding VAT |
| --- | --- | --- | --- | --- |
| Agreed implementation | [D01–D03] | [complete] | [complete] | [complete] |
| Starter Pro license, if required | [license / holder] | [complete] | [complete] | [complete] |
| Explicitly selected option | [reference] | [complete] | [complete] | [complete] |

- Subtotal excluding VAT: [complete]
- Applicable VAT and amount: [determine for this engagement and client]
- Total including VAT / amount due: [complete]
- Currency: EUR
- Payment schedule, any deposit and due dates: [agree]
- Hosting, providers and recurring fees: [included / excluded / paid directly by client]

Website starting prices do not replace this proposal's agreed scope and amount. An unaccepted option remains excluded.

## 8. Changes and exclusions

An out-of-scope request must describe the change, price and schedule impact and receive written agreement before implementation. Specific exclusions: [complete].

## 9. Handover, license and assistance

- Delivered source revision, access and documentation: [complete]
- Starter Pro license terms and license holder: [confirm]
- Rights covering custom adaptations: [explicitly agree]
- Included assistance and duration: [scope / period / contact]
- Post-delivery operations and maintenance: [included or excluded, as agreed]
- Outstanding actions and owners: [complete]

Review and attach the applicable versions of the [terms](${terms}), [license](${license}) and [handover example](${handover}). Engagement-specific terms, taxes and acceptance arrangements must be checked before use.

## 10. Agreement

- Accepted scope and version: [complete]
- Agreed acceptance method: [complete]
- Client representative, date and acceptance: [complete]
- Provider representative, date and acceptance: [complete]

Start work only once the agreed commitments and prerequisites are confirmed. This blank file establishes no agreement or payment.
`;
}

import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
export const FRENCH_SERVICES = [
  {
    ...STARTER_PRO_SERVICES.setup,
    title: "Démarrage accompagné",
    description:
      "Configurez un environnement convenu, connectez vos services et vérifiez un premier parcours utilisateur.",
    deliverable:
      "Un environnement configuré, une liste de vérifications et un document de passation.",
    highlights: [
      "Configuration de la marque, de la connexion, des emails et de la facturation",
      "Vérification des parcours compte, espace de travail et projet",
      "Notes d’exploitation et séance de passation",
    ],
  },
  {
    ...STARTER_PRO_SERVICES.adaptation,
    title: "Adaptation métier",
    description:
      "Faites réaliser un parcours métier ou une intégration délimitée, avec des critères d’acceptation écrits.",
    deliverable:
      "Un parcours implémenté, des résultats de validation et un document de passation.",
    highlights: [
      "Modifications convenues de l’interface, de l’API et du modèle de données",
      "Contrôles des permissions et des régressions",
      "Validation documentée et passation à votre équipe",
    ],
  },
].map((service) => ({
  ...service,
  href: `/fr/demande-de-devis?service=${service.id}`,
  priceLabel: service.priceLabel
    .replace("From ", "À partir de ")
    .replaceAll(",", " "),
}));

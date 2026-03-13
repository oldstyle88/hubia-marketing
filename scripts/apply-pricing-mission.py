#!/usr/bin/env python3
"""Apply pricing clarity + killer tagline mission to all 5 locale files."""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MESSAGES_DIR = os.path.join(ROOT, "messages")

DATA = {
    "it": {
        "plans_pro": {
            "name": "Studio",
            "description": "Per team 1-3 persone. Tutto l'essenziale: prenotazioni, calendario condiviso, clienti, notifiche automatiche.",
            "features": [
                "Prenotazioni online clienti 24/7",
                "Calendario condiviso team",
                "Gestione staff e servizi",
                "Notifiche automatiche (conferma, promemoria)",
                "Anagrafica clienti + storico appuntamenti",
                "Report base (prenotazioni, revenue giornaliera)",
                "PWA installabile con tuo logo e colori",
                "Supporto email (risposta entro 24h lavorative)"
            ]
        },
        "plans_max": {
            "name": "Signature",
            "description": "Per team 4-10+ persone o per chi vuole il controllo completo delle metriche business.",
            "features": [
                "Tutto il piano Studio",
                "Dashboard analytics: trend prenotazioni settimanali/mensili, servizi più richiesti, performance per staff, tasso di occupazione",
                "Appuntamenti ricorrenti automatici (es: cliente fisso ogni 2 settimane si autoprenota)",
                "Branding avanzato (personalizzazione completa colori, font, layout interfaccia)",
                "Supporto prioritario (risposta entro 4h lavorative)"
            ]
        },
        "multiSiteNote": "Multi-sede (2-5 location): stesso prezzo per sede. Setup €900 prima sede, €400 sedi successive. Oltre 5 sedi: preventivo personalizzato.",
        "pricing_subtitle": "Non ti vendiamo clienti. Ti diamo lo strumento per non perderli mai. HŪBIA è il sistema di gestione pensato per attività locali che vogliono organizzare prenotazioni, clienti e staff in modo professionale. Due piani chiari: Studio e Signature.",
    },
    "en": {
        "plans_pro": {
            "name": "Studio",
            "description": "For 1-3 person teams. All the essentials: bookings, shared calendar, clients, automatic notifications.",
            "features": [
                "24/7 online bookings for clients",
                "Shared team calendar",
                "Staff and services management",
                "Automatic notifications (confirmation, reminders)",
                "Client database + appointment history",
                "Basic reports (bookings, daily revenue)",
                "Installable PWA with your logo and colors",
                "Email support (response within 24h business hours)"
            ]
        },
        "plans_max": {
            "name": "Signature",
            "description": "For 4-10+ person teams or those who want complete control of business metrics.",
            "features": [
                "Everything in Studio",
                "Analytics dashboard: weekly/monthly booking trends, top services, staff performance, occupancy rate",
                "Automatic recurring appointments (e.g., regular client every 2 weeks auto-books)",
                "Advanced branding (full customization of colors, fonts, interface layout)",
                "Priority support (response within 4h business hours)"
            ]
        },
        "multiSiteNote": "Multi-site (2-5 locations): same price per site. Setup €900 first site, €400 additional sites. Over 5 sites: custom quote.",
        "pricing_subtitle": "We don't sell you customers. We give you the tool to never lose them. HŪBIA is the management system for local businesses that want to organise bookings, clients and staff professionally. Two clear plans: Studio and Signature.",
    },
    "de": {
        "plans_pro": {
            "name": "Studio",
            "description": "Für Teams mit 1-3 Personen. Alle Grundlagen: Buchungen, gemeinsamer Kalender, Kunden, automatische Benachrichtigungen.",
            "features": [
                "Online-Buchungen 24/7 für Kunden",
                "Gemeinsamer Team-Kalender",
                "Mitarbeiter- und Dienstverwaltung",
                "Automatische Benachrichtigungen (Bestätigung, Erinnerungen)",
                "Kundendatenbank + Terminhistorie",
                "Basis-Reports (Buchungen, Tagesumsatz)",
                "Installierbare PWA mit Ihrem Logo und Farben",
                "E-Mail-Support (Antwort innerhalb 24h Werktags)"
            ]
        },
        "plans_max": {
            "name": "Signature",
            "description": "Für Teams mit 4-10+ Personen oder für alle, die vollständige Kontrolle über Geschäftskennzahlen wollen.",
            "features": [
                "Alles aus Studio",
                "Analytics-Dashboard: wöchentliche/monatliche Buchungstrends, Top-Services, Mitarbeiter-Performance, Auslastungsrate",
                "Automatische Wiederholungstermine (z.B. Stammkunde alle 2 Wochen bucht automatisch)",
                "Erweitertes Branding (vollständige Anpassung von Farben, Schriften, Interface-Layout)",
                "Prioritäts-Support (Antwort innerhalb 4h Werktags)"
            ]
        },
        "multiSiteNote": "Multi-Standort (2-5 Standorte): gleicher Preis pro Standort. Setup €900 erster Standort, €400 weitere Standorte. Über 5 Standorte: individuelles Angebot.",
        "pricing_subtitle": "Wir verkaufen Ihnen keine Kunden. Wir geben Ihnen das Tool, um sie nie zu verlieren. HŪBIA ist das Verwaltungssystem für lokale Unternehmen, die Buchungen, Kunden und Personal professionell organisieren möchten. Zwei klare Pläne: Studio und Signature.",
    },
    "es": {
        "plans_pro": {
            "name": "Studio",
            "description": "Para equipos de 1-3 personas. Todo lo esencial: reservas, calendario compartido, clientes, notificaciones automáticas.",
            "features": [
                "Reservas online 24/7 para clientes",
                "Calendario compartido del equipo",
                "Gestión de personal y servicios",
                "Notificaciones automáticas (confirmación, recordatorios)",
                "Base de datos de clientes + historial de citas",
                "Informes básicos (reservas, ingresos diarios)",
                "PWA instalable con tu logo y colores",
                "Soporte por email (respuesta en 24h laborables)"
            ]
        },
        "plans_max": {
            "name": "Signature",
            "description": "Para equipos de 4-10+ personas o para quienes quieren control completo de las métricas del negocio.",
            "features": [
                "Todo lo de Studio",
                "Panel de analytics: tendencias de reservas semanales/mensuales, servicios más solicitados, rendimiento del personal, tasa de ocupación",
                "Citas recurrentes automáticas (ej: cliente fijo cada 2 semanas se autoprograma)",
                "Branding avanzado (personalización completa de colores, fuentes, diseño de interfaz)",
                "Soporte prioritario (respuesta en 4h laborables)"
            ]
        },
        "multiSiteNote": "Multi-sede (2-5 ubicaciones): mismo precio por sede. Setup €900 primera sede, €400 sedes adicionales. Más de 5 sedes: presupuesto personalizado.",
        "pricing_subtitle": "No te vendemos clientes. Te damos la herramienta para no perderlos nunca. HŪBIA es el sistema de gestión para negocios locales que quieren organizar reservas, clientes y personal de forma profesional. Dos planes claros: Studio y Signature.",
    },
    "fr": {
        "plans_pro": {
            "name": "Studio",
            "description": "Pour les équipes de 1 à 3 personnes. Tout l'essentiel : réservations, calendrier partagé, clients, notifications automatiques.",
            "features": [
                "Réservations en ligne 24/7 pour les clients",
                "Calendrier partagé de l'équipe",
                "Gestion du personnel et des services",
                "Notifications automatiques (confirmation, rappels)",
                "Base de données clients + historique des rendez-vous",
                "Rapports de base (réservations, chiffre d'affaires quotidien)",
                "PWA installable avec votre logo et couleurs",
                "Support par email (réponse sous 24h ouvrées)"
            ]
        },
        "plans_max": {
            "name": "Signature",
            "description": "Pour les équipes de 4 à 10+ personnes ou pour ceux qui veulent un contrôle complet des métriques business.",
            "features": [
                "Tout le plan Studio",
                "Tableau de bord analytics : tendances des réservations hebdomadaires/mensuelles, services les plus demandés, performance du personnel, taux d'occupation",
                "Rendez-vous récurrents automatiques (ex : client régulier toutes les 2 semaines se réserve automatiquement)",
                "Branding avancé (personnalisation complète des couleurs, polices, mise en page de l'interface)",
                "Support prioritaire (réponse sous 4h ouvrées)"
            ]
        },
        "multiSiteNote": "Multi-sites (2-5 emplacements) : même prix par site. Setup 900 € premier site, 400 € sites supplémentaires. Plus de 5 sites : devis personnalisé.",
        "pricing_subtitle": "Nous ne vous vendons pas de clients. Nous vous donnons l'outil pour ne jamais les perdre. HŪBIA est le système de gestion pour les entreprises locales qui veulent organiser les réservations, les clients et le personnel de manière professionnelle. Deux plans clairs : Studio et Signature.",
    },
}

def main():
    for loc, d in DATA.items():
        path = os.path.join(MESSAGES_DIR, f"{loc}.json")
        with open(path, "r", encoding="utf-8") as f:
            j = json.load(f)
        j["plans"]["pro"] = d["plans_pro"]
        j["plans"]["max"] = d["plans_max"]
        j["pricing"]["multiSiteNote"] = d["multiSiteNote"]
        j["pricing"]["subtitle"] = d["pricing_subtitle"]
        with open(path, "w", encoding="utf-8") as f:
            json.dump(j, f, ensure_ascii=False, indent=2)
        print(f"Updated {loc}.json")
    print("Done.")

if __name__ == "__main__":
    main()

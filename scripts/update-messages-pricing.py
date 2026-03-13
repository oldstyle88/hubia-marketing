#!/usr/bin/env python3
"""Update plans, pricing (subtitle + multiSiteNote), home.notAnyApp for en, de, es, fr."""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MESSAGES_DIR = os.path.join(ROOT, "messages")

LOCALES = {
    "en": {
        "plans": {
            "pro": {
                "description": "For 1-3 person teams. All the essentials: bookings, shared calendar, clients, automatic notifications.",
                "features": [
                    "24/7 online bookings for clients",
                    "Shared team calendar",
                    "Staff and services management",
                    "Automatic notifications (confirmation, reminders)",
                    "Client database + history",
                    "Basic reports (bookings, revenue)",
                    "Installable PWA with your logo",
                    "Email support (24h response time)",
                ],
            },
            "max": {
                "description": "For 4-10+ person teams or those who want complete control of business metrics.",
                "features": [
                    "Everything in Studio",
                    "Analytics dashboard: booking trends, top services, staff performance, occupancy rate",
                    "Automatic recurring appointments (e.g., regular client every 2 weeks)",
                    "Advanced branding (custom colors, personalized layout)",
                    "Priority support (4h response time)",
                ],
            },
        },
        "pricing_subtitle": "We don't sell you customers. We give you the tool to never lose them. HŪBIA is the management system for local businesses that want to organise bookings, clients and staff professionally. A modern experience for clients and team, accessible from web and app, designed to grow with your business. Two clear plans: Studio and Signature.",
        "multiSiteNote": "Multi-site (2-5 locations): €89 or €120/month per site. Setup €900 first site, €400 for additional sites. Over 5 sites: custom quote.",
        "notAnyApp": {
            "title": "It's not just any app",
            "subtitle": "We don't sell you customers. We give you the tool to never lose them.",
            "positioning": [
                "HUBIA is not a marketplace. Clients are yours, data is yours.",
                "It's not a generic app. It's built for those who manage appointments and people, not for those who sell \"a bit of everything\".",
                "It's not for everyone. It's for those who take their venue seriously.",
            ],
        },
    },
    "de": {
        "plans": {
            "pro": {
                "description": "Für Teams mit 1-3 Personen. Alle Grundlagen: Buchungen, gemeinsamer Kalender, Kunden, automatische Benachrichtigungen.",
                "features": [
                    "Online-Buchungen 24/7 für Kunden",
                    "Gemeinsamer Team-Kalender",
                    "Mitarbeiter- und Dienstverwaltung",
                    "Automatische Benachrichtigungen (Bestätigung, Erinnerungen)",
                    "Kundendatenbank + Historie",
                    "Basis-Reports (Buchungen, Umsatz)",
                    "Installierbare PWA mit Ihrem Logo",
                    "E-Mail-Support (24h Reaktionszeit)",
                ],
            },
            "max": {
                "description": "Für Teams mit 4-10+ Personen oder für alle, die vollständige Kontrolle über Geschäftskennzahlen wollen.",
                "features": [
                    "Alles aus Studio",
                    "Analytics-Dashboard: Buchungstrends, Top-Services, Mitarbeiter-Performance, Auslastung",
                    "Automatische Wiederholungstermine (z.B. Stammkunde alle 2 Wochen)",
                    "Erweitertes Branding (individuelle Farben, personalisiertes Layout)",
                    "Prioritäts-Support (4h Reaktionszeit)",
                ],
            },
        },
        "pricing_subtitle": "Wir verkaufen Ihnen keine Kunden. Wir geben Ihnen das Tool, um sie nie zu verlieren. HŪBIA ist das Verwaltungssystem für lokale Betriebe, die Buchungen, Kunden und Team professionell organisieren wollen. Eine moderne Erfahrung für Kunden und Team, per Web und App, gedacht zum Mitwachsen. Zwei klare Pläne: Studio und Signature.",
        "multiSiteNote": "Multi-Standort (2-5 Locations): €89 oder €120/Monat pro Standort. Setup €900 erste Location, €400 weitere. Über 5 Standorte: individuelles Angebot.",
        "notAnyApp": {
            "title": "Es ist keine x-beliebige App",
            "subtitle": "Wir verkaufen Ihnen keine Kunden. Wir geben Ihnen das Tool, um sie nie zu verlieren.",
            "positioning": [
                "HUBIA ist kein Marketplace. Kunden und Daten gehören dir.",
                "Es ist keine Standard-App. Gebaut für alle, die Termine und Menschen verwalten, nicht für alle, die \"ein bisschen von allem\" verkaufen.",
                "Es ist nicht für alle. Es ist für alle, die ihren Betrieb ernst nehmen.",
            ],
        },
    },
    "es": {
        "plans": {
            "pro": {
                "description": "Para equipos de 1-3 personas. Todo lo esencial: reservas, calendario compartido, clientes, notificaciones automáticas.",
                "features": [
                    "Reservas online 24/7 para clientes",
                    "Calendario compartido del equipo",
                    "Gestión de personal y servicios",
                    "Notificaciones automáticas (confirmación, recordatorios)",
                    "Base de datos de clientes + historial",
                    "Informes básicos (reservas, ingresos)",
                    "PWA instalable con tu logo",
                    "Soporte por email (respuesta en 24h)",
                ],
            },
            "max": {
                "description": "Para equipos de 4-10+ personas o para quienes quieren control completo de las métricas del negocio.",
                "features": [
                    "Todo lo de Studio",
                    "Panel de analytics: tendencias de reservas, servicios top, rendimiento del personal, tasa de ocupación",
                    "Citas recurrentes automáticas (ej: cliente fijo cada 2 semanas)",
                    "Branding avanzado (colores personalizados, diseño personalizado)",
                    "Soporte prioritario (respuesta en 4h)",
                ],
            },
        },
        "pricing_subtitle": "No te vendemos clientes. Te damos la herramienta para no perderlos nunca. HŪBIA es el sistema de gestión pensado para negocios locales que quieren organizar reservas, clientes y equipo de forma profesional. Una experiencia moderna para clientes y equipo, accesible por web y app, pensada para crecer con tu negocio. Dos planes claros: Studio y Signature.",
        "multiSiteNote": "Multi-sede (2-5 ubicaciones): €89 o €120/mes por sede. Setup €900 primera sede, €400 sedes adicionales. Más de 5 sedes: presupuesto personalizado.",
        "notAnyApp": {
            "title": "No es una app cualquiera",
            "subtitle": "No te vendemos clientes. Te damos la herramienta para no perderlos nunca.",
            "positioning": [
                "HUBIA no es un marketplace. Los clientes y los datos son tuyos.",
                "No es una app genérica. Está hecha para quien gestiona citas y personas, no para quien vende \"un poco de todo\".",
                "No es para todos. Es para quien se toma su local en serio.",
            ],
        },
    },
    "fr": {
        "plans": {
            "pro": {
                "description": "Pour les équipes de 1 à 3 personnes. Tout l'essentiel : réservations, calendrier partagé, clients, notifications automatiques.",
                "features": [
                    "Réservations en ligne 24/7 pour les clients",
                    "Calendrier partagé de l'équipe",
                    "Gestion du personnel et des services",
                    "Notifications automatiques (confirmation, rappels)",
                    "Base de données clients + historique",
                    "Rapports de base (réservations, chiffre d'affaires)",
                    "PWA installable avec votre logo",
                    "Support par email (réponse sous 24h)",
                ],
            },
            "max": {
                "description": "Pour les équipes de 4 à 10+ personnes ou pour ceux qui veulent un contrôle complet des métriques business.",
                "features": [
                    "Tout le plan Studio",
                    "Tableau de bord analytics : tendances des réservations, services top, performance du personnel, taux d'occupation",
                    "Rendez-vous récurrents automatiques (ex : client régulier toutes les 2 semaines)",
                    "Branding avancé (couleurs personnalisées, mise en page personnalisée)",
                    "Support prioritaire (réponse sous 4h)",
                ],
            },
        },
        "pricing_subtitle": "Nous ne vous vendons pas de clients. Nous vous donnons l'outil pour ne jamais les perdre. HŪBIA est le système de gestion pensé pour les établissements locaux qui veulent organiser réservations, clients et équipe de façon professionnelle. Une expérience moderne pour clients et équipe, accessible par web et app, pensée pour grandir avec votre activité. Deux plans clairs : Studio et Signature.",
        "multiSiteNote": "Multi-sites (2-5 établissements) : 89 € ou 120 €/mois par site. Setup 900 € premier site, 400 € sites suivants. Plus de 5 sites : devis personnalisé.",
        "notAnyApp": {
            "title": "Ce n'est pas une app quelconque",
            "subtitle": "Nous ne vous vendons pas de clients. Nous vous donnons l'outil pour ne jamais les perdre.",
            "positioning": [
                "HUBIA n'est pas un marketplace. Les clients et les données sont à vous.",
                "Ce n'est pas une app générique. Conçue pour ceux qui gèrent rendez-vous et personnes, pas pour ceux qui vendent \"un peu de tout\".",
                "Ce n'est pas pour tout le monde. C'est pour ceux qui prennent leur établissement au sérieux.",
            ],
        },
    },
}

def main():
    for loc, data in LOCALES.items():
        path = os.path.join(MESSAGES_DIR, f"{loc}.json")
        with open(path, "r", encoding="utf-8") as f:
            j = json.load(f)
        j["plans"]["pro"]["description"] = data["plans"]["pro"]["description"]
        j["plans"]["pro"]["features"] = data["plans"]["pro"]["features"]
        j["plans"]["max"]["description"] = data["plans"]["max"]["description"]
        j["plans"]["max"]["features"] = data["plans"]["max"]["features"]
        j["pricing"]["subtitle"] = data["pricing_subtitle"]
        j["pricing"]["multiSiteNote"] = data["multiSiteNote"]
        j["home"]["notAnyApp"] = data["notAnyApp"]
        with open(path, "w", encoding="utf-8") as f:
            json.dump(j, f, ensure_ascii=False, indent=2)
        print(f"Updated {loc}.json")
    print("Done.")

if __name__ == "__main__":
    main()

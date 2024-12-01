<div align="center">
  <img src="static/logo.png" alt="TimeSwift Logo" width="200"/>
  
  # TimeSwift
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Made with SvelteKit](https://img.shields.io/badge/Made%20with-SvelteKit-FF3E00.svg)](https://kit.svelte.dev/)
  [![Tauri](https://img.shields.io/badge/Tauri-Ready-blue?logo=tauri)](https://tauri.app)

  Eine moderne Zeiterfassungs- und Projektmanagement-Desktop-Anwendung
</div>

## 🚀 Features

- **⏱️ Zeiterfassung** - Präzise Erfassung von Arbeitszeiten
- **📊 Dashboard** - Übersichtliche Visualisierung wichtiger Daten
- **👥 Projektverwaltung** - Organisation von Projekten und Kunden
- **📈 Auswertungen** - Detaillierte Reports und Statistiken
- **🔄 Synchronisation** - Online/Offline mit SurrealDB
- **🛡️ Sicherheit** - Verschlüsselte Datenspeicherung

## 🔧 Tech-Stack
- Frontend: Tauri + SvelteKit + TypeScript
- Backend: Typescript  
- Datenbank: SurrealDB
- Testing: Vitest


## 🛠️ Entwicklung

```bash
# Repository klonen
git clone https://github.com/your-username/timeswift.git
cd timeswift

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Tauri App entwickeln
npm run tauri dev

# Produktions-Build erstellen
npm run tauri build
```

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/your-username/timeswift.git

# Ins Verzeichnis wechseln
cd timeswift

# Dependencies installieren
npm install
```

## 📁 Projektstruktur

timeswift/
├── src/
│   ├── lib/
│   │   ├── components/    # UI-Komponenten
│   │   ├── database/      # SurrealDB Setup
│   │   ├── stores/        # Svelte Stores
│   │   └── utils/         # Hilfsfunktionen
│   └── routes/            # SvelteKit Routen
├── src-tauri/            # Tauri Backend
│   ├── src/              # Rust Code
│   └── Cargo.toml        # Rust Dependencies
├── static/               # Assets
└── tests/               # Tests

## 📝 Lizenz

Dieses Projekt ist lizenziert [License](./LICENSE) .

[![License:](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)




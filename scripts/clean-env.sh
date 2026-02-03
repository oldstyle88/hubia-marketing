#!/bin/sh
# Rimuove variabili d'ambiente che generano warning npm (es. "Unknown env config 'devdir'").
# Uso: source scripts/clean-env.sh   (oppure: . scripts/clean-env.sh)
unset NPM_CONFIG_DEVDIR
unset npm_config_devdir

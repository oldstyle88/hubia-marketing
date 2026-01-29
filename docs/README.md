# Documenti HŪBIA — da copiare in ~/Documents/hubia

Copia tutti i file in `~/Documents/hubia/docs/`:

```bash
cp -r /Users/leandrooliva/Documents/monorepo/_hubia-docs-export/* ~/Documents/hubia/docs/
```

Se in `~/Documents/hubia` non esiste ancora la cartella `docs/`:

```bash
mkdir -p ~/Documents/hubia/docs
cp -r /Users/leandrooliva/Documents/monorepo/_hubia-docs-export/* ~/Documents/hubia/docs/
```

Poi, nel repo hubia: `cd ~/Documents/hubia && git add docs/ && git commit -m "docs: add Hubia docs from monorepo" && git push`

import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'

export async function generateMetadata() {
  const t = await getTranslations('terms')
  return {
    title: `${t('title')} — HŪBIA`,
    description: 'Termini e condizioni di utilizzo del servizio HŪBIA.',
  }
}

export default async function TermsPage() {
  const t = await getTranslations('terms')

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />

      <main className="flex-1 bg-[var(--bg)]">
        <Section className="pt-32 pb-16 bg-[var(--bg)]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-primary mb-8">
              {t('title')}
            </h1>

            <p className="text-[var(--gray)] mb-4">
              <strong>{t('lastUpdate')}:</strong>{' '}
              {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-[var(--gray)] leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Accettazione dei termini</h2>
                <p>
                  Accedendo e utilizzando il servizio HŪBIA (&quot;Servizio&quot;), accetti di essere vincolato da questi Termini di Servizio
                  (&quot;Termini&quot;). Se non accetti questi Termini, non utilizzare il Servizio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Descrizione del servizio</h2>
                <p>
                  HŪBIA è una piattaforma software-as-a-service (SaaS) che fornisce strumenti per la gestione di prenotazioni,
                  clienti, staff e operazioni per attività locali (beauty, studi medici, pet grooming e altri verticali). Il Servizio include accesso a un&apos;applicazione
                  web e PWA, area staff e gestione disponibilità e funzionalità di supporto.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Registrazione e account</h2>
                <p className="mb-3">Per utilizzare il Servizio, devi:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essere maggiorenne o avere il consenso di un genitore/tutore</li>
                  <li>Fornire informazioni accurate e complete durante la registrazione</li>
                  <li>Mantenere la sicurezza del tuo account e password</li>
                  <li>Essere responsabile di tutte le attività che avvengono sotto il tuo account</li>
                  <li>Notificarci immediatamente qualsiasi uso non autorizzato</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Pagamenti e fatturazione</h2>
                <p className="mb-3">I termini di pagamento includono:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Setup fee:</strong> Pagamento una tantum all&apos;attivazione del servizio</li>
                  <li><strong>Canone mensile:</strong> Fatturato in anticipo ogni mese</li>
                  <li><strong>Rinnovo automatico:</strong> Il servizio si rinnova automaticamente salvo disdetta</li>
                  <li><strong>Rimborsi:</strong> Il setup fee non è rimborsabile. Il canone mensile può essere rimborsato proporzionalmente solo per il periodo non utilizzato in caso di disdetta anticipata</li>
                  <li><strong>Modifiche prezzi:</strong> Ti notificheremo con almeno 30 giorni di anticipo eventuali modifiche ai prezzi</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Uso accettabile</h2>
                <p className="mb-3">Ti impegni a non:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Utilizzare il Servizio per scopi illegali o non autorizzati</li>
                  <li>Violare leggi o regolamenti applicabili</li>
                  <li>Interferire con il funzionamento del Servizio</li>
                  <li>Accedere senza autorizzazione a sistemi o dati</li>
                  <li>Trasmettere virus, malware o codice dannoso</li>
                  <li>Utilizzare il Servizio per spam o comunicazioni non autorizzate</li>
                  <li>Copiare, modificare o distribuire il software senza autorizzazione</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Proprietà intellettuale</h2>
                <p>
                  Tutti i diritti di proprietà intellettuale sul Servizio, inclusi ma non limitati a software, design, loghi,
                  marchi e contenuti, sono di proprietà di HŪBIA o dei suoi licenzianti. Ti viene concessa una licenza limitata,
                  non esclusiva e non trasferibile per utilizzare il Servizio secondo questi Termini.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">7. Dati e privacy</h2>
                <p>
                  Rispettiamo la tua privacy e trattiamo i tuoi dati secondo la nostra Privacy Policy. Mantieni la proprietà dei
                  tuoi dati e puoi esportarli in qualsiasi momento. Non utilizziamo i tuoi dati per scopi diversi da quelli necessari
                  a fornire il Servizio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Disponibilità del servizio</h2>
                <p>
                  Ci impegniamo a mantenere il Servizio disponibile, ma non garantiamo disponibilità ininterrotta. Il Servizio può
                  essere temporaneamente non disponibile per manutenzione, aggiornamenti o cause di forza maggiore. Livelli di supporto
                  per i piani Studio e Signature sono descritti nella pagina Prezzi.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Disdetta</h2>
                <p className="mb-3">Puoi disdire il Servizio in qualsiasi momento:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Da parte tua:</strong> Contattaci con almeno 7 giorni di anticipo prima della fine del periodo di fatturazione</li>
                  <li><strong>Da parte nostra:</strong> Possiamo sospendere o terminare il tuo account in caso di violazione di questi Termini, con preavviso quando possibile</li>
                  <li><strong>Effetti della disdetta:</strong> Perderai l&apos;accesso al Servizio e ai dati. Ti forniremo un periodo di grazia di 30 giorni per esportare i tuoi dati</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Limitazione di responsabilità</h2>
                <p>
                  Il Servizio è fornito &quot;così com&apos;è&quot; senza garanzie di alcun tipo. Non siamo responsabili per perdite di dati,
                  interruzioni di business o danni indiretti derivanti dall&apos;utilizzo del Servizio. La nostra responsabilità totale
                  è limitata all&apos;importo pagato da te negli ultimi 12 mesi.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Modifiche ai termini</h2>
                <p>
                  Possiamo modificare questi Termini periodicamente. Le modifiche significative ti saranno notificate via email
                  o tramite notifica nel Servizio. Il continuo utilizzo del Servizio dopo le modifiche costituisce accettazione
                  dei nuovi Termini.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">12. Legge applicabile</h2>
                <p>
                  Questi Termini sono governati dalle leggi italiane. Qualsiasi controversia sarà risolta dai tribunali competenti
                  in Italia.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">13. Contatti</h2>
                <p>Per domande su questi Termini, contattaci a:</p>
                <p className="mt-3">
                  <strong>Email:</strong> legal@hubia.com<br />
                  <strong>Indirizzo:</strong> [Indirizzo legale da inserire]
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'

export async function generateMetadata() {
  const t = await getTranslations('privacy')
  return {
    title: `${t('title')} — HŪBIA`,
    description: 'Informativa sulla privacy di HŪBIA. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati.',
  }
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Section className="pt-32 pb-16 bg-background">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold text-primary mb-8">
              {t('title')}
            </h1>

            <p className="text-secondary mb-4">
              <strong>{t('lastUpdate')}:</strong>{' '}
              {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-secondary leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduzione</h2>
                <p>
                  HŪBIA (&quot;noi&quot;, &quot;nostro&quot;, &quot;nostra&quot;) rispetta la tua privacy e si impegna a proteggere i tuoi dati personali.
                  Questa informativa sulla privacy spiega come raccogliamo, utilizziamo, conserviamo e proteggiamo le tue informazioni
                  quando utilizzi il nostro servizio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">2. Dati che raccogliamo</h2>
                <p className="mb-3">Raccogliamo i seguenti tipi di dati personali:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dati di contatto:</strong> nome, indirizzo email, numero di telefono</li>
                  <li><strong>Dati aziendali:</strong> nome dell&apos;attività, tipo di attività, informazioni di fatturazione</li>
                  <li><strong>Dati di utilizzo:</strong> informazioni su come utilizzi il nostro servizio, log di accesso, preferenze</li>
                  <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, sistema operativo, informazioni sul dispositivo</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">3. Come utilizziamo i tuoi dati</h2>
                <p className="mb-3">Utilizziamo i tuoi dati personali per:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornire e migliorare il nostro servizio</li>
                  <li>Processare le tue richieste e gestire il tuo account</li>
                  <li>Comunicare con te riguardo al servizio, aggiornamenti e supporto</li>
                  <li>Rispettare obblighi legali e regolamentari</li>
                  <li>Prevenire frodi e garantire la sicurezza</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">4. Base giuridica del trattamento</h2>
                <p>Trattiamo i tuoi dati personali sulla base di:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Esecuzione del contratto:</strong> per fornire il servizio richiesto</li>
                  <li><strong>Consenso:</strong> quando hai fornito il consenso esplicito</li>
                  <li><strong>Interesse legittimo:</strong> per migliorare il servizio e garantire la sicurezza</li>
                  <li><strong>Obbligo legale:</strong> per rispettare obblighi di legge</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">5. Condivisione dei dati</h2>
                <p>Non vendiamo i tuoi dati personali. Possiamo condividere i tuoi dati solo con:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Fornitori di servizi:</strong> provider di hosting, servizi di pagamento, servizi di email (solo per fornire il servizio)</li>
                  <li><strong>Autorità legali:</strong> quando richiesto dalla legge o per proteggere i nostri diritti</li>
                  <li><strong>Partner di business:</strong> solo con il tuo consenso esplicito</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">6. Conservazione dei dati</h2>
                <p>
                  Conserviamo i tuoi dati personali solo per il tempo necessario a fornire il servizio e rispettare obblighi legali.
                  Quando elimini il tuo account, i dati vengono cancellati entro 30 giorni, salvo obblighi di conservazione legale.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">7. I tuoi diritti</h2>
                <p className="mb-3">Hai il diritto di:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accedere ai tuoi dati personali</li>
                  <li>Correggere dati inesatti o incompleti</li>
                  <li>Richiedere la cancellazione dei tuoi dati</li>
                  <li>Opporti al trattamento dei tuoi dati</li>
                  <li>Richiedere la portabilità dei dati</li>
                  <li>Revocare il consenso in qualsiasi momento</li>
                  <li>Presentare un reclamo all&apos;autorità di controllo (Garante Privacy)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">8. Sicurezza</h2>
                <p>
                  Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati personali,
                  inclusi crittografia, accesso limitato, backup regolari e monitoraggio continuo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">9. Trasferimenti internazionali</h2>
                <p>
                  I tuoi dati sono principalmente ospitati nell&apos;Unione Europea. Qualsiasi trasferimento al di fuori dell&apos;UE
                  avviene solo con garanzie appropriate ai sensi del GDPR.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">10. Modifiche a questa policy</h2>
                <p>
                  Possiamo aggiornare questa informativa sulla privacy periodicamente. Ti notificheremo eventuali modifiche
                  significative via email o tramite notifica nel servizio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">11. Contatti</h2>
                <p>Per esercitare i tuoi diritti o per domande sulla privacy, contattaci a:</p>
                <p className="mt-3">
                  <strong>Email:</strong> privacy@hubia.com<br />
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

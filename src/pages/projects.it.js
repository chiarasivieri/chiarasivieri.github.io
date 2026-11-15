/* Italian versions of the project texts. Same order as the English data in Projects.jsx. */
export const IT = {
  "ai-turni": {
    category: "AI per la sanità",
    description:
      "Progettazione e sviluppo di un'applicazione web a supporto della pianificazione dei turni del personale sanitario dell'Istituto Ortopedico Rizzoli di Bologna. Il sistema combina un algoritmo di generazione dei turni con un assistente AI (Rizzol.IA) che permette a coordinatori e personale ospedaliero di consultare e modificare i turni, ottimizzando il carico organizzativo dell'intera struttura. Il progetto ha vinto il premio per il miglior poster a un congresso nazionale infermieristico a maggio 2026.",
    stats: [
      "moduli principali: solver, assistente, amministrazione",
      ["LLM, i dati restano in ospedale", "Locale"],
      ["premio, maggio 2026", "Miglior Poster"],
    ],
    features: [
      {
        title: "Pianificazione mensile automatica",
        text: "Un solver di ottimizzazione vincolata genera l'intero mese rispettando le regole di ogni reparto: personale minimo per turno, rotazioni notturne, personale fisso di giorno e sostituti che coprono le assenze.",
        caption: "Piano generato",
      },
      {
        title: "Il coordinatore ha sempre il controllo",
        text: "Ogni turno può essere modificato a mano, con una motivazione obbligatoria. Le modifiche manuali sono segnalate in modo visibile, ogni intervento resta nella cronologia e un mese confermato può essere bloccato.",
        caption: "Modifica manuale con motivazione",
        callouts: ["i turni modificati sono segnalati"],
      },
      {
        title: "Assenze e vincoli",
        text: "Ferie, malattie e altri tipi di assenza si registrano in pochi clic, anche per date future. I vincoli personali vengono verificati giorno per giorno quando si genera il piano.",
        caption: "Gestione del personale",
      },
      {
        title: "Supporto: una persona libera da assegnare",
        text: "Quando qualcuno rientra da un'assenza, il ciclo dei turni a volte prevede un riposo per riallinearsi con il proprio partner di lavoro. In quei giorni l'app segna la persona come libera (la S viola tratteggiata): disponibile, senza turno e con zero ore finché il coordinatore non le assegna un turno con un clic, ad esempio per coprire un buco.",
        caption: "Provalo: clicca sulla cella S",
      },
      {
        title: "Rizzol.IA, l'assistente",
        text: "Un assistente in chat per consultare e modificare i turni in linguaggio naturale. Il modello linguistico gira in locale, quindi i dati dell'ospedale non lasciano mai l'infrastruttura.",
      },
      {
        title: "Pannello admin e ruoli",
        text: "Reparti, personale, utenti e permessi si gestiscono da un pannello dedicato, con ruoli diversi per IT, amministrazione e coordinatori.",
      },
      {
        title: "Presentato al Rizzoli",
        text: "Dopo aver vinto il premio Best Poster a maggio 2026, il progetto è stato presentato alla 3ª Giornata Internazionale dell'Infermieristica Ortopedica e delle Professioni Sanitarie Affini, la celebrazione ospitata dall'Istituto Ortopedico Rizzoli di Bologna (30 ottobre – 5 novembre 2026).",
      },
    ],
    roadmap: [
      ["Solver e regole di reparto", "Generazione automatica per infermieri e operatori sanitari, con configurazione per reparto."],
      ["Tracciabilità", "Modifiche manuali con motivazione, cronologia delle modifiche, blocco del mese."],
      ["Pannello admin", "Gestione di ruoli, reparti, personale e utenti."],
      ["Presentato alla Giornata Internazionale", "3ª Giornata Internazionale dell'Infermieristica Ortopedica e delle Professioni Sanitarie Affini, Istituto Ortopedico Rizzoli, ottobre–novembre 2026."],
      ["Reparti pilota", "Prove sul campo in due reparti con coordinatori e infermieri, misurando il carico di lavoro prima e dopo con lo stesso questionario."],
      ["Turni dei medici", "Una sezione dedicata con l'elenco dei medici e la griglia dei turni."],
      ["Messa in produzione in ospedale", "Dal test in locale all'infrastruttura dell'ospedale."],
      ["Più reparti", "Estendere l'app agli altri reparti dell'istituto."],
    ],
  },

  llmf: {
    category: "computer vision",
    description:
      "Progettazione e sviluppo di un'applicazione web completa per il riconoscimento e la classificazione automatica della frutta, pensata per ridurre costi e tempi di lavorazione nelle aziende agricole. Il sistema usa pesi personalizzati ottenuti dal fine-tuning di YOLOv8 su un dataset multi-classe di frutta, permettendo il rilevamento in tempo reale con annotazione tramite bounding box. Il progetto include un'implementazione full stack.",
    stats: [
      "modelli specializzati",
      "conteggi separati, mai uniti",
      "specie nelle tabelle di misura",
      "frame campione per video",
    ],
    note: "Ho progettato e sviluppato questa applicazione. Non essendo di mia proprietà, non posso pubblicarne le schermate reali: le immagini mostrate sono esempi illustrativi.",
    features: [
      {
        title: "Rilevamento e segmentazione",
        text: "Modelli YOLOv8 di segmentazione specializzati, addestrati su dataset di frutta, trovano e contornano ogni frutto in un'immagine. I modelli si possono attivare e disattivare singolarmente, così ogni coltura usa quello più adatto.",
        caption: "Modello Kiwi Segment su una foto in campo",
      },
      {
        title: "Revisione e creazione del dataset",
        text: "I risultati si possono controllare e modificare con strumenti per box e segmentazione, ed esportare i dati etichettati in YOLO, JSON o CSV. I metadati viaggiano dentro l'immagine stessa (EXIF), così una foto etichettata si può reimportare senza perdere le etichette.",
        caption: "Vista di annotazione",
      },
      {
        title: "Contare la frutta nei video",
        text: "Un tracker ByteTrack tarato per la frutta segue ogni pezzo lungo il filmato e una linea virtuale conta gli attraversamenti. L'app tiene separati tre conteggi (linea, tracking, picco) invece di unirli in un unico numero: ognuno è valido per un diverso tipo di ripresa e l'interfaccia indica di quale fidarsi.",
        caption: "Risultati dell'elaborazione video",
      },
      {
        title: "Dimensione, calibro e peso",
        text: "Da ogni maschera di segmentazione il sistema stima diametro, calibro commerciale e peso per specie. La scala pixel-millimetri deriva da una catena di calibrazione (marker ArUco, oggetto di riferimento noto, EXIF o distanza dichiarata) e il metodo usato è sempre mostrato accanto alle misure.",
      },
      {
        title: "Offline e con l'uomo nel ciclo",
        text: "Tutto gira in locale con librerie leggere e nessun servizio esterno, quindi funziona offline su dispositivi edge. I frame campione di ogni video possono essere rimandati al dataset, trasformando i casi in cui il modello sbaglia in materiale per il riaddestramento.",
      },
    ],
    roadmap: [
      ["Pipeline per le immagini", "Inferenza multi-modello, strumenti di annotazione, esportazione in tre formati."],
      ["Pipeline per i video", "Tracking, conteggio per attraversamento di linea, misure per frutto, video annotato."],
      ["Calibrazione e verifica", "Catena di calibrazione e frame campione per controllare i risultati a occhio."],
      ["Banda di incertezza", "Un indice di occlusione per mostrare i conteggi come intervallo, ad esempio da 57 a 68, invece di un singolo numero."],
      ["Calibrazione nell'interfaccia", "Campi per il marker ArUco e gli oggetti di riferimento, per misure in scala assoluta."],
      ["Validazione su riprese reali", "Taratura dei parametri del tracker su video di frutteti reali."],
      ["Più specie", "Estendere i modelli alle colture già coperte dalle tabelle di misura."],
      ["Stima della resa e robotica", "Usare conteggi e coordinate di segmentazione come fonte di dati per stime di raccolto e raccolta robotizzata."],
    ],
  },

  aegis: {
    category: "cybersecurity",
    description:
      "Progettazione e sviluppo di un ecosistema di cybersecurity per proteggere i contenuti digitali dalla diffusione non autorizzata. Il sistema implementa un motore di steganografia forense in grado di inserire firme invisibili e non ripudiabili. La resistenza a manipolazioni aggressive è ottenuta con un algoritmo proprietario che combina DCT con ridondanza spaziale (tiling) e un sistema di recupero con grid search.",
    stats: [
      "livelli di protezione",
      "di ritaglio, firma ancora trovata",
      "di qualità JPEG, firma ancora trovata",
    ],
    note: "L'app è stata chiusa, quindi le immagini mostrate sono ricostruzioni illustrative dell'interfaccia, con dati dimostrativi.",
    features: [
      {
        title: "Una firma invisibile",
        text: "Aegis nasce da un problema semplice: una volta che un'immagine è stata ricevuta legittimamente, nulla ne impedisce la diffusione non autorizzata. Invece di cifrare l'immagine, il sistema la marca con un watermark invisibile che contiene mittente e destinatario, così una copia trapelata può essere ricondotta alla fonte.",
        caption: "Invio sicuro",
      },
      {
        title: "Due livelli di difesa",
        text: "L'algoritmo, chiamato Aegis Combo, sovrappone un livello fragile e uno robusto. L'inserimento LSB verifica che un file sia identico bit per bit all'originale, mentre una firma scritta nel dominio delle frequenze DCT (blocchi 8x8, gli stessi del JPEG) sopravvive a compressione e rumore.",
        caption: "Due livelli, una firma",
      },
      {
        title: "Sopravvivere a un ritaglio",
        text: "La firma è ripetuta su tutta l'immagine (tiling), quindi anche un frammento ritagliato ne contiene una copia completa. Il ritaglio rompe l'allineamento con la griglia DCT, perciò l'estrazione esegue una grid search, facendo scorrere la finestra di lettura pixel per pixel finché il watermark non diventa leggibile.",
        caption: "Recupero dopo un ritaglio del 30%",
      },
      {
        title: "Non ripudio integrato nel flusso",
        text: "Nell'app Flutter gli utenti si registrano, accedono e inviano immagini solo a utenti esistenti. Il destinatario trova l'immagine in una posta in arrivo in attesa e deve accettarla esplicitamente per scaricarla: l'accettazione applica una seconda firma, legando il file a chi lo ha ricevuto.",
        caption: "Immagini in attesa e accettazione",
      },
      {
        title: "Verifica forense",
        text: "Una pagina dedicata permette a un analista di caricare un'immagine sospetta e ottenere un report strutturato: tecnica rilevata, mittente, destinatario, confidenza e firma grezza. Tutta la logica di estrazione risiede sul server, quindi il metodo non si può ricostruire dall'app mobile.",
        caption: "Report di verifica",
      },
      {
        title: "Testato, con limiti dichiarati",
        text: "Il livello DCT ha rilevato la firma dopo compressione JPEG al 90% e al 70%, rumore aggiunto e ritaglio del 30%, dove il solo LSB ha fallito ogni volta. Gli screenshot sono il problema aperto: il ridimensionamento cambia la dimensione dei blocchi e la ricerca copre la traslazione ma non la scala.",
        caption: "Test di robustezza",
      },
    ],
    roadmap: [
      ["Motore di watermarking", "LSB, DCT e l'Aegis Combo con tiling e grid search."],
      ["App e backend", "Client Flutter, API Flask e una pagina admin di verifica."],
      ["Test di robustezza", "Prove sotto stress con compressione, rumore, ridimensionamento e ritaglio."],
      ["Estrazione resistente alla scala", "Reti neurali (AIgis) per leggere il watermark da screenshot e foto di schermi."],
      ["Messa in sicurezza per la produzione", "Autenticazione forte degli endpoint, rate limiting, HTTPS e log di audit per la catena di custodia."],
      ["Visualizzazione effimera", "Visione una sola volta dentro l'app, con screenshot bloccati a livello di sistema."],
      ["Scansione proattiva", "Crawler che cercano copie non autorizzate online e avvisano la vittima."],
      ["Attribuzione forte", "Firme crittografiche asimmetriche che legano ogni watermark all'identità digitale del mittente."],
    ],
  },

  archivia: {
    category: "computer vision",
    description:
      "Progettazione e implementazione di un modello di computer vision basato su transfer learning di una rete neurale pre-addestrata per il riconoscimento dei punti di interesse dell'Università di Ferrara, con lo sviluppo di un'applicazione web completa (backend e frontend) come interfaccia utente.",
    stats: [
      "fasi di addestramento",
      "backbone EfficientNet",
      "etichette scritte nei file",
    ],
    note: "Ho progettato e sviluppato questa applicazione. Non essendo di mia proprietà, non posso pubblicarne le schermate reali: le immagini mostrate sono ricostruzioni illustrative dell'interfaccia, con dati dimostrativi.",
    features: [
      {
        title: "Riconoscere i luoghi",
        text: "Un progetto di tirocinio per l'ufficio e-learning dell'Università di Ferrara: un modello di deep learning che riconosce dove è stata scattata una foto o girato un video, per ordinare automaticamente un archivio di filmati universitari in continua crescita. Parte da EfficientNetV2-B0, pre-addestrata su ImageNet, e la adatta con il transfer learning.",
      },
      {
        title: "Addestramento in due fasi",
        text: "Prima si addestra solo il classificatore finale, con la rete pre-addestrata congelata. Poi l'intero modello viene sbloccato e raffinato con un learning rate molto basso, per specializzarlo sui luoghi dell'università. La data augmentation (rotazioni, zoom, flip) evita l'overfitting.",
      },
      {
        title: "Video, non solo foto",
        text: "Per un video, i frame vengono estratti a intervalli regolari e classificati uno per uno, e un voto di maggioranza decide il luogo dell'intero clip. Un punteggio di nitidezza poi tiene solo i frame migliori, scartando quelli sfocati o mossi.",
      },
      {
        title: "Etichette che restano nel file",
        text: "Il luogo previsto viene scritto direttamente nei metadati EXIF dell'immagine, così qualsiasi gestore di foto può leggerlo e filtrarlo. Una soglia di confidenza esclude le previsioni incerte e ogni esecuzione lascia un log e una tabella dei risultati, per ricostruire ogni decisione.",
        caption: "Metadati scritti nel file",
      },
      {
        title: "Una web app per tutti",
        text: "Un'applicazione web completa, con frontend React e backend FastAPI, permette a chiunque di caricare immagini e farle classificare automaticamente, senza toccare codice o notebook.",
        caption: "L'archivio",
      },
      {
        title: "Carica e classifica",
        text: "Foto e video si trascinano nell'app, si controllano in un breve elenco e si mandano al modello con un clic. Ogni file torna etichettato con il luogo che mostra.",
        caption: "Caricamento e classificazione",
      },
      {
        title: "Cerca per luogo",
        text: "Una volta classificati, i file si trovano scrivendo il nome di un luogo e si possono restringere per tipo, luogo o data: un'intera collezione diventa ricercabile senza etichettatura manuale.",
        caption: "Risultati di ricerca",
      },
    ],
    roadmap: [
      ["Modello e addestramento", "Transfer learning con addestramento in due fasi e data augmentation."],
      ["Pipeline per i video", "Estrazione dei frame, voto di maggioranza e selezione dei frame per nitidezza."],
      ["Metadati e tracciabilità", "Etichette EXIF, log delle esecuzioni e tabella dei risultati."],
      ["Applicazione web", "Caricare immagini e farle classificare automaticamente dal browser."],
      ["Da notebook a script", "Script modulari da riga di comando che girano sul NAS dell'ufficio, indipendenti da Colab e Google Drive."],
      ["Etichettatura automatica sul posto", "Un job programmato che etichetta le nuove foto direttamente nei campi EXIF, senza copiare i file."],
      ["Decine di classi", "Pesi di classe per dati sbilanciati, architetture più grandi e classificazione gerarchica."],
      ["Feedback e active learning", "Correggere le etichette sbagliate dall'interfaccia e salvare le correzioni per riaddestrare il modello nel tempo."],
    ],
  },

  "clinical-trial-prediction": {
    category: "machine learning",
    description:
      "Tesi triennale presso l'Università di Ferrara dedicata allo sviluppo di un modello di Machine Learning per prevedere il fallimento degli studi clinici. Ho implementato tecniche di Natural Language Processing (NLP) e sviluppato una rete neurale LSTM su grandi dataset con descrizioni testuali non strutturate.",
    document: {
      subtitle: "Tesi triennale in Informatica · Università degli Studi di Ferrara · A.A. 2023–24",
    },
    stats: [
      "studi clinici analizzati",
      "colonne tenute su 51",
      "di sbilanciamento tra classi gestito",
      "fold di cross-validation",
    ],
    features: [
      {
        title: "Prevedere quali studi falliscono",
        text: "La mia tesi triennale in Informatica all'Università di Ferrara. A partire dal testo di uno studio clinico (riassunto, condizioni, interventi, esiti), una rete neurale stima se lo studio si concluderà con successo o fallirà, per evitare di investire tempo e risorse in studi probabilmente destinati a essere abbandonati.",
        caption: "Estratto dei dati di ClinicalTrials.gov",
      },
      {
        title: "Da 488.000 studi a un dataset pulito",
        text: "I dati grezzi provengono da ClinicalTrials.gov: 488.440 studi e 51 colonne. Ho tenuto le 11 che contano, rimosso gli studi con stato sconosciuto e trasformato lo stato dello studio in un target binario. I duplicati sono stati individuati calcolando l'hash di ogni sequenza e i valori mancanti sono stati volutamente mantenuti anziché imputati, per non alterare la distribuzione.",
      },
      {
        title: "Trasformare il testo in numeri",
        text: "Una pipeline NLP converte il testo in minuscolo, rimuove punteggiatura e numeri, elimina le stop word inglesi e lo tokenizza in sequenze con padding su un vocabolario di 10.000 parole. Un layer di embedding associa poi ogni parola a un vettore di 128 dimensioni, così le parole usate in contesti simili finiscono vicine.",
        caption: "Passaggi di preprocessing del testo",
      },
      {
        title: "Domare uno sbilanciamento di 20 a 1",
        text: "Gli studi falliti sono rari rispetto a quelli riusciti, con un rapporto di quasi 20 a 1. Per evitare che il modello favorisca semplicemente la classe maggioritaria, ho combinato l'oversampling SMOTE della classe minoritaria con l'undersampling casuale di quella maggioritaria, con seed fissi per la riproducibilità.",
      },
      {
        title: "Una LSTM ottimizzata automaticamente",
        text: "Il modello è una LSTM in Keras con un numero variabile di layer ricorrenti e densi, con Batch Normalization e Dropout contro l'overfitting. Layer, unità, dropout e learning rate sono scelti da una random search di Keras Tuner e il modello è validato con cross-validation a 5 fold e un test set indipendente, guardando precision, recall e F1 e non solo l'accuratezza.",
        caption: "Struttura del modello",
      },
    ],
    roadmap: [
      ["Pulizia dei dati e NLP", "Selezione delle colonne, preprocessing del testo, rimozione dei duplicati."],
      ["Gestione dello sbilanciamento", "SMOTE combinato con undersampling."],
      ["LSTM con tuning automatico", "Ricerca con Keras Tuner e cross-validation a 5 fold."],
      ["Modelli Transformer", "Architetture più brave a generalizzare sulle classi sottorappresentate."],
      ["Data augmentation sul testo", "Parafrasi automatica e back-translation per arricchire la classe più rara."],
      ["Tuning avanzato", "Bayesian Optimization o Hyperband al posto della random search."],
      ["Più potenza di calcolo", "Addestramento su GPU o TPU per modelli più grandi e precisi."],
    ],
  },

  "Wedding Websites": {
    category: "sviluppo web",
    description:
      "Sviluppo di siti web per clienti privati. Responsabile di design, impaginazione grafica e implementazione tecnica di siti interattivi e multimediali.",
  },
};
